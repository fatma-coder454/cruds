let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = 'create';
let tmp;

// get total
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = "#040";
    } else {
        total.innerHTML = '';
        total.style.background = "#a00d02";
    }
}

// create product 
let dataPro = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];

submit.onclick = function () {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    };

    if (newPro.title != '' && newPro.price != '' && newPro.category != '' && newPro.count < 100) {
        if (mood === 'create') {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro);
                }
            } else {
                dataPro.push(newPro);
            }
        } else {
            dataPro[tmp] = newPro;
            mood = 'create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
        }

        localStorage.setItem('products', JSON.stringify(dataPro));
        clearInputs();
        showData();
    } else {
        alert("Please enter valid data");
    }
}

// clear inputs
function clearInputs() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// read data
function showData() {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})">Update</button></td>
                <td><button onclick="deleteData(${i})">Delete</button></td>
            </tr>`;
    }
    document.getElementById('tbody').innerHTML = table;

    let deleteAllBtn = '';
    if (dataPro.length > 0) {
        deleteAllBtn = `<button onclick="deleteAll()">Delete All (${dataPro.length})</button>`;
    }
    document.getElementById('deleteAllContainer').innerHTML = deleteAllBtn;
}

// delete one product
function deleteData(i) {
    dataPro.splice(i, 1);
    localStorage.setItem('products', JSON.stringify(dataPro));
    showData();
}

// delete all
function deleteAll() {
    localStorage.clear();
    dataPro = [];
    showData();
}

// update product
function updateData(i) {
    let pro = dataPro[i];
    title.value = pro.title;
    price.value = pro.price;
    taxes.value = pro.taxes;
    ads.value = pro.ads;
    discount.value = pro.discount;
    getTotal();
    count.style.display = 'none';
    category.value = pro.category;
    submit.innerHTML = 'Update';
    mood = 'update';
    tmp = i;
    scroll({ top: 0, behavior: 'smooth' });
}

// search
let searchMode = 'title';

function setSearchMode(id) {
    let search = document.getElementById('search');
    if (id === 'searchTitle') {
        searchMode = 'title';
    } else {
        searchMode = 'category';
    }
    search.placeholder = 'Search by ' + searchMode;
    search.focus();
    search.value = '';
    showData();
}

function searchData(value) {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        if (
            (searchMode === 'title' && dataPro[i].title.includes(value.toLowerCase())) ||
            (searchMode === 'category' && dataPro[i].category.includes(value.toLowerCase()))
        ) {
            table += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})">Update</button></td>
                <td><button onclick="deleteData(${i})">Delete</button></td>
            </tr>`;
        }
    }
    document.getElementById('tbody').innerHTML = table;
}

// initial call
showData();
