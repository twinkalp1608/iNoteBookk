const jwt = require("jsonwebtoken");
const JWT_SECRET = "mynameistwinkalpanchal";

const fetchUser = (req, res, next) => {
  // Get token from request header
  const token = req.header("auth-token");

  if (!token) {
    return res.status(401).json({
      error: "Please authenticate using a valid token"
    });
  }

  try {
    // Verify JWT token
    const data = jwt.verify(token, JWT_SECRET);

    // Attach decoded user info to request
    req.user = data.user;

    next(); // move to next middleware/route
  } catch (error) {
    return res.status(401).json({
      error: "Please authenticate using a valid token"
    });
  }
};

module.exports = fetchUser;
