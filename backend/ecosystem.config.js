module.exports = {
  apps: [
    {
      name: 'mitvana_api',

      script: './dist/src/main.js',

      cwd: '/home/digisole-mitvana-api/htdocs/mitvana-api.digisole.in/backend',

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
