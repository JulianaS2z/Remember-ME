import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
  try {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        erro: "Token não informado"
      });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    next();

  } catch (error) {
    return res.status(401).json({
      erro: "Token inválido"
    });
  }
}