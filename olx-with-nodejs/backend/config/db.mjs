import mongoose from 'mongoose';
import { MONGO_URI } from './environment.mjs';

mongoose.connect(MONGO_URI);

export default mongoose;