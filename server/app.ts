import 'dotenv/config';

import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import routes from './src/routes';
import { errorHandler } from './src/middlewares/errorHandler';

const app = express();

app.use(json());
app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true
}));
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

app.set('port', 3000)

app.use('/api', routes);

// Error handle middleware
app.use(errorHandler);

app.get('/', (req, res) => {
    res.send('API is running');
});

app.listen(app.get('port'), () => {
    console.log(`Listening to http://localhost:${app.get('port')}`)
})

module.exports = app;
