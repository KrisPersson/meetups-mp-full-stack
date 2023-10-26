import { BASE_URL } from "./index"

export async function apiSignup(username: string, password: string) {
    try {
        const response = await fetch(BASE_URL + "/signup", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ username, password })
        })
        const data = await response.json()
        localStorage.setItem('userToken', '')
        localStorage.setItem('username', '')
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function apiLogin(username: string, password: string) {
    try {
        const response = await fetch(BASE_URL + "/login", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ username, password })
        })
        const data = await response.json()
        localStorage.setItem('userToken', data?.token)
        localStorage.setItem('username', data?.username)
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function apiGetUserProfile(token: string) {
    try {
        const response = await fetch(BASE_URL + "/me", {
            method: "GET",
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        return data
    } catch (error) {
        return error
    }
}