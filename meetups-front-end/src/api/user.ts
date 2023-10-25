import { BASE_URL } from "./index"

interface ApiSignupLoginBody {
    username: string,
    password: string
}

export async function apiSignup(body: ApiSignupLoginBody) {
    try {
        const response = await fetch(BASE_URL + "/signup", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        })
        const data = await response.json()
        localStorage.setItem('userToken', '')
        localStorage.setItem('username', '')
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function apiLogin(body: ApiSignupLoginBody) {
    const { username } = body
    try {
        const response = await fetch(BASE_URL + "/login", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        })
        const data = await response.json()
        localStorage.setItem('userToken', data?.token)
        localStorage.setItem('username', username)
        return data
    } catch (error) {
        console.log(error)
    }
}