import {
    UI_ELEMENTS
} from "./view.js";
import {
    showAuthorization,
    showSettings
} from "./modal.js";
import {
    loadMail
} from "./load.js";
import {
    socketConnect
} from "./socket";
import {getNewMessage} from "./message";
import {setUser} from "./user";
import {showMessagesHistory} from "./scroll";

UI_ELEMENTS.BUTTON_SUBMIT.addEventListener('click', getNewMessage);
UI_ELEMENTS.BUTTON_SETTINGS.addEventListener('click', showSettings);
UI_ELEMENTS.BUTTON_SIGN_UP.addEventListener('click', showAuthorization);
UI_ELEMENTS.BUTTON_EMAIL_INPUT.addEventListener('click', loadMail);
UI_ELEMENTS.BUTTON_NAME_INPUT.addEventListener('click', setUser);
UI_ELEMENTS.MESSAGES_WRAP.addEventListener('scroll', showMessagesHistory);

socketConnect();









