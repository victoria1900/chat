import {
    UI_ELEMENTS
} from "./view";

export function showSettings():void {
    UI_ELEMENTS.POPUP_SETTINGS.classList.add('popup--active');
    closeSettings();
}

export function showAuthorization():void {
    UI_ELEMENTS.POPUP_AUTHORIZATION.classList.add('popup--active');
    closeAuthorization();
}

export function closeSettings():void {
    UI_ELEMENTS.BUTTON_CLOSE.forEach(function (button) {
        button.addEventListener('click', function ():void {
            UI_ELEMENTS.POPUP_SETTINGS.classList.remove('popup--active');
        });
    });
}

export function closeAuthorization():void {
    UI_ELEMENTS.BUTTON_CLOSE.forEach(function (button) {
        button.addEventListener('click', function ():void {
            UI_ELEMENTS.POPUP_AUTHORIZATION.classList.remove('popup--active');
        });
    });
}