
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
export const documents = async () => {
    const request = new Request('http://localhost:1337/api/document/list', {
        mode: 'cors',
        method: "GET",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(),
    });
    try {
        return await (await fetch(request)).json()
    } catch {
        return null
    }
}