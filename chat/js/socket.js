import {
    socket,
    setMessage
} from "./load.js";
import {
    listMessages,
    templateMessage
} from "./message";
import {scrollToBottom} from "./scroll";

export function socketConnect() {
    try {
        getMessageSocket()
    } catch (err) {
        console.log(err)
    }
}

function getMessageSocket() {
    try {
        socket.onmessage = function (event) {
            const json = JSON.parse(event.data);
            const name = json.user.name;
            const text = json.text;
            const date = json.createdAt;
            console.log(`Получено сообщение от ${name}: ${text}`);
            sendMessage(name, text, date)
            scrollToBottom();
        }
    } catch (err) {
        console.log(err);
    }
}

function sendMessage(name, text, date) {
    const message = templateMessage.content.cloneNode(true);
    setMessage(message, text, name, date);
    listMessages.append(message);
}

