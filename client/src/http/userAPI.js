
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
export const GetTasks = async () => {
    const request = new Request('http://localhost:1337/api/task/list', {
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