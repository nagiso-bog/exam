const addBtn = document.querySelector('.add_btn');
const Price = document.querySelector('.productprice');
const Year = document.querySelector('.productyear');
const cpu = document.querySelector('.cpumodel');
const disk = document.querySelector('.harddisk');
const list = document.querySelector('.list');
const productName = document.querySelector('.productname');

const user = JSON.parse(localStorage.getItem("user")) || false;
const userName = document.querySelector(".user_name");
const form = document.querySelector('.form');

if (!user) {
    window.location.href = "login.html";
}

userName.textContent = user.name;

API_KEY = "6f458cb3-bffd-41bd-a4d9-25a47d0d9354";
BASE_URL = "https://api.restful-api.dev/";

async function getCollection() {
    try {
        const response = await fetch(BASE_URL + "collections/products/objects", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": API_KEY,
            }
        });
        const result = await response.json();
        render(result);
        return result;
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while fetching products.");
    }
}
getCollection();

async function addcollection(data) {
    try {
        const response = await fetch(BASE_URL + "collections/products/objects", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": API_KEY,
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while adding the product.");
    }
}
async function updatefunction(id, data) {
    try {
        const response = await fetch(BASE_URL + "collections/products/objects/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": API_KEY,
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while updating the product.");
    }
}

let editId = null;

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const newData = {
        name: productName.value,
        data: {
            year: Year.value,
            price: Price.value,
            "CPU model": cpu.value,
            "Hard disk size": disk.value
        }
    };
    if (editId) {
        const result = await updatefunction(editId, newData);
        editId = null;
        addBtn.textContent = "Add";
        if (result) {
            await getCollection();
        }
    } else {
        const result = await addcollection(newData);
        if (result) {
            await getCollection();
        }
    }
});

render = (data) => {
    list.replaceChildren();

    data.forEach((item) => {
        const p = document.createElement('p');
        const li = document.createElement('li');
        li.className = "card";
        const cpuLi = document.createElement('li');
        const diskLi = document.createElement('li');
        const price = document.createElement('li');
        const year = document.createElement('p');
        const editBtn = document.createElement('button');
        const deleteBtn = document.createElement('button');
        editBtn.type = "button";
        editBtn.textContent = "Edit";
        editBtn.className = "edit_btn";
        editBtn.dataset.id = item.id;
        deleteBtn.type = "button";
        deleteBtn.textContent = "Delete";
        deleteBtn.dataset.id = item.id;
        p.textContent = item.name;
        cpuLi.textContent = item.data["CPU model"];
        diskLi.textContent = item.data["Hard disk size"];
        price.textContent = item.data.price;
        year.textContent = item.data.year;

        editBtn.addEventListener('click', (e) => {
            editId = e.target.dataset.id;
            productName.value = item.name;
            Price.value = item.data.price;
            Year.value = item.data.year;
            cpu.value = item.data["CPU model"];
            disk.value = item.data["Hard disk size"];
            addBtn.textContent = "Save";
        });

        deleteBtn.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            deletefunction(id);
        });

        li.append(p, cpuLi, diskLi, price, year, editBtn, deleteBtn);
        list.appendChild(li);
    })
}
async function deletefunction(id) {

    try {
        const response = await fetch(BASE_URL + "collections/products/objects/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": API_KEY,
            }
        });
        const result = await response.json();
        getCollection();
        return result;

    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while deleting the product.");
    };
}
