// Access Token

const jsonwebtoken = require("jsonwebtoken");

//Middleware to protect data against Cyber Attacks
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"]
  const token = authHeader?.split(" ")[1];
  console.log("Token is:", token);
  
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jsonwebtoken.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
}

module.exports = {
  authenticateToken,
};
