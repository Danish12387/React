import express from "express";
import cors from 'cors';
import routes from './routes/index.mjs';
import db from './config/db.mjs';

const app = express();

db.connection.once('open', () => console.log('Connected to DB')).on("error", (err) => console.log("Error Connecting to DB -->", err))

app.listen(5000, function() {
    console.log('Server is running.')
})

app.use(cors());
app.use(express.json());

app.use('/', routes);