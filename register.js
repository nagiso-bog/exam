const form = document.querySelector('.form');
const registerBtn = document.querySelector('.reg_btn');
const registerEmail = document.querySelector('.reg_email');
const registerPassword = document.querySelector('.reg_password');
const registerUsername = document.querySelector('.reg_username');

API_KEY = "6f458cb3-bffd-41bd-a4d9-25a47d0d9354";
BASE_URL = "https://api.restful-api.dev/";

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (registerEmail.value && registerPassword.value && registerUsername.value) {
        const newdata = {
            email: registerEmail.value,
            password: registerPassword.value,
            name: registerUsername.value
        };
        registerfunction(newdata);
    } else {
        alert("Please fill in all fields.");
    }
});
async function registerfunction(data) {
    try {
        const response = await fetch(BASE_URL + "register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": API_KEY,
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if (response.ok) {
            alert("Registration successful!");
            window.location.href = "dashboard.html";
        } else {
            alert("Registration failed: " + result.message);
        }

    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while registering.");
    }
}