const login_form = document.querySelector('.login_form');
const login_email = document.querySelector('.login_email');
const login_password = document.querySelector('.login_password');
const login_btn = document.querySelector('.login_btn');

API_KEY = "6f458cb3-bffd-41bd-a4d9-25a47d0d9354";
BASE_URL = "https://api.restful-api.dev/";

login_form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (login_email.value && login_password.value) {
        const newData = {
            email: login_email.value,
            password: login_password.value
        };
        loginFunction(newData);
    } else {
        alert("Please fill in all fields.");
    }
});
async function loginFunction(data) {
    try {
        const response = await fetch(BASE_URL + "login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": API_KEY,
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if (response.ok) {
            alert("Login successful!");
            localStorage.setItem("user", JSON.stringify(result));
            window.location.href = "/dashboard.html";
            console.log(result);
        } else {
            alert("Login failed: " + result.message);
        }
        return result;
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while logging in.");
    }
}