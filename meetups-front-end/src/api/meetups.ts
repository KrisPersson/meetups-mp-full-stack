import { BASE_URL, logout } from './index';

export async function apiGetUpcomingMeetUps(token: string) {
  try {
    const response = await fetch(BASE_URL + '/meetups', {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.status === 401) {
      logout();
    }
    return data;
  } catch (error) {
    return error;
  }
}

export async function apiGetSpecificMeetup(token: string, meetupId: string) {
  try {
    const response = await fetch(BASE_URL + `/meetups/${meetupId}`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.status === 401) {
      logout();
    }
    return data;
  } catch (error) {
    return error;
  }
}

export async function apiAttendLeaveMeetup(
  token: string,
  meetupId: string,
  attendOrLeave: 'attend' | 'leave'
) {
  const body = {
    meetupId,
  };
  try {
    const response = await fetch(BASE_URL + `/meetups/${attendOrLeave}`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (response.status === 401) {
      logout();
    }
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function apiSubmitReview(
  token: string,
  meetupId: string,
  reviewing: string,
  rating: number
) {
  const body = {
    meetupId,
    reviewing,
    rating,
  };
  try {
    const response = await fetch(BASE_URL + `/reviews`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (response.status === 401) {
      logout();
    }

    return data;
  } catch (error) {
    console.log(error);
  }
}
