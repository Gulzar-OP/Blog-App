import jwt from "jsonwebtoken";

export const generateAuthToken = (userId, res) => {
  const token = jwt.sign(
    { id: userId },   // 👈 IMPORTANT
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("authToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};
