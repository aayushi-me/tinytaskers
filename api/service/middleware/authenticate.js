import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  // Extract the token from the Authorization header
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    console.error("Token missing in Authorization header");
    return res.status(401).json({ error: "Unauthorized access. Token is missing." });
  }


  // Verify the token using the secret
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("JWT Verification Error:", err.message);

      // Handle specific JWT errors
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Token has expired. Please log in again." });
      }
      if (err.name === "JsonWebTokenError") {
        return res.status(403).json({ error: "Invalid token. Access denied." });
      }

      // Generic error
      return res.status(403).json({ error: "Token verification failed." });
    }

    // Attach the user data to the request object for downstream use
    req.user = decoded;
    console.log("Decoded JWT Payload:", decoded);

    // Proceed to the next middleware or route
    next();
  });
};

export default authenticate;
