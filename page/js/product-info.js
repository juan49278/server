let ids = localStorage.getItem('items')
let URL = `https://japceibal.github.io/emercado-api/products/${ids}.json`
let comentariosURL = `https://japceibal.github.io/emercado-api/products_comments/${ids}.json`
let addCart = {};

document.addEventListener('DOMContentLoaded', () => {
    let result= {}
    getJSONData(URL)
    .then((response) =>{
        if(response.status == 'ok'){
            result = response
            return result
            
        }})
    .then((result) => {
            const {data: elements} = result;
            const { id, category, cost, 
                    currency, description, 
                    images, name, relatedProducts, soldCount} = elements
                    addCart = {id: id, name: name, unitCost:cost, currency, image: images[0]}
            document.getElementById('nameProduct').innerHTML = name
            document.getElementById('contentProduct').innerHTML = `
            <h5><strong>Precio</strong></h5>
            <p id="currency">${currency} ${cost}</p>
            <h5><strong>Descripción</strong></h5>
            <p id="description">${description}</p>
            <h5><strong>Categoría</strong></h5>
            <p>${category}</p>
            <h5><strong>Cantidad de vendidos</strong></h5>
            <p>${soldCount} vendidos</p>
            <h5 class="pb-1"><strong>Imágenes ilustrativas</strong></h5>
            <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
            Mostrar Imagenes del producto
            </button>
            <div class="collapse col-lg-7 mx-auto" id="collapseExample">
        <div class="card card-body">
        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="${images[0]}" class="d-flex img-fluid" alt="..." id="image">
          </div>
          <div class="carousel-item">
            <img src="${images[1]}" class="d-flex img-fluid" alt="...">
          </div>
          <div class="carousel-item">
            <img src="${images[2]}" class="d-flex img-fluid" alt="...">
          </div>
          <div class="carousel-item">
            <img src="${images[3]}" class="d-flex img-fluid" alt="...">
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div> 
        </div>
    </div>
            `
            for(let relatedP of relatedProducts){
                const {id, name,image} = relatedP
                productoRelacionado.innerHTML += `<div onclick="idProducts(${id})" 
                class="card m-3 list-group-item list-group-item-action cursor-active mx-auto" style="width:35%">
                <img src="${image}" class="card-img-top" alt="....">
                <p class="card-text">${name}</p>
                </div>`
            }
        })
    
    getJSONData(comentariosURL)
        .then((response) => {
            if(response.status == 'ok'){
                result = response
                return result;
                }})
        .then((result) => {
            const {data: comentarios} = result;
            for(producto of comentarios){
                const {dateTime, description,user} = producto
                mostrarComentarios(user, dateTime, description);
            }

            document.querySelectorAll('.qualified').forEach((producto, index) => {
                for(let i = 0; i < comentarios[index].score; i++){
                    producto.children[i].classList.add('checked')
                }
            })    
        })
    })
        function mostrarComentarios(user, dateTime, description){
            document.getElementById('listComment').innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 justify-content-between">
                    <div class="text-start">
                        <span class="fw-bold">${user}</span> - ${dateTime} -
                        <span class = 'qualified'> 
                            <span class="fa fa-star"></span>
                            <span class="fa fa-star"></span>
                            <span class="fa fa-star"></span>
                            <span class="fa fa-star"></span>
                            <span class="fa fa-star"></span>
                        </span>
                    </div>
                    <p class='text-muted mb-0 pt-1 text-start'>${description}</p>
                </div>   
            </li>
            `
        }

        document.getElementById("comentar").addEventListener('click', () => {
            let user = localStorage.getItem('email')
            let date = new Date();
            let timeFormat = date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds();
            let dateFormat = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
            let dateTime = dateFormat+" "+timeFormat;	
            const descripcion = document.getElementById('descripcion').value;
            const puntuacion = document.getElementById('puntuacion').value;
            document.getElementById('lastComment').innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 justify-content-between">
                    <div class="text-start">
                        <span class="fw-bold">${user}</span> - ${dateTime} -
                        <span class = 'qualifiedID ${ids}' id='qualified'> 
                            <span class="fa fa-star"></span>
                            <span class="fa fa-star"></span>
                            <span class="fa fa-star"></span>
                            <span class="fa fa-star"></span>
                            <span class="fa fa-star"></span>
                        </span>
                    </div>
                    <p class='text-muted mb-0 pt-1 text-start'>${descripcion}</p>
                </div>   
            </li>
            `
            for(let i = 0; i < puntuacion; i ++){
                document.querySelectorAll('.qualifiedID')[document.querySelectorAll('.qualifiedID').length -1]
                .children[i].classList.add('checked');
            }
        })
        function idProducts(id){
            localStorage.setItem('items', id)
            window.location.href = "product-info.html"
        }
  function cartAdd(addCart) {
    let array = []
    if (localStorage.getItem('productoAdded') == null) {
        array.push(addCart);
        localStorage.setItem('productoAdded', JSON.stringify(addCart));
        mostrarAlert();
    } else {
        JSON.parse(localStorage.getItem('productoAdded')).forEach(e => {
            array.push(e)
        })
        if (array.find(item => item.id == addCart.id) == undefined) {
            array.push(addCart);
            localStorage.setItem('productoAdded', JSON.stringify(array));
            mostrarAlert();
        } else {
            existProduct();
        }
    }
}
const swal = require('sweetalert2')
function mostrarAlert(){
    Swal.fire({
        title: "Listo",
        text: "El articulo fue agregado correctamente",
        icon: "success",
      })
    }
    function existProduct(){
      Swal.fire({
        title: 'Info',
        text: 'El producto ya existe en el carrito de compras',
        icon: 'info',
      })
    }
