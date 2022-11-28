let jsons = localStorage.getItem('catID');
let url = `https://japceibal.github.io/emercado-api/cats_products/${jsons}.json`;
const ORDER_ASC_BY_PRECIO = "costUP"
const ORDER_DESC_BY_PRECIO = "costDown"
const ORDER_BY_RELEVANCY = "Price"
let miniumPrice = undefined;
let maxiumPrice = undefined;

document.addEventListener('DOMContentLoaded', async () => {
    let promise = await fetch(url);
    let datos = await promise.json()
    productsList = datos.products
    let allCats = datos.catName
    showList(datos.products)
    document.getElementById('showCat').innerHTML = allCats
})

document.getElementById("sortAsc").addEventListener("click", function () {
    sortAndShowProducts("costUP", productsList);
});

document.getElementById("sortDesc").addEventListener("click", function () {
    sortAndShowProducts("costDown", productsList);
});

document.getElementById("sortByCount").addEventListener("click", function () {
    sortAndShowProducts("Price", productsList);
});
document.getElementById("clearFilter").addEventListener("click", function () {
    document.getElementById("filterPriceMinium").value = "";
    document.getElementById("filterPriceMaxium").value = "";

    miniumPrice = undefined;
    maxiumPrice = undefined;

    showList();
});

document.getElementById("filterPrice").addEventListener("click", function () {
    miniumPrice = document.getElementById("filterPriceMinium").value;
    maxiumPrice = document.getElementById("filterPriceMaxium").value;

    if ((miniumPrice != undefined) && (miniumPrice != "") && (parseInt(miniumPrice)) >= 0) {
        miniumPrice = parseInt(miniumPrice);
    }
    else {
        miniumPrice = undefined;
    }

    if ((maxiumPrice != undefined) && (maxiumPrice != "") && (parseInt(maxiumPrice)) >= 0) {
        maxiumPrice = parseInt(maxiumPrice);
    }
    else {
        maxiumPrice = undefined;
    }

    showList();
});
function showList() {
    let toAppened = []
    for (let product of productsList) {
        const productsContainer = document.getElementById('products-container')
        if (((miniumPrice == undefined) || ((miniumPrice != undefined) && (product.cost >= miniumPrice))) &&
            ((maxiumPrice == undefined) || ((maxiumPrice != undefined) && (product.cost <= maxiumPrice)))) {
            toAppened += `
        <div onclick="idProducts(${product.id})" class="products list-group-item list-group-item-action cursor-active">
        <div class="row-3 d-flex">
            <div class="col-3">
                <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">${product.name} - ${product.currency} ${product.cost}</h4>
                    <small class="text-muted">${product.soldCount} vendidos</small>
                </div>
                <p class="mb-1">${product.description}</p>
            </div>
        </div>
    </div>
    `
        }
        productsContainer.innerHTML = toAppened
    }
}

function sortAndShowProducts(criteria, elements) {

    const order = {
        "costUP": () => elements.sort(function (a, b) { return a.cost - b.cost }),
        "costDown": () => elements.sort(function (a, b) { return b.cost - a.cost }),
        "Price": () => elements.sort(function (a, b) { return b.soldCount - a.soldCount }),
    }
    productsList = order[criteria]();
    showList();
}

function idProducts(id) {
    localStorage.setItem('items', id)
    window.location.href = "product-info.html"
}
document.getElementById('busca').addEventListener('input', (e) => {
    let search = e.target.value.split(' ');
    const listaElementos = document.querySelectorAll('.products');

    listaElementos.forEach((elements) => {
        text = elements.innerText;
        if (Object.keys(search).length > 1) {
            for (let i = 0; i < Object.keys(search).length; i++) {
                if ((text.toLowerCase().includes(search[i].toLowerCase())) &&
                    (search[i] != "")) {
                    elements.style.display = '';
                    break;
                } else {
                    elements.style.display = 'none';
                    break;
                }
            };
        } else {
            if (text.toLowerCase().includes(search[0].toLowerCase())) {
                elements.style.display = ''
            } else {
                elements.style.display = 'none'
            };
        };
    })
})