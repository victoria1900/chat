import {
    UI_ELEMENTS
} from "./view";

import Cookies from 'js-cookie'
import {
    format
} from "date-fns";
import {closeAuthorization} from "./modal";
import {scrollToBottom} from "./scroll";
import {getValidJson, isValidEmail} from "./utils";

export const URL:string = 'mighty-cove-31255.herokuapp.com';
export const getToken = function ():string {
    return Cookies.get('token');
}
export const array = JSON.parse(getHistoryStorage());

export async function loadMail(): Promise<void> {
    const email:string = UI_ELEMENTS.INPUT_EMAIL.value;
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

function getHistory():void {
    const token = UI_ELEMENTS.INPUT_AUTHORIZATION.value;
    Cookies.set('token', token);
    setLocalHistory();
    closeAuthorization();
    console.log(`Вы успешно авторизованы`);
}

export async function setLocalHistory(): Promise<void> {
    try {
        const response:any = await fetch(`https://${URL}/api/messages`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${getToken()}`,
            }
        });
        const json:any = await response.json();
        const history:any = json.messages;
        localStorage.setItem('history', getValidJson(history));
    } catch (err) {
        console.log(err);
    }
}

export function getHistoryStorage():any {
    return localStorage.getItem('history');
}

export function renderHistory():void {
    const arrayReverse = array.reverse().splice(0, 20);
    const json = arrayReverse.reverse();
    getDataMessage(json);
    scrollToBottom();
}

renderHistory();

export function getDataMessage(json:any):void {
    for (let item of json) {
        const name:string = item.user.name;
        const text:string = item.text;
        const date:string = item.createdAt;
        const email:string = item.user.email;
        loadHistory(text, name, date, email);
    }
}

export function loadHistory(text:string, name:string, date:string, email:string) {
    const templateMessage:any = document.querySelector('#tmpl');
    const message = templateMessage.content.cloneNode(true);
    setMessage(message, text, name, date, email);
    isHasHistory(message);
}

function isHasHistory(message:any):void {
    const parseHistory = JSON.parse(getHistoryStorage());
    const listMessages = UI_ELEMENTS.MESSAGES_LIST;
    const arrayLength:number = array.length + 20;
    arrayLength === parseHistory.length ? listMessages.append(message) : listMessages.prepend(message);
}

export function setMessage(message:any, text:string, name:string, date:string, email:string) {
    const createdDate:string = format(new Date(date), 'dd.MM');
    const currentDate:string = format(new Date(), 'dd.MM');
    const messageDate:string = createdDate === currentDate ? format(new Date(date), 'HH:mm') : format(new Date(date), 'dd.MM' + ' ' + 'HH:mm');
    message.querySelector('.dialog__message-text').textContent = `${name}: ${text}`;
    message.querySelector('.dialog__message-time').textContent = `${messageDate}`;
    isOwnMessage(email, message);
}

function isOwnMessage(email:string, message:any):void {
    const emailCookie:string = Cookies.get('email');
    email === emailCookie ? message.querySelector('.dialog__message').classList.add('dialog__personal_message') : message.querySelector('.dialog__message').classList.add('dialog__someone_message');
}