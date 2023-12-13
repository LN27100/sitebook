// Fonction affichage des données Json toute la collection

function getProduct() {
    return fetch('../assets/data.json')
        .then(response => response.json())
        .then(data => {
            updatePageWithData(data);
            return data;
        });
}

function updatePageWithData(data) {
    const resultElement = document.getElementById('products');

    if (resultElement) {

        resultElement.innerHTML = '';


        data.forEach(product => {

            const card = document.createElement('div');
            card.className = 'card';
            card.style = 'width: 18rem;';


            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';


            cardBody.innerHTML = `
                <img src="../assets/Pictures/${product.Image}.jpg" class="mx-auto d-block" alt="Product Image"></img>
                <h5 class="card-title">${product.Titre}</h5>
                <p class="card-ref">${product.Référence}</p>
                <p class="card-description">${product.description}</p>
                <p class="card-autor">Auteur: ${product.Auteur}</p>
                <p class="card-stock">Stock : ${product.Stock} unité(s)</p>
                <p class="card-price">${product.Prix}€</p>
                <button data-img="${product.Image}" data-title="${product.Titre}" data-price="${product.Prix}" data-btn = "addCart" class="btn btn-light" >Ajouter au panier</button>
            `;


            card.appendChild(cardBody);


            resultElement.appendChild(card);
        });
    } else {
        console.error('Élément non trouvé');
    }
}

getProduct()
    .then(data => {
        console.log('Données récupérées avec succès :', data);
    })
    .catch(error => {
        console.error('Une erreur s\'est produite :', error);
    });

document.addEventListener('click', function (e) {

    if (e.target.dataset.btn === "addCart") {
        let img = e.target.dataset.img
        let title = e.target.dataset.title
        let price = e.target.dataset.price
        addToCart(img, title, price)
    }


})


// AJOUTER OU RETIRER UN LIVRE DU PANIER
let cartItems = {}; // Stocke les éléments du panier //memoire 

// Fonction pour AJOUTER un LIVRE au panier
function addToCart(Image, Titre, Prix) {
    if (cartItems[Titre]) {
        // Si l'album est déjà dans le panier, augmenter la quantité
        cartItems[Titre].quantity++;
    } else {
        // Sinon, ajouter l'album avec une quantité de 1
        cartItems[Titre] = { titre: Titre, prix: Prix, quantity: 1, image: Image };
    }

    console.log(cartItems)
    // updateCartDisplay(); // Met à jour l'affichage du panier
}



// //  / Mise à jour du panier
function updateCartDisplay() {
    const cartItemsList = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    // Réinitialise la liste des éléments du panier et le total
    cart.innerHTML = '';
    let total = 0;

    // Parcoure les éléments du panier et les ajoutent à la liste
    for (const itemKey in cartItems) {
        const item = cartItems[itemKey];
        const listItem = document.createElement('div');

        `   <div class="product border border- d-flex mt-3" data-id="1">
            <img class="img " src="assets/Pictures/REF020picture.jpg" alt="Product Image">
         
            <div class=" col-2 my-auto mx-auto">
                <p class="text-light">${item.Titre}</p>
         
            </div>
            <div class="  col-2 my-auto mx-auto ">
                <p class="text-light">${item.Product}</p>
         
            </div>
            <div class="  col-3 my-auto mx-auto">
                <input class="quantity-input col-5 text-light" type="number" value="1" min="1">
                <span class="remove-btn text-light" onclick="removeProduct(2)">Supprimer</span>
         
            </div>
         
         
         
         </div>`


        // listItem.textContent = `${item.Titre} - Quantité: ${item.quantity} - €${item.Prix * item.quantity}; ${item.Titre} - Quantité: ${item.quantity} - €${item.Prix * item.quantity}`;
        // cartItemsList.appendChild(listItem);
        // total += item.Prix * item.quantity; // Ajoute le prix total pour cet album
    }

    // Met à jour le total affiché
    cartTotal.textContent = total.toFixed(2); // Fixe le total à 2 décimales
}



