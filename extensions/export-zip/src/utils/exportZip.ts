import JSZip from 'jszip';
import { saveAs } from 'file-saver';

// DicomMetadataStore contains all relevant metadata
import { DicomMetadataStore } from '@ohif/core';

export default async function exportZip({ servicesManager }) {
  // Relevant services for retrieving information about viewport
  const { DisplaySetService, ViewportGridService } = servicesManager.services;

  // Get relevant display set UID for this viewport
  const { viewports } = ViewportGridService.getState();
  const displaySetInstanceUID = viewports?.entries()?.next()?.value?.[1]?.displaySetInstanceUIDs?.[0];

  // If no such UID exists, we won't be able to retrieve the metadata
  if (!displaySetInstanceUID) {
    console.error('No displaySetInstanceUID found.');
    return;
  }

  // Use display set UID to get study UID
  const studyInstanceUID = DisplaySetService.getDisplaySetByUID(displaySetInstanceUID)?.StudyInstanceUID;

  // Get relevant metadata from study UID
  const studyMetadata = DicomMetadataStore.getStudy(studyInstanceUID);
  const patientName = studyMetadata?.series?.[0]?.instances?.[0]?.PatientName?.Alphabetic;
  const studyDate = studyMetadata?.series?.[0]?.instances?.[0]?.StudyDate;

  // Create JSON structure containing relevant metadata
  const metadata = {
    PatientName: patientName,
    StudyDate: studyDate,
  };

  // Exporting .zip file using JSZip library
  const zip = new JSZip();
  zip.file('metadata.json', JSON.stringify(metadata));

  zip.generateAsync({ type:"blob" }).then(function(content) {
    saveAs(content, "report.zip");
  });
};
