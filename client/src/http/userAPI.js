import { pdfjs } from "react-pdf";
import {  } from "../utils/consts"

export const authorization = async (login, password) => {
    const data = { login : login, password : password }
    const request = new Request('http://localhost:1337/api/login', {
        mode: 'cors',
        method: "POST",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });
    try {
        return await (await fetch(request)).json()
    } catch {
        return null
    }
}
export const GetDocuments = async () => {
    const request = new Request('http://localhost:1337/api/document/allowed', {
        mode: 'cors',
        method: "GET",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        },
    });
    try {
        return await (await fetch(request)).json()
    } catch {
        return null
    }
}
export const GetTasks = async () => {
    const request = new Request('http://localhost:1337/api/task/active', {
        mode: 'cors',
        method: "GET",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        },
    });
    try {
        return await (await fetch(request)).json()
    } catch {
        return null
    }
}
export const GetReport = async (id) => {
    const request = new Request(' http://localhost:1337/api/report/taskReport/?userID=' + id, {
        mode: 'cors',
        method: "GET",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        },
    });
    try {
        return await (await fetch(request)).json()
    } catch {
        return null
    }
}
// TODO не знаю даже
export const SetFiles = async (fData) => {
    const request = new Request('http://localhost:1337/api/upload', {
        mode: 'cors',
        method: "POST",
        credentials: "include",
        headers: {
            'Content-Type': 'application/pdf'
        },
        body: pdfjs.stringify(fData),
        //body: JSON.stringify(fData),
    });
    try {
        return await (await fetch(request)).json()
    } catch {
        return null
    }
}

/**
 * Функция, отслылающая запрос к API. Уведомляет АПИ о выполнении задания с ID = %taskID
 */
export async function SetCompleted(taskID) {
    const path = process.env.REACT_APP_API_URL + process.env.REACT_APP_API_TASK_PATH + process.env.REACT_APP_API_COMPLETE_TASK;
    const request = new Request(path , {
        mode: 'cors',
        method: "POST",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({taskID : taskID})
    });
    try {
        await fetch(request);
    }
    catch(e) {
        console.log(e);
    }
}
// Получить список пользователей
export const GetListUsers = async () => {
    const request = new Request('http://localhost:1337/api/user/workers', {
        mode: 'cors',
        method: "GET",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        },
    });
    try {
        return await (await fetch(request)).json()
    } catch {
        return null
    }
}
// Получить список документов
export const GetListDocuments = async () => {
    const request = new Request('http://localhost:1337/api/document/list', {
        mode: 'cors',
        method: "GET",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        },
    });
    try {
        return await (await fetch(request)).json()
    } catch {
        return null
    }
}
// Получить список ролей
export const GetListPosition = async () => {
    const request = new Request('http://localhost:1337/api/group/positionList', {
        mode: 'cors',
        method: "GET",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        },
    });
    try {
        return await (await fetch(request)).json()
    } catch {
        return null
    }
}
// Внесение нового задания
export async function SetTask(type, document, recipient, startDate, deadline) {
    const data = { type : type, document : document, recipient : recipient, startDate : startDate, deadline : deadline}
    const request = new Request('http://localhost1337/api/task/add' , {
        mode: 'cors',
        method: "POST",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        await fetch(request);
    }
    catch(e) {
        console.log(e);
    }
}

