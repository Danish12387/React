import express from "express";
import Users from '../models/Users.mjs';
import verifyToken from '../middlewares/verifyToken.mjs';
import Ads from "../models/Adds.mjs";
import { MongoClient } from 'mongodb';

const router = express.Router();

router.get('/protectedRoute', verifyToken, (req, res) => {
    res.status(200).send({ message: "Protected", uid: req.userId });
});

// router.post('/adds', async (req, res) => {
//     try {
//         // const ad = new Ads(req.body)
//         // await ad.save()
//         await Ads.insertMany(req.body);
//         res.send({ message: 'Ad posted successfully' })
//     }
//     catch (e) {
//         res.send({ message: e.message })
//     }
// })

router.get('/ads', async (req, res) => {
    try {
        const ads = await Ads.find();
        res.send(ads);
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
});


router.post('/adds', async (req, res) => {
    try {
        const { products } = req.body;

        if (!Array.isArray(products)) {
            return res.status(400).send({ message: 'Invalid data format. Expected an array of products.' });
        }

        const ads = await Ads.insertMany(products);

        console.log('Ads posted:', ads);

        res.send({ message: 'Ads posted successfully', ads });
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
});


router.post('/register', async (req, res) => {
    try {
        const { email } = req.body;
        const IsExists = await Users.findOne({ email });

        if (IsExists) {
            res.send({ message: 'Email already exists!' })
            return;
        }
        const user = new Users(req.body);
        const obj = user.generateToken();
        user.tokens.push(obj.token);
        await user.save();

        res.send({ message: 'User registered successfully!', data: obj });
    }
    catch (e) {
        res.send({ message: e.message })
    }
})

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
        const obj = user.generateToken();
        user.tokens.push(obj.token);
        await user.save();

        res.send({ message: "User logged in successfully!", data: obj });
    }
    catch (e) {
        res.send({ message: e.message });
    }
})

router.put('/logout', verifyToken, async (req, res) => {
    await Users.findByIdAndUpdate(req.userId, { $pull: { tokens: req.tokenToRemove } });
    res.send({ message: 'Logged Out Successfully!' })
})

export default router;

