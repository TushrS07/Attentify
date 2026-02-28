module.exports = {
  apps: [
    {
      name: "express-app",
      script: "server.js",
      cwd: "/home/ubuntu/project/Attentify/backend",
      env: {
        NODE_ENV: "production",
        PORT: 5000
      }
    }
  ]
};
