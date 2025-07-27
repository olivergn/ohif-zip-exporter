import { id } from './id';
import commandsModule from './commandsModule';

/**
 * You can remove any of the following modules if you don't need them.
 */
export default {
  /**
   * Only required property. Should be a unique value across all extensions.
   * You ID can be anything you want, but it should be unique.
   */
  id,

  /**
   * ToolbarModule should provide a list of tool buttons that will be available in OHIF
   * for Modes to consume and use in the toolbar. Each tool button is defined by
   * {name, defaultComponent, clickHandler }. Examples include radioGroupIcons and
   * splitButton toolButton that the default extension is providing.
   */
  getToolbarModule({ servicesManager, commandsManager, extensionManager }) {
    return [{
      id: 'ExportZip',
      definitions: [
        {
          id: 'export-zip',
          label: 'Export ZIP',
          icon: 'download',
          type: 'action',
          commandName: 'exportZip',
        }
      ],
      defaultContext: ['ROUTE:VIEWER'],
    }];
  },
  /**
   * SopClassHandlerModule should provide a list of sop class handlers that will be
   * available in OHIF for Modes to consume and use to create displaySets from Series.
   * Each sop class handler is defined by a { name, sopClassUids, getDisplaySetsFromSeries}.
   * Examples include the default sop class handler provided by the default extension
   */
  getSopClassHandlerModule({ servicesManager, commandsManager, extensionManager }) {
    return [];
  },
  /**
   * CommandsModule should provide a list of commands that will be available in OHIF
   * for Modes to consume and use in the viewports. Each command is defined by
   * an object of { actions, definitions, defaultContext } where actions is an
   * object of functions, definitions is an object of available commands, their
   * options, and defaultContext is the default context for the command to run against.
   */
  getCommandsModule({ servicesManager, commandsManager, extensionManager }) {
    return commandsModule
  },
};
