import {
    getMessageSocket
} from "./message";
import {getToken, URL} from "./load";

export const socket:any = new WebSocket(`ws://${URL}/websockets?${getToken()}`);

export function socketConnect():void {
    try {
        getMessageSocket();
    } catch (err:unknown) {
        console.log(err);
    }
}

export function socketSend(message:string):void {
    socket.send(JSON.stringify({
        text: message,
    }));
}

