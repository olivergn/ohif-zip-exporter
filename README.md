# OHIF ZIP Exporter
> A custom OHIF Viewer build which supports exporting to .zip files.

![GIF of viewer in action](export-zip.gif)

**Creator:** Oliver Nyland

## General information
This project was created as part of a coding challenge involving implementing a new extension and mode that define a new toolbar button and functionality for exporting metadata and image data to a `.zip` file.

## Instructions for usage
This project runs like a standard OHIF Viewer instance. Once the repository is cloned, ensure that `yarn` is installed on your machine (it can be installed via `npm install --global yarn`). On Windows, you may also need to add `yarn` to your system environment variables. Once this is done, you can navigate to the root directory of this repository and run the following commands:

```
yarn install
yarn run dev
```

Once this is done, the modified OHIF Viewer should appear at `http://localhost:3000`. You can then load a study and select the "Export ZIP" mode to see the new mode in action.

## Code structure
- `./extensions/export-zip` - Contains the extension code responsible for adding the export button and functionality.
- `./modes/export-zip` - Contains the mode definition that registers and displays the export button.

## Write-up
This was quite a challenging, but rewarding, project! I had no previous experience with the OHIF Viewer, so I spent several days familiarising myself with how extensions, modes, and services work.

I eventually settled on tackling each of the requirements incrementally, in a step-by-step process:
1. Creating templates for the extension and mode
2. Enabling mode selection from the viewer
3. Implementing a non-functional toolbar button with an icon
4. Connecting the button to a debug `console.log` action
5. Implementing logic for exporting metadata
6. Implementing logic for exporting the image

I ran into a few challenges along the way, which I tackled as follows:
* My first draft (the `development` branch) involved adapting code from other extensions as I was getting used to the structure of OHIF extensions and modes, but it failed to produce a working mode. Ultimately, I opted to start another draft with the knowledge I had gained.
* The `icon-download` icon from `platform/ui-next` initially did not render correctly. I resolved this by manually editing `platform/ui-next/src/components/Icons/Icons.tsx` to add an identifier for the icon.
* Initially, I tried using React hooks such as `usePatientInfo` to retrieve metadata, but they are unavailable for use outside of functional components. Instead, I resolved this by acquainting myself with the variety of services OHIF provides and the ways in which they are structured.
* Some information was unavailable in the docs, and many discussions online were outdated for the modern version of OHIF, which posed some challenges when developing. I addressed this problem via extensive debugging, using inspect element and `console.log` statements, which helped me determine how the data and app are structured.

## Disclosures
As this was my first project working with OHIF Viewer, there are some things worth noting that I would have done differently, given more time, or that I am otherwise unsure about.

* When using the "Export ZIP" mode, viewport canvases are displayed in a grid, rather than with one central viewport, as in the "Basic Viewer" mode. I suspect that this is because I have left my mode's `layoutTemplate` unaltered from the template. Given more time, I may have changed this, but I ultimately decided that it is fine as-is, as this allows different viewports to be more easily selected. Viewports can still be double-clicked to view individually.
* Some studies will display a 403 Forbidden error when opened in "Export ZIP" mode, due to insufficient permissions to access resources. With more time, I would look into ways to address this, but this occurs in relatively few studies, so it was a low priority.
* Some studies will otherwise display errors or freeze the app, whether in "Export ZIP" mode or in "Basic Viewer" mode, and upon returning to the homepage, warnings about routing may be presented. Many of these errors still occur even with the unaltered OHIF Viewer code, so I was limited in my ability to fix them with my current knowledge of the codebase.
* The structure for retrieving metadata, elements, viewports, and canvases within the `exportZip.ts` file is dependent on certain uniform elements of metadata and document structures. While this does work for my purposes, given more time, I would want to make this system more robust, both to accommodate unusual data and to future-proof this app against potential changes. This could potentially involve the `CornerstoneViewportService`, but more research would be needed.
* It is worth noting that the `export-zip` extension and `export-zip` mode are contained in the `./extensions` and `./modes` directories, respectively. I was unsure whether the challenge suggested that the mode should be contained within the extension, but OHIF v3.x's modular structure seems to indicate that defining modes and extensions separately with linked dependencies is best practice. At any rate, this is something which could be easily corrected either way.
