const API = "http://localhost:3000";
let token = localStorage.getItem("token");

function requireAuth() {
    if (!token) {
        window.location = "index.html";
    }
}

function logout() {
    localStorage.removeItem("token");
    window.location = "index.html";
}

async function api(endpoint, method = "GET", body = null) {
    const options = {
        method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    };
    if (body) options.body = JSON.stringify(body);

    const res = await fetch(API + endpoint, options);
    return res.json();
}
