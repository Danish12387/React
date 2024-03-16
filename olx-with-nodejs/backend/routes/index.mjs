import express from "express";
import Users from '../models/Users.mjs';

const router = express.Router();

router.put('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email });

        if (!user) {
            res.send({ message: 'User Not Found!' })
            return;
        }

        const isCorrectPass = user.comparePassword(password);

        if (!isCorrectPass) {
            res.send({ message: 'Invalid Password!' })
            return
        }

        // Generate Token:
        const token = user.generateToken();
        user.tokens.push(token);
        await user.save();

        res.send({ message: "User logged in successfully!", token: token });
    }
    catch (e) {
        res.send({ message: e.message });
    }
})

export default router;

