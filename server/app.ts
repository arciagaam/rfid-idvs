import 'dotenv/config';

import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import routes from './src/routes';

const app = express();

app.use(json());
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

app.set('port', 3000)

app.use('/api', routes);

app.get('/', (req, res) => {
    res.send('API is running');
});

app.listen(app.get('port'), () => {
    console.log(`Listening to http://localhost:${app.get('port')}`)
})

module.exports = app;
