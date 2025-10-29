import { User } from '../models/userSchema.js';

export const isAdmin = async (req, res, next) => {
  if (!req.session?.userId) {
    return res.status(401).json({ error: "Inte inloggad" });
  }

  const user = await User.findById(req.session.userId);
  if (!user || user.role !== 'admin') {
    return res.status(403).json({ error: "Ej behörig" });
  }

  req.user = user;
  next();
};
