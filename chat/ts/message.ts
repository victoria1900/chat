import {
    UI_ELEMENTS
} from "./view";
import {setLocalHistory, setMessage} from "./load";
import {scrollToBottom} from "./scroll";
import {socket, socketSend} from "./socket";
import {isValidInput} from "./utils";

export function getNewMessage() {
    const inputMessage = UI_ELEMENTS.INPUT_MESSAGE;
    const message = inputMessage.value;
    isValidInput(inputMessage);
    socketSend(message);
    setLocalHistory();
    scrollToBottom();
}

export function getMessageSocket() {
    try {
        socket.onmessage = function (event:any) {
            const json = JSON.parse(event.data);
            const name = json.user.name;
            const text = json.text;
            const date = json.createdAt;
            sendMessage(name, text, date)
            scrollToBottom();
            console.log(`Получено сообщение от ${name}: ${text}`);
        }
    } catch (err) {
        console.log(err);
    }
}

function sendMessage(name:string, text:string, date:string) {
    const templateMessage:any = document.querySelector('#tmpl');
    const message = templateMessage.content.cloneNode(true);
    const listMessages = UI_ELEMENTS.MESSAGES_LIST;
    // @ts-ignore
    setMessage(message, text, name, date);
    listMessages.append(message);
}

