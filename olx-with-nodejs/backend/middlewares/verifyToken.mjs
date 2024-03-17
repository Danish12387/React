import Jwt from "jsonwebtoken";
import jwtSecret from "../config/jwt.mjs";
import Users from "../models/Users.mjs";

async function verifyToken(req, res, next) {
    const token = req.headers.authorization?.slice(7);
    try {
        if (!token) {
            res.status(401).send({ message: 'No access!' })
            return;
        }

        const decoded = Jwt.verify(token, jwtSecret);
        const tokenExists = await Users.findOne({ tokens: token });

        if (!tokenExists) {
            res.status(401).send({ message: 'Invalid Token!' });
            return;
        }

        // if (decoded._id !== req.body.userId) {
        //     return res.status(401).json({ message: 'Unauthorized' });
        // }

        req.userId = decoded._id;
        req.tokenToRemove = token;
        next();
    }
    catch (e) {
        res.status(401).send({ message: "Invalid Token!" })
    }

}

export default verifyToken;