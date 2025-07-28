import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export default async function exportZip({ servicesManager }) {
  console.log('Export ZIP button clicked!');

  const zip = new JSZip();

  zip.file("Hello.txt", "Hello World\n");

  zip.generateAsync({ type:"blob" }).then(function(content) {
    saveAs(content, "report.zip");
  });
};
