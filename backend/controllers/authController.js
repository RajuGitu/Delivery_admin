const jwt = require("jsonwebtoken");
const tempUsers = require("../data/tempUsers");

exports.login = (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({
      message: "Email, password and role are required"
    });
  }

  let user;

  if (role === "admin") user = tempUsers.admin;
  if (role === "delivery") user = tempUsers.delivery;

  if (!user) {
    return res.status(400).json({ message: "Invalid role" });
  }

  if (email !== user.email || password !== user.password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Create JWT
  const token = jwt.sign(
    {
      userId: user.id,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.status(200).json({
    message: "Login successful",
    token,
    role: user.role
  });
};
