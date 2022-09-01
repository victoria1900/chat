import {
    getToken, setLocalHistory,
    URL
} from "./load";
import {UI_ELEMENTS} from "./view";
import {closeSettings} from "./modal";

export function setUser(): void {
    const name: string = UI_ELEMENTS.INPUT_USERNAME.value;
    setUserName(name);
    closeSettings();
    setLocalHistory();
}

async function setUserName(name: string): Promise<void> {
    try {
        const response = await fetch(`https://${URL}/api/user`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${getToken()}`,
            },
            body: JSON.stringify({
                name: name,
            })
        });
        const json = await response.json();
        const userName: string = json.name;
        console.log(`Имя пользователя изменено на: ${userName}`);
    } catch (err: unknown) {
        console.log(err);
    }
}

export async function getUser(): Promise<void> {
    try {
        const response = await fetch(`https://${URL}/api/user/me`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${getToken()}`,
            }
        });
        const json = await response.json();
    } catch (err: unknown) {
        console.log(err);
    }
}