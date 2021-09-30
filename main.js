let cart = 0
let modal = new bootstrap.Modal(document.getElementById("exampleModal"), {})
fetch('https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json')
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < data.length; i++) {
            let boton = addElement(data[i]["name"])
            boton.addEventListener("click", () => {
                let tituloDiv = document.getElementById("titulo")
                tituloDiv.textContent = data[i]["name"]
                let productosDiv = document.getElementById("productos")
                productosDiv.textContent = ''
                productos = data[i]["products"]
                for (let j = 0; j < productos.length; j++) {
                    let colDiv = document.createElement("div")
                    colDiv.className = "col-2"
                    let cardDiv = document.createElement("div")
                    cardDiv.className = "card"
                    let imgDiv = document.createElement("img")
                    imgDiv.setAttribute("src", productos[j]["image"]);
                    imgDiv.className = "card-img-top"
                    let bodyDiv = document.createElement("div")
                    bodyDiv.className = "card-body"
                    let h5Div = document.createElement("h5")
                    h5Div.className = "card-title"
                    h5Div.textContent = productos[j]["name"]
                    let pDiv = document.createElement("p")
                    pDiv.textContent = productos[j]["description"]
                    pDiv.className = "card-text"
                    let sDiv = document.createElement("strong")
                    sDiv.textContent = productos[j]["price"]
                    let brDiv = document.createElement("br")
                    let aDiv = document.createElement("a")
                    aDiv.className = "btn btn-dark"
                    aDiv.textContent = "Add to cart"
                    if (!("quantity" in productos[j])) productos[j]["quantity"] = 0
                    aDiv.addEventListener('click', () => {
                        productos[j]["quantity"] += 1
                        cart += 1
                        document.getElementById("items").textContent = cart + " items"

                    })
                    console.log({
                        "p": productos[j]["name"],
                        "c": productos[j]["quantity"]
                    })
                    productosDiv.appendChild(colDiv)
                    colDiv.appendChild(cardDiv)
                    cardDiv.appendChild(imgDiv)
                    cardDiv.appendChild(bodyDiv)
                    bodyDiv.appendChild(h5Div)
                    bodyDiv.appendChild(pDiv)
                    pDiv.appendChild(brDiv)
                    pDiv.appendChild(sDiv)
                    bodyDiv.appendChild(aDiv)
                }
            })
        }

        let comprasDiv = document.getElementById("compras")
        let crearCarrito = () => {
            let productosDiv = document.getElementById("productos")
            productosDiv.textContent = ''
            productosDiv.innerHTML = '<table class="table table-striped">' +
                '  <thead>' +
                '    <tr>' +
                '      <th scope="col">Item</th>' +
                '      <th scope="col">Qty.</th>' +
                '      <th scope="col">Description</th>' +
                '      <th scope="col">Unit Price</th>' +
                '      <th scope="col">Amount</th>' +
                '      <th scope="col">Modify</th>' +
                '    </tr>' +
                '  </thead>' +
                '  <tbody id="tbody">' +
                '  </tbody>' +
                '</table>'
            let k = 1
            let total = 0
            let tabla = document.getElementById("tbody")
            for (let ii = 0; ii < data.length; ii++) {
                let productoss = data[ii]["products"]
                for (let jj = 0; jj < productoss.length; jj++) {
                    let quantity = productoss[jj]["quantity"]
                    if (quantity > 0) {
                        let subT = productoss[jj]["price"] * quantity
                        let row = '    <th scope="row">' +
                            k +
                            '    </th>' +
                            '    <td>' +
                            quantity +
                            '    </td>' +
                            '    <td>' +
                            productoss[jj]["name"] +
                            '    </td>' +
                            '    <td>' +
                            productoss[jj]["price"] +
                            '    </td>' +
                            '    <td>' +
                            Math.round(subT * 100) / 100 +
                            '    </td>' +
                            '    <td>' +
                            '    <button type="button" class="btn btn-dark" id="a">-</button>' +
                            '    <button type="button" class="btn btn-dark" id="b">+</button>' +
                            '    </td>'
                        text = document.createElement('tr')
                        text.innerHTML = row
                        tabla.appendChild(text)
                        k += 1
                        total += subT
                        let botonA = document.getElementById("a")
                        botonA.addEventListener('click', () => {
                            productoss[jj]["quantity"] -= 1
                            cart -= 1
                            document.getElementById("items").textContent = cart + " items"
                            crearCarrito()
                        })
                        botonA.removeAttribute("id")
                        let botonB = document.getElementById("b")
                        botonB.addEventListener('click', () => {
                            productoss[jj]["quantity"] += 1
                            cart += 1
                            document.getElementById("items").textContent = cart + " items"
                            crearCarrito()
                        })
                        botonB.removeAttribute("id")
                    }
                }
            }
            let row = '   <div class="col-sm">' +
                '<p>' +
                '<strong>Total $' + Math.round(total * 100) / 100 + '</strong>' +
                '</p>' +
                '</div>' +
                '<div class="col-sm">' +
                '<button type="button" class="btn btn-success total" id="a">Confirm order</button>' +
                '<button type="button" class="btn btn-danger total" id="b">Cancel</button>' +
                '</div>'

            let text1 = document.createElement('div')
            text1.className = "container-fluid"
            text = document.createElement('div')
            text.className = "row"
            text.innerHTML = row
            text1.appendChild(text)
            productosDiv.appendChild(text1)

            let botonA = document.getElementById("a")
            botonA.addEventListener('click', () => {
                printList = []
                k = 1
                for (let ii = 0; ii < data.length; ii++) {
                    productoss = data[ii]["products"]
                    for (let jj = 0; jj < productoss.length; jj++) {
                        let quantity = productoss[jj]["quantity"]
                        if (quantity > 0) {
                            printList.push({
                                "item": k,
                                "quantity": quantity,
                                "description": productoss[jj]["name"],
                                "unitPrice": productoss[jj]["price"]
                            })
                            k += 1
                        }
                    }
                }
                console.log(printList)
            })
            botonA.removeAttribute("id")
            let botonB = document.getElementById("b")
            botonB.addEventListener('click', () => {
                modal.show()
            })
            botonB.removeAttribute("id")

            let tituloDiv = document.getElementById("titulo")
            tituloDiv.textContent = 'Order detail'
        }
        comprasDiv.addEventListener('click', crearCarrito)

        let vaciar = document.getElementById("modalRefresh")
        vaciar.addEventListener('click', ()=>{
            for (let i = 0; i < data.length; i++){
                productos = data[i]["products"]
                for (let j = 0; j < productos.length; j++) {
                    productos[j]["quantity"] = 0
                }
            }
            cart = 0
            document.getElementById("items").textContent = cart + " items"
            crearCarrito()
            modal.hide()
        })


    });

function addElement(nombre) {
    let liDiv = document.createElement("li")
    liDiv.className = "nav-item"
    let aDiv = document.createElement("a")
    aDiv.className = "nav-link"
    aDiv.textContent = nombre
    let ulDiv = document.getElementById("navbarElemnts")
    liDiv.appendChild(aDiv)
    ulDiv.appendChild(liDiv)
    return aDiv
}