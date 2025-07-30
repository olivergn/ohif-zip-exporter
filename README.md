# OHIF ZIP Exporter
> An OHIF Viewer clone which supports exporting to .zip files.

![GIF of viewer in action](export-zip.gif)

**Creator:** Oliver Nyland

## General information
This project was created as part of a take-home coding challenge for OssAbility. The challenge involved implementing a new extension and mode which define a new toolbar button and functionality for exporting metadata and images to .zip files.

## Instructions for running
This project should be able to be run as standard OHIF would be. Specifically, once the repository is cloned, make sure that `yarn` is installed on your machine (it can be installed via `npm install --global yarn`, and if you are on Windows you may have to add it to your system environment variables). Once this is done, you can navigate to the root directory of this repository, and run the following commands:

```
yarn install
yarn run dev
```

Once this is done, the modified OHIF Viewer should appear in your browser. You can then navigate to any given study, and select the "Export ZIP" mode, to see the new mode in action.

## Write-up
This was quite a challenging project! I had no previous experience with the OHIF Viewer, so I spent several days getting acquainted with how extensions, modes, and the viewer itself work.

I eventually settled on tackling each of the requirements incrementally, in a step-by-step process:
1. Creating templates for the extension and mode
2. Allowing the mode to be successfully selected
3. Implementing a non-functional button with an icon
4. Having the button log to console for debugging purposes
5. Implementing functionality for exporting the metadata
6. Implementing functionality for exporting the image

I ran into a few challenges along the way, which I tackled as follows:
* My first draft (the `development` branch) was done as I was getting used to the structure of OHIF extensions and modes, and much of the code was taken from the other extensions without enough consideration. Ultimately, I could not get the mode to function at all, and I opted to start another draft with the knowledge I had gained.
* My second and final draft went a lot better, but I did run into the problem early on that the `icon-download` in the `platform/ui-next`'s provided Icons would not load for the "Export ZIP" button. I eventually edited `platform/ui-next/src/components/Icons/Icons.tsx` to add an identifier for the icon, and this made it work.
* My first attempt at getting metadata about the patient and study ran into the issue that hooks such as `usePatientInfo` were unavailable for use outside of a functional React component. Instead, I had to acquaint myself with the variety of services OHIF provides, and the ways in which they are structured.
* Some information was unavailable in the docs, and many discussions online were outdated for the modern version of OHIF, which posed some challenges when developing. I addressed this problem via extensive debugging, using inspect element, and `console.log` statements, which helped me determine some aspects of how the data and app are structured.

## Disclosures
As this was my first project working with OHIF Viewer, there are some things worth noting that I would have done differently given more time, or that I am otherwise unsure about.

* When using the "Export ZIP" mode, viewport canvases are displayed in a grid, rather than with one central viewport, as in the "Basic Viewer" mode. I suspect that this is because I have left my mode's `layoutTemplate` unaltered from the template. Given more time, I may have changed this, but I ultimately decided that it is fine as-is, as this allows different viewports to be more easily selected. Viewports can still be double clicked to view individually.
* Some studies will display a 403 Forbidden error when opened in "Export ZIP" mode, due to insufficient permissions to access resources. With more time, I would look into ways to address this, but this occurs in relatively few studies, so it was a low priority.
* Some studies will otherwise display errors or freeze the app, whether in "Export ZIP" mode or in "Basic Viewer" mode, and upon returning to the homepage, warnings about routing may be presented. Many of these errors still occur even with the unaltered OHIF Viewer code, so I was limited in my ability to fix them with my current knowledge of the codebase.
* The structure for retrieving metadata, elements, viewports, and canvases within the `exportZip.ts` file is quite robust, and depends on certain uniform elements of metadata and document structures. While this does work for purpose, given more time, I would want to make this system more dynamic, both to accomodate for unusual data and to future-proof this app against potential changes.
* It is worth noting that the `export-zip` extension and `export-zip` mode are contained in the `./extensions` and `./modes` directories, respectively. While the challenge seems to suggest that the mode should be contained within the extension, OHIF v3.x's modular structure seems to indicate that defining modes and extensions separately with linked dependencies is best practice. At any rate, this is something which could be easily corrected either way.
