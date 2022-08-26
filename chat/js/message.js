import {
    UI_ELEMENTS
} from "./view.js";
import {setLocalHistory, socket} from "./load";
import {scrollToBottom} from "./scroll";

export const templateMessage = document.querySelector('#tmpl');
const inputMessage = UI_ELEMENTS.INPUT_MESSAGE;
export const listMessages = UI_ELEMENTS.MESSAGES_LIST;

export function getNewMessage() {
    let message = inputMessage.value;
    isValidInput();
    socketSend(message);
    setLocalHistory();
    scrollToBottom();
}

function socketSend(message) {
    socket.send(JSON.stringify({
        text: message,
    }));
}

function isValidInput() {
    if (inputMessage.value === '') {
        console.log('Введите сообщение');
    } else {
        inputMessage.value = '';
    }
}