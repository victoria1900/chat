import {
    UI_ELEMENTS
} from "./view.js";

import Cookies from 'js-cookie'
import {
    format
} from "date-fns";
import {closeAuthorization} from "./modal";
import {scrollToBottom} from "./scroll";
import {getValidJson, isValidEmail} from "./utils";

export const URL = 'mighty-cove-31255.herokuapp.com';
export const getToken = function () {
    return Cookies.get('token');
}
export const array = JSON.parse(getHistoryStorage());

export async function loadMail() {
    const email = UI_ELEMENTS.INPUT_EMAIL.value;
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
    UI_ELEMENTS.BUTTON_AUTHORIZATION.addEventListener('click', getHistory);
}

function getHistory() {
    const token = UI_ELEMENTS.INPUT_AUTHORIZATION.value;
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

export function getHistoryStorage() {
    return localStorage.getItem('history');
}

export function renderHistory() {
    const arrayReverse = array.reverse().splice(0, 20);
    const json = arrayReverse.reverse();
    getDataMessage(json);
    scrollToBottom();
}

renderHistory();

export function getDataMessage(json) {
    for (let item of json) {
        const name = item.user.name;
        const text = item.text;
        const date = item.createdAt;
        const email = item.user.email;
        loadHistory(text, name, date, email, json);
    }
}

export function loadHistory(text, name, date, email, json) {
    const templateMessage = document.querySelector('#tmpl');
    const message = templateMessage.content.cloneNode(true);
    setMessage(message, text, name, date, email);
    isHasHistory(json, message);
}

function isHasHistory(json, message) {
    const parseHistory = JSON.parse(getHistoryStorage());
    const listMessages = UI_ELEMENTS.MESSAGES_LIST;
    const arrayLength = array.length + 20;
    arrayLength === parseHistory.length ? listMessages.append(message) : listMessages.prepend(message);
}

export function setMessage(message, text, name, date, email) {
    const createdDate = format(new Date(date), 'dd.MM');
    const currentDate = format(new Date(), 'dd.MM');
    const messageDate = createdDate === currentDate ? format(new Date(date), 'HH:mm') : format(new Date(date), 'dd.MM' + ' ' + 'HH:mm');
    message.querySelector('.dialog__message-text').textContent = `${name}: ${text}`;
    message.querySelector('.dialog__message-time').textContent = `${messageDate}`;
    isOwnMessage(email, message);
}

function isOwnMessage(email, message) {
    const emailCookie = Cookies.get('email');
    email === emailCookie ? message.querySelector('.dialog__message').classList.add('dialog__personal_message') : message.querySelector('.dialog__message').classList.add('dialog__someone_message');
}