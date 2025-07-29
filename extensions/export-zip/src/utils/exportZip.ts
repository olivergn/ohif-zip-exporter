import JSZip from 'jszip';
import { saveAs } from 'file-saver';

// DicomMetadataStore contains all relevant metadata
import { DicomMetadataStore } from '@ohif/core';

export default async function exportZip({ servicesManager }) {
  // Relevant services for retrieving information about viewport
  const { CornerstoneViewportService, DisplaySetService, ViewportGridService } = servicesManager.services;

  // Get data on viewports and active viewport
  const { viewports, activeViewportId } = ViewportGridService.getState();

  // Get relevant display set UID for the active viewport
  const displaySetInstanceUID = viewports?.get(activeViewportId)?.displaySetInstanceUIDs?.[0];

  // If no such UID exists, we won't be able to retrieve the metadata
  if (!displaySetInstanceUID) {
    console.error('No displaySetInstanceUID found.');
    return;
  }

  // Use display set UID to get study UID
  const displaySet = DisplaySetService.getDisplaySetByUID(displaySetInstanceUID);
  const studyInstanceUID = displaySet?.StudyInstanceUID;

  // Get relevant metadata from study UID
  const studyMetadata = DicomMetadataStore.getStudy(studyInstanceUID);
  const patientName = studyMetadata?.series?.[0]?.instances?.[0]?.PatientName?.Alphabetic?.replace('^', ' ') || 'Unknown';
  const studyDate = studyMetadata?.series?.[0]?.instances?.[0]?.StudyDate || 'Unknown';

  // Create JSON structure containing relevant metadata
  const metadata = {
    PatientName: patientName,
    StudyDate: studyDate,
  };

  // Exporting metadata using JSZip library
  const zip = new JSZip();
  zip.file('metadata.json', JSON.stringify(metadata));

  // Get the viewport element which matches the viewport id
  const viewportElement = document.querySelector(`[data-viewport-uid='${activeViewportId}']`);
  const canvasElement = viewportElement?.firstElementChild?.querySelector('canvas');

  // If no such canvas exists, we won't be able to retrieve the image
  if (!canvasElement) {
    console.warn('Active viewport contains no canvas.');
  } else {
    // Otherwise, we can use the asynchronous toBlob method
    await new Promise<void>((resolve) => {
      canvasElement.toBlob(blob => {
        if (blob) {
          zip.file('image.jpeg', blob);
        } else {
          console.warn('Could not convert canvas to .jpeg.');
        }
        resolve();
      }, 'image/jpeg', 0.95);
    });
  }

  zip.generateAsync({ type:"blob" }).then(function(content) {
    saveAs(content, "report.zip");
  });
};
