module.exports = {
  apps: [
    {
      name: "MITVANA_FRONTEND",
      port: "3000",
      exec_mode: "cluster",
      instances: "max",
      script: "node_modules/next/dist/bin/next",
      args: "start",
    },
  ],
};
