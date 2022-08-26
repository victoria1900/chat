import {
    UI_ELEMENTS
} from "./view.js";

const popupSettings = UI_ELEMENTS.POPUP_SETTINGS;
export const popupAuthorization = UI_ELEMENTS.POPUP_AUTHORIZATION;
const closePopup = UI_ELEMENTS.BUTTON_CLOSE;

export function showSettings() {
    popupSettings.classList.add('popup--active');
    closePopup.forEach(function (button) {
        button.addEventListener('click', closeSettings);
    })
}

export function showAuthorization() {
    popupAuthorization.classList.add('popup--active');
    closePopup.forEach(function (button) {
        button.addEventListener('click', closeAuthorization);
    });
}

export function closeSettings() {
    popupSettings.classList.remove('popup--active');
}

export function closeAuthorization() {
    popupAuthorization.classList.remove('popup--active');
}