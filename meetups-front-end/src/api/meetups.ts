import { BASE_URL } from "./index"

export async function apiGetUpcomingMeetUps(token: string) {
    try {
        const response = await fetch(BASE_URL + "/meetups", {
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

export async function apiAttendLeaveMeetup(token: string, meetupId: string, attendOrLeave: 'attend' | 'leave') {
    const body = {
        meetupId
    }
    try {
        const response = await fetch(BASE_URL + `/meetups/${attendOrLeave}`, {
            method: "PUT",
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function apiSubmitReview(token: string, meetupId: string, review: string, rating: number) {
    const body = {
        meetupId,
        review,
        rating
    }
    try {
        const response = await fetch(BASE_URL + `/review`, {
            method: "POST",
            
            body: JSON.stringify(body)
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}
