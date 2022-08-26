import {UI_ELEMENTS} from "./view";
import {array, getDataMessage, getHistoryStorage} from "./load";

export let messageWrap = UI_ELEMENTS.MESSAGES_WRAP;
const scrollTop = UI_ELEMENTS.SCROLL_TOP;

export function scrollToBottom() {
    messageWrap.scrollTop = messageWrap.scrollHeight;
}

export function showMessagesHistory() {
    if (messageWrap.scrollTop === 0 && array.length !== 0) {
        scrollTop.classList.add('arrow-visible');
        console.log('Подгружаю еще 20 сообщений...');
        let json = array.splice(0, 20);
        getDataMessage(json);
        scrollTop.addEventListener('click', getToTop);
    }
}

function getToTop() {
    let array = JSON.parse(getHistoryStorage());
    let json = array.reverse();
    getDataMessage(json);
    messageWrap.scrollTop = 0;
    scrollTop.classList.remove('arrow-visible');
    console.log('Вся история загружена');
}
