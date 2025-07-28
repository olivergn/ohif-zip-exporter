export default {
  definitions: {
    'export-zip': {
      commandFn: ({ servicesManager }) => {
        console.log('Export ZIP button clicked!');
      },
      options: {},
      context: [],
    },
  },
  defaultContext: 'VIEWER',
};
