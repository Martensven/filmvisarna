import { User } from "../models/userSchema.js";
// Middleware to check if user is admin
export const isAdmin = async (req, res, next) => {
  // Check if user is logged in
  if (!req.session?.userId) {
    return res.status(401).json({ error: "Inte inloggad" });
  }
  // Find user and check role
  const user = await User.findById(req.session.userId);
  if (!user || user.role !== "admin") {
    return res.status(403).json({ error: "Ej behörig" });
  }
  // Save user information to request object
  req.user = user;
  next();
};
