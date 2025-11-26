const API_URL = "http://localhost:3000";

function getToken() {
    return localStorage.getItem("token");
}

async function apiGet(url) {
    const resp = await fetch(API_URL + url, {
        headers: { "Authorization": "Bearer " + getToken() }
    });
    return resp.json();
}

async function apiPost(url, data) {
    const resp = await fetch(API_URL + url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getToken()
        },
        body: JSON.stringify(data)
    });
    return resp.json();
}

async function apiPut(url, data) {
    const resp = await fetch(API_URL + url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getToken()
        },
        body: JSON.stringify(data)
    });
    return resp.json();
}

async function apiPatch(url, data) {
    const resp = await fetch(API_URL + url, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getToken()
        },
        body: JSON.stringify(data)
    });
    return resp.json();
}

async function apiDelete(url) {
    const resp = await fetch(API_URL + url, {
        method: "DELETE",
        headers: { "Authorization": "Bearer " + getToken() }
    });
    return resp.json();
}