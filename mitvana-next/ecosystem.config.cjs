module.exports = {
  apps: [
    {
      name: "MITVANA_FRONTEND",
      cwd: "/root/mitvana-v2/mitvana-next",
      port: "3000",
      exec_mode: "cluster",
      instances: "max",
      script: "node_modules/next/dist/bin/next",
      args: "start",
    },
  ],
};
