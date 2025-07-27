export default {
  definitions: {
    exportZip: {
      commandFn: ({ servicesManager }) => {
        console.log("A .zip will be exported here.")
      },
    },
  },
  defaultContext: 'VIEWER',
};
