import jwt, {
  JwtPayload,
} from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error(
    "JWT_SECRET is not configured"
  );
}

export const generateToken = (
  userId: string
): string => {
  return jwt.sign(
    { id: userId },
    JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

export const verifyToken = (
  token: string
): JwtPayload => {
  return jwt.verify(
    token,
    JWT_SECRET
  ) as JwtPayload;
};