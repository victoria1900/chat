export const UI_ELEMENTS = {
    MESSAGES_LIST: document.querySelector('.dialog__message-list') as HTMLInputElement,
    MESSAGES_WRAP: document.querySelector('.dialog__message-box') as HTMLInputElement,

    POPUP_AUTHORIZATION: document.querySelector('#authorization') as HTMLInputElement,
    POPUP_SETTINGS: document.querySelector('#settings') as HTMLInputElement,

    INPUT_MESSAGE: document.querySelector('.dialog__message-input') as HTMLInputElement,
    INPUT_EMAIL: document.querySelector('#authorization_mail_input') as HTMLInputElement,
    INPUT_AUTHORIZATION: document.querySelector('#authorization_code_input') as HTMLInputElement,
    INPUT_USERNAME: document.querySelector('.popup__input-name') as HTMLInputElement,

    BUTTON_SUBMIT: document.querySelector('.dialog__message-submit') as HTMLInputElement,
    BUTTON_SETTINGS: document.querySelector('.dialog__btn-settings') as HTMLInputElement,
    BUTTON_CLOSE: document.querySelectorAll('.popup__header-close'),
    BUTTON_SIGN_UP: document.querySelector('.dialog__btn-exit') as HTMLInputElement,
    BUTTON_EMAIL_INPUT: document.querySelector('#authorization_mail') as HTMLInputElement,
    BUTTON_AUTHORIZATION: document.querySelector('#authorization_code') as HTMLInputElement,
    BUTTON_NAME_INPUT: document.querySelector('.popup__submit') as HTMLInputElement,

    SCROLL_TOP: document.querySelector('.arrow') as HTMLInputElement,
}

