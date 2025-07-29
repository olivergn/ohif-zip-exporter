import exportZip from './utils/exportZip';

export default function commandsModule({ servicesManager }) {
  return {
    definitions: {
      'export-zip': {
        commandFn: () => exportZip({ servicesManager }),
        options: {},
        context: [],
      },
    },
    defaultContext: 'VIEWER',
  };
}
