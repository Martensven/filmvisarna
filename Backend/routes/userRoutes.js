import { User } from "../models/userSchema.js";
import express from "express";
import { validateData } from "./../middleware/dataValidation.js";
import bcrypt from "bcrypt";
import sendMail from "../nodemailer/sendMail.js";

const router = express.Router();

// post a new user
router.post(
  "/api/users",
  validateData(
    ["email", "password", "firstName", "lastName", "phoneNumber"],
    {
      email: "string",
      password: "string",
      firstName: "string",
      lastName: "string",
      phoneNumber: "number",
    },
    "body",
    {
      firstName: /^[A-Za-zÅÄÖåäö\s-]+$/,
      lastName: /^[A-Za-zÅÄÖåäö\s-]+$/,
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      password: (val) =>
        val.length < 8 ? "Lösenordet måste vara minst 8 tecken" : null,
    }
  ),
  async (req, res) => {
    try {
      // Hashes the passwords in our system
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

      // const user = new User({
      //   ...req.body,
      //   password: hashedPassword,
      // });
      const user = new User({
        email: req.body.email,
        password: hashedPassword,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        role: "user", // 👈 hårdkodat
      });

      await user.save();
      res.status(201).json({
        message: "User created successfully",
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phoneNumber: user.phoneNumber,
        },
      });

      //Add automatic mail at registered user - Sara
      await sendMail({
        to: user.email,
        subject: "Bekräftelsemejl",
        text: "Konto-registrering",
        html: `<p>Hej <strong>${user.firstName}</strong>!</p>
        <p>Vad kul att du har registrerat dig här hos oss på Filmvisarna i Småstad.</p> 
        <p>Ditt användarnamn är: <strong>${user.email}</strong>.
        Ditt användarID är: <strong>${user._id}</strong>.</p>
        <p> Vi hoppas att du ska finna mycket nöje med vårt utbud av gamla goda klassiker mellan tidigt 1900tal och senare 2000tal.</p>
        <p>Ytterligare information om ditt konto eller behov av lösenords-återställning finns att hämta hos oss vår kundservice.</p>
        <p>Med vänliga hälsningar 
        Filmvisarna</p>`,
      });
      console.log("Mejl har skickats iväg");
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// Get all users
router.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get user by id
router.get("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// update user by id
router.put("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// delete user by id
router.delete("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login
router.post("/api/login", async (req, res) => {
  if (req.session.userId) {
    return res.status(200).json({
      message: "Already logged in",
      user: {
        email: req.session.userEmail,
        
      },
    });
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res.status(401).json({ message: "Invalid email or password" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid)
    return res.status(401).json({ message: "Invalid email or password" });

  req.session.userId = user._id;
  req.session.userEmail = user.email;
  req.session.userRole = user.role;

  res.json({
    message: "Logged in",
    user: { email: user.email, firstName: user.firstName, role: user.role, },
  });
});

// Log out
router.post("/api/logout", (req, res) => {
  if (!req.session.userId) {
    return res.status(400).json({
      message: "There is no user to log out",
    });
  }

  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out" });
  });
});

// // Check current session
// router.get("/api/me", (req, res) => {
//   if (!req.session.userId)
//     return res.status(401).json({ message: "Not logged in" });
//   res.json({ userId: req.session.userId, email: req.session.userEmail });
// });

// Check current session
router.get("/api/me", async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ message: "Not logged in" });

  const user = await User.findById(req.session.userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json({
    userId: user._id,
    email: user.email,
    role: user.role,
  });
});


export default router;
