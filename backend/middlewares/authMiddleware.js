// const JWT = require('jsonwebtoken');

// module.exports = async (req, res, next) => {
//     try {
//         const tokenHeader = req.headers["authorization"];
//         if (!tokenHeader || !tokenHeader.startsWith("Bearer ")) {
//             return res.status(401).send({ message: "Unauthorized - No Token Provided" });
//         }

//         const token = tokenHeader.split(" ")[1];

//         JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
//             if (err) {
//                 const isExpired = err.name === "TokenExpiredError";
//                 return res.status(401).send({
//                     message: isExpired ? "Token Expired" : "Unauthorized User",
//                 });
//             }
//             req.user = decode;
//             next();
//         });
        
//     } catch (error) {
//         return res.status(500).send({ message: "Server side Problem" });
//     }
// }

const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // { userId, role }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

exports.adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};

exports.deliveryOnly = (req, res, next) => {
  if (req.user.role !== "delivery") {
    return res.status(403).json({ message: "Delivery access only" });
  }
  next();
};
