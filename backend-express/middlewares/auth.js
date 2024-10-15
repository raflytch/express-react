const express = require("express");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // Mendapatkan Token
  const token = req.header("authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      statusCode: "Unauthorized",
      success: false,
      message: "Unauthorized",
    });
  }

  // Verifikasi Token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(403).json({
        statusCode: "Forbidden",
        success: false,
        message: "Forbidden",
      });
    }

    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;
