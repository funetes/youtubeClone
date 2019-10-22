import '@babel/polyfill';
import app from './app';
import './db';
import './models/Video';
import './models/Comment';
import './models/User';
import dotenv from 'dotenv';
dotenv.config()
const PORT = process.env.PORT || 4000;

const handleListening = () => console.log(`listening on ${PORT}`);

app.listen(PORT, handleListening);