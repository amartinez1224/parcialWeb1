let cart = 0
fetch('https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json')
    .then(response => response.json())
    .then(data => {
        list = ["Burgers", "Salads", "Tacos", "Desserts", "Drinks and Sides"]
        for (let i = 0; i < list.length; i++) {
            document.getElementById(list[i]).addEventListener("click", modificar(list[i], data[i]))
        }
    });


function modificar(nombre, productos) {
    let tituloDiv = document.getElementById("titulo")
    tituloDiv.textContent = nombre
    let productosDiv = document.getElementById("productos")
    productosDiv.textContent = ''
    for (var p in productos["products"]) {
        addProduct(p["name"], p["image"], p["description"], p["price"], productosDiv)
    }

    console.log(nombre)
}

function addProduct(nombre, image, desc, price, parent) {
    let colDiv = document.createElement("div")
    colDiv.className = "col"
    let cardDiv = document.createElement("div")
    cardDiv.className = "card"
    let imgDiv = document.createElement("img")
    imgDiv.setAttribute("src", image);
    imgDiv.className = "card-img-top"
    let bodyDiv = document.createElement("div")
    bodyDiv.className = "card-body"
    let h5Div = document.createElement("h5")
    h5Div.className = "card-title"
    h5Div.textContent = nombre
    let pDiv = document.createElement("p")
    pDiv.textContent = desc
    pDiv.className = "card-text"
    let aDiv = document.createElement("a")
    aDiv.className = "btn btn-primary"
    aDiv.textContent = price

    parent.appendChild(colDiv)
    colDiv.appendChild(cardDiv)
    cardDiv.appendChild(imgDiv)
    cardDiv.appendChild(bodyDiv)
    bodyDiv.appendChild(h5Div)
    bodyDiv.appendChild(pDiv)
    bodyDiv.appendChild(aDiv)
}