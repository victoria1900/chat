export function isValidInput(inputMessage:any): void {
    inputMessage.value === '' ? console.log('Введите сообщение') : inputMessage.value = '';
}

export function isValidEmail(email: string): void {
    email === '' ? console.log('Введите почту') : console.log('Код был отправлен!');
}

export function getValidJson(value: any): string {
    return JSON.stringify(value);
}