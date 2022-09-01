export function isValidInput(inputMessage) {
    if (inputMessage.value === '') {
        console.log('Введите сообщение');
    } else {
        inputMessage.value = '';
    }
}

export function isValidEmail(email) {
    if (email === '') {
        console.log('Введите почту')
    } else {
        console.log('Код был отправлен!');
    }
}

export function getValidJson(value) {
    return JSON.stringify(value);
}