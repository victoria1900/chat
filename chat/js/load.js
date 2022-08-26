import {
    UI_ELEMENTS
} from "./view.js";
import {
    listMessages,
    templateMessage
} from "./message.js";
import Cookies from 'js-cookie'
import {
    format
} from "date-fns";
import {closeAuthorization} from "./modal";
import {messageWrap, scrollToBottom} from "./scroll";

export const URL = 'mighty-cove-31255.herokuapp.com';
export const getToken = function () {
    return Cookies.get('token');
}
export const socket = new WebSocket(`ws://${URL}/websockets?${getToken()}`);
const buttonAuthorization = UI_ELEMENTS.BUTTON_AUTHORIZATION;
const inputEmail = UI_ELEMENTS.INPUT_EMAIL;
const inputAuthorization = UI_ELEMENTS.INPUT_AUTHORIZATION;

export async function loadMail() {
    const email = inputEmail.value;
    Cookies.set('email', email);
    try {
        await fetch(`https://${URL}/api/user`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                email: email
            })
        });
        isValidEmail(email);
    } catch (err) {
        console.log(err);
    }
    buttonAuthorization.addEventListener('click', getHistory);
}

function isValidEmail(email) {
    if (email === '') {
        console.log('Введите почту')
    } else {
        console.log('Код был отправлен!');
    }
}

function getHistory() {
    const token = inputAuthorization.value;
    Cookies.set('token', token);
    setLocalHistory();
    closeAuthorization();
    console.log(`Вы успешно авторизованы`);
}

export async function setLocalHistory() {
    try {
        const response = await fetch(`https://${URL}/api/messages`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${getToken()}`,
            }
        });
        const json = await response.json();
        const history = json.messages;
        localStorage.setItem('history', getValidJson(history));
    } catch (err) {
        console.log(err);
    }
}

function getValidJson(value) {
    return JSON.stringify(value);
}

export function getHistoryStorage() {
    return localStorage.getItem('history');
}

export const array = JSON.parse(getHistoryStorage());

export function renderHistory() {
    let json = array.reverse().splice(0, 20);
    json = json.reverse();
    getDataMessage(json);
    scrollToBottom();
}

export function getDataMessage(json) {
    for (let item of json) {
        const name = item.user.name;
        const text = item.text;
        const date = item.createdAt;
        const email = item.user.email;
        loadHistory(text, name, date, email, json);
    }
}

renderHistory()

export function loadHistory(text, name, date, email, json) {
    const message = templateMessage.content.cloneNode(true);
    setMessage(message, text, name, date, email);
    isHasHistory(json, message);
}

function isHasHistory(json, message) {
    let parseHistory = JSON.parse(getHistoryStorage());
    if (array.length + 20 === parseHistory.length) {
        listMessages.append(message);
    } else {
        listMessages.prepend(message);
    }
}

export function setMessage(message, text, name, date, email) {
    message.querySelector('.dialog__message-text').textContent = `${name}: ${text}`;
    let createdDate = format(new Date(date), 'dd.MM');
    let currentDate = format(new Date(), 'dd.MM');
    let messageDate;
    if (createdDate === currentDate) {
        messageDate = format(new Date(date), 'HH:mm');
    } else {
        messageDate = format(new Date(date), 'dd.MM' + ' ' + 'HH:mm');
    }
    message.querySelector('.dialog__message-time').textContent = `${messageDate}`;
    isOwnMessage(email, message);
}

function isOwnMessage(email, message) {
    const emailCookie = Cookies.get('email');
    if (email === emailCookie) {
        message.querySelector('.dialog__message').classList.add('dialog__personal_message');
    } else {
        message.querySelector('.dialog__message').classList.add('dialog__someone_message');
    }
}



