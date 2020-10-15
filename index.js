import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import router from './router.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

//Connect to DB
mongoose.connect(process.env.MONGODB_URI, 
    { useNewUrlParser: true, useUnifiedTopology: true,}
).then(() => {
    console.log('Connect to DB success');
}).catch(err => {
    console.log('Connect to failed' + err);
});

//Middleware
app.use(express.json());
app.use(morgan('dev'));

//Routes
app.get('/', (req, res) => {
    res.json({
        message: 'success'
    });
});

app.use('/api', router);

const PORT = process.env.PORT || '4000';

app.listen(PORT, () => {
    console.log(`App listen to port ${PORT}`);
});