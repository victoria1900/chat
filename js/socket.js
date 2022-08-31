import {
    getMessageSocket
} from "./message";
import {getToken, URL} from "./load";

export const socket = new WebSocket(`ws://${URL}/websockets?${getToken()}`);

export function socketConnect() {
    try {
        getMessageSocket();
    } catch (err) {
        console.log(err);
    }
}

export function socketSend(message) {
    socket.send(JSON.stringify({
        text: message,
    }));
}

