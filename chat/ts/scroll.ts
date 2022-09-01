import {UI_ELEMENTS} from "./view";
import {array, getDataMessage, getHistoryStorage} from "./load";

export function scrollToBottom() {
    UI_ELEMENTS.MESSAGES_WRAP.scrollTop = UI_ELEMENTS.MESSAGES_WRAP.scrollHeight;
}

export function showMessagesHistory() {
    const isHasMessageHistory = UI_ELEMENTS.MESSAGES_WRAP.scrollTop === 0 && array.length !== 0;
    if (isHasMessageHistory) {
        const json = array.splice(0, 20);
        addArrow();
        getDataMessage(json);
        UI_ELEMENTS.SCROLL_TOP.addEventListener('click', getToTop);
        console.log('Подгружаю еще 20 сообщений...');
    }
}

function addArrow() {
    UI_ELEMENTS.SCROLL_TOP.classList.add('arrow-visible');
}

function removeArrow() {
    UI_ELEMENTS.SCROLL_TOP.classList.remove('arrow-visible');
}

function getToTop() {
    getArray();
    UI_ELEMENTS.MESSAGES_WRAP.scrollTop = 0;
    removeArrow();
    UI_ELEMENTS.MESSAGES_WRAP.removeEventListener('scroll', showMessagesHistory);
    console.log('Вся история загружена');
}

function getArray() {
    const array = JSON.parse(getHistoryStorage());
    const json = array.reverse();
    getDataMessage(json);
}