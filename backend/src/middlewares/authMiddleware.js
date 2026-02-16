// src/middleware/authMiddleware.js

import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    console.log(`[AUTH] Verifying token for ${req.method} ${req.path}`);
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    
    if (!token) {
      console.log(`[AUTH] ❌ No token provided for ${req.path}`);
      return res.status(401).json({ message: "Access denied. No token provided." });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log(`[AUTH] ✅ Token verified for user ID: ${decoded.id}`);
    next();
  } catch (err) {
    console.log(`[AUTH] ❌ Token verification failed: ${err.message}`);
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};
