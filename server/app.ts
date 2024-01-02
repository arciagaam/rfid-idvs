import 'dotenv/config';
import colors from 'colors';
import express, { NextFunction, Request, Response, json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import routes from './src/routes';
import { errorHandler } from './src/middlewares/errorHandler';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';

let connectionLogged = false

export const USER_IMAGE_STORAGE_PATH = path.join(__dirname, "public", "images", "users")

const app = express();

const socketServer = createServer(app);

const io = new Server(socketServer, {
    cors: {
        origin: ['http://localhost:3001'],
    }
});

io.on('connection', (socket) => {
    if (!connectionLogged) {
        console.log(colors.blue('Socket connection initialized'))
        connectionLogged = true
    }

    socket.on('disconnect', () => {
        console.log(colors.red('Socket connection disconnected'))
        connectionLogged = false
    })
})


app.use((req: any, res: Response, next: NextFunction) => {
    req.io = io;
    return next();
})

app.use(json());
app.use(cors(
    {
        origin: 'http://localhost:3001',
        credentials: true
    }
));
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'))

app.set('port', 3000)
app.set('socket_port', 8000)
app.set('modalIsOpen', false)
app.set('currentActiveModal', null)
app.set('currentTermId', null)

app.use('/api', routes);

// Error handle middleware
app.use(errorHandler);

socketServer.listen(app.get('socket_port'), () => {
    console.log(colors.yellow('==========================='))
    console.log(colors.yellow(`Socket Server running on port ${app.get('socket_port')}`))
})

// old app listen
app.listen(app.get('port'), () => {
    console.log(colors.yellow(`Server running on port ${app.get('port')}`))
    console.log(colors.yellow('==========================='))
})

module.exports = app;
