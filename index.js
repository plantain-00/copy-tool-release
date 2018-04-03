"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const socket_io_1 = tslib_1.__importDefault(require("socket.io"));
const minimist_1 = tslib_1.__importDefault(require("minimist"));
const lodash_debounce_1 = tslib_1.__importDefault(require("lodash.debounce"));
const app = express_1.default();
const argv = minimist_1.default(process.argv.slice(2));
const port = argv.p || 8000;
const host = argv.h || 'localhost';
app.use(express_1.default.static(__dirname + '/static'));
const server = app.listen(port, host, () => {
    console.log(`api Server is listening: ${host}:${port}`);
});
const io = socket_io_1.default(server);
/**
 * for all sockets, if it joined the room, count it, minus current socket itself
 */
function getClientCount(room) {
    let clientCount = 0;
    for (const socketId in io.sockets.sockets) {
        if (io.sockets.sockets.hasOwnProperty(socketId)) {
            const rooms = io.sockets.sockets[socketId].rooms;
            if (rooms[room] !== undefined) {
                clientCount++;
            }
        }
    }
    return clientCount - 1;
}
io.on('connection', socket => {
    const room = socket.handshake.query.room;
    if (!room) {
        socket.disconnect(true);
    }
    else {
        socket.join(room);
        const sendClientCount = lodash_debounce_1.default(() => {
            io.in(room).emit('client_count', {
                clientCount: getClientCount(room)
            });
        }, 300);
        // when a client connected, client count changed, and should broadcast it to all clients in the room.
        sendClientCount();
        socket.on('copy', (data) => {
            // for all sockets, if it joined the room and not current socket, send the message
            for (const socketId in io.sockets.sockets) {
                if (io.sockets.sockets.hasOwnProperty(socketId)) {
                    const rooms = io.sockets.sockets[socketId].rooms;
                    if (rooms[room] !== undefined
                        && socketId !== socket.id) {
                        io.in(socketId).emit('copy', data);
                    }
                }
            }
            // notify to sender if message is sent successfully
            socket.emit('message_sent', {
                kind: data.kind
            });
        });
        socket.on('offer', (data) => {
            const json = {
                sid: socket.id,
                offer: data
            };
            // for all sockets, if it joined the room and not current socket, send the offer
            for (const socketId in io.sockets.sockets) {
                if (io.sockets.sockets.hasOwnProperty(socketId)) {
                    const rooms = io.sockets.sockets[socketId].rooms;
                    if (rooms[room] !== undefined
                        && socketId !== socket.id) {
                        io.in(socketId).emit('offer', json);
                    }
                }
            }
        });
        socket.on('answer', (data) => {
            io.in(data.sid).emit('answer', {
                sid: socket.id,
                answer: data.answer
            });
        });
        // when a client disconnected, client count changed, and should broadcast it to all clients in the room.
        socket.on('disconnect', () => {
            sendClientCount();
        });
    }
});
process.on('SIGINT', () => {
    process.exit();
});
process.on('SIGTERM', () => {
    process.exit();
});
