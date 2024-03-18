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

router.post('/adds', async (req, res) => {
    const uri = 'mongodb+srv://danishshah:kinganonymous12@cluster0.w21gqbx.mongodb.net/';
    const dbName = 'olx';
    const collectionName = 'ads';

    console.log(req.body);

    const client = new MongoClient(uri);
    try {
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        await collection.insertMany(req.body);

        res.send({ message: 'Dummy products added successfully' });
    } catch (e) {
        res.status(500).send({ message: e.message });
    } finally {
        await client.close();
    }
});

router.post('/register', async (req, res) => {
    try {
        const { email } = req.body;
        const user = new Users(req.body);
        const IsExists = await Users.findOne({ email });

        if (IsExists) {
            res.send({ message: 'Email already exists!' })
            return;
        }
        await user.save()

        res.send({ message: 'User registered successfully!' })
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

