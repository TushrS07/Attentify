module.exports = {
  apps: [
    {
      name: "express-app",
      script: "app.js",
      cwd: "/home/ubuntu/project/Attentify/backend",
      env: {
        NODE_ENV: "production",
        PORT: 5000
      }
    }
  ]
};
