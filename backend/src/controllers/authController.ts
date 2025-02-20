import { Request, Response } from "express";
import { AppDataSource } from "../config/ormconfig";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";

const userRepository = AppDataSource.getRepository(User);

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, email, password } = req.body;
        const existing = await userRepository.findOne({ where: [{ username }, { email }] });
        if (existing) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        const hashed = await bcrypt.hash(password, 10);
        const user = userRepository.create({ username, email, password: hashed });
        await userRepository.save(user);
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Registration failed", error });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;
        const user = await userRepository.findOne({ where: { username } });
        if (!user) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        const token = generateToken({ id: user.id, username: user.username, isAdmin: user.isAdmin });
        res.json({ token, user: { id: user.id, username: user.username, email: user.email, isAdmin: user.isAdmin } });
    } catch (error) {
        res.status(500).json({ message: "Login failed", error });
    }
};
