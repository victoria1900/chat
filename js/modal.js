import {
    UI_ELEMENTS
} from "./view.js";

export function showSettings() {
    UI_ELEMENTS.POPUP_SETTINGS.classList.add('popup--active');
    closeSettings();
}

export function showAuthorization() {
    UI_ELEMENTS.POPUP_AUTHORIZATION.classList.add('popup--active');
    closeAuthorization();
}

export function closeSettings() {
    UI_ELEMENTS.BUTTON_CLOSE.forEach(function (button) {
        button.addEventListener('click', function () {
            UI_ELEMENTS.POPUP_SETTINGS.classList.remove('popup--active');
        });
    });
}

export function closeAuthorization() {
    UI_ELEMENTS.BUTTON_CLOSE.forEach(function (button) {
        button.addEventListener('click', function () {
            UI_ELEMENTS.POPUP_AUTHORIZATION.classList.remove('popup--active');
        });
    });
}