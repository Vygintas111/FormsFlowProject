import jwt, { SignOptions, Secret } from "jsonwebtoken";

const secret: Secret = process.env.JWT_SECRET || "default_secret";

export const generateToken = (payload: object, expiresIn = "1h"): string => {
    const options: SignOptions = { expiresIn: expiresIn as any };
    return jwt.sign(payload, secret, options);
};

export const verifyToken = (token: string) => jwt.verify(token, secret);
