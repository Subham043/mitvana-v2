module.exports = {
  apps: [
    {
      name: 'mitvana_api',

      script: './dist/src/main.js',

      instances: 'max', // use all CPU cores
      exec_mode: 'cluster',

      watch: false,

      autorestart: true,

      max_memory_restart: '1G',

      port: 8000,

      time: true,
    },
  ],
};
