import app from './app';
import './db';
import './models/Video';
import './models/Comment';
import './models/User';
const PORT = 4000;

const handleListening = () => console.log(`listening on ${PORT}`);

app.listen(PORT, handleListening);