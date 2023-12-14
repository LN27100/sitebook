// CONSTANTES
const resultElement = document.getElementById('products');
const cartItemsList = document.getElementById('cart');
const cartTotalItems = document.getElementById('cartTotalItems');
const containerForDetails = document.getElementById('containerForDetails');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const detailsParam = urlParams.get('voirPlus');
const resultElementFiltered = document.getElementById('productsFiltered');


// FONCTION AFFICHAGE DES DONNEES JSON TOUTE LA COLLECTION
function getProduct() {
    return fetch('../assets/data.json')
        .then(response => response.json())
        .then(data => {
            updatePageWithData(data);
            return data;
        });
}

// Fonction pour mettre à jour la page avec les données
function updatePageWithData(data) {
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
                <p class="card-autor">Auteur: ${product.Auteur}</p>

                <p class="card-stock">Stock : ${product.Stock} unité(s)</p>
                <p class="card-price">${product.Prix}€</p>
                <a href="description.html?voirPlus=${encodeURIComponent(JSON.stringify(product))}" class="btn btn-light" id="voirPlus" target="_blank">Voir plus</a>
                <button data-img="${product.Image}" data-title="${product.Titre}" data-price="${product.Prix}" data-btn="addCart" class="btn btn-light">Ajouter au panier</button>
            `;

            card.appendChild(cardBody);
            resultElement.appendChild(card);
        });
    } else {
        console.error('Élément non trouvé');
    }
}
// Fonction pour filtrer les produits par catégorie
function filterProductsByCategory(categoryId) {
    return fetch('../assets/data.json')
        .then(response => response.json())
        .then(data => {
            const filteredProducts = data.filter(product => product.categoryId === categoryId);
            updatePageWithData(filteredProducts);
        })
        .catch(error => {
            console.error('Erreur lors du filtrage des produits :', error);
        });
}

// Écouteur d'événement pour les liens de catégorie
document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function(event) {
        event.preventDefault();
        const categoryId = parseInt(event.target.dataset.categoryId);
        filterProductsByCategory(categoryId);
    });
});


// Fonction récupération d'URL pour afficher les détails du produit dans une card
function showProductDetailsInCard(productDetails) {
    const card = document.createElement('div');
    card.className = 'card';
    card.style = 'display: flex; width: 80%; margin: 20px auto 0 auto; background-color: rgba(0, 0, 0, 0.5); color: white; box-shadow: 0px 5px 9px rgba(0, 0, 0, 0.6);';

    const cardImage = document.createElement('div');
    cardImage.className = 'card-image';
    cardImage.style = 'padding: 10px;';

    const image = document.createElement('img');
    image.src = `../assets/Pictures/${productDetails.Image}.jpg`;
    image.className = 'mx-auto d-block';
    image.alt = 'Product Image';

    cardImage.appendChild(image);

    const cardDescription = document.createElement('div');
    cardDescription.className = 'card-description';
    cardDescription.style = 'padding: 10px;';

    const title = document.createElement('h5');
    title.className = 'card-title';
    title.innerText = productDetails.Titre;

    const reference = document.createElement('p');
    reference.className = 'card-ref';
    reference.innerText = `Référence: ${productDetails.Référence}`;

    const description = document.createElement('p');
    description.className = 'card-description';
    description.innerText = `Description: ${productDetails.description}`;

    const author = document.createElement('p');
    author.className = 'card-autor';
    author.innerText = `Auteur: ${productDetails.Auteur}`;

    const stock = document.createElement('p');
    stock.className = 'card-stock';
    stock.innerText = `Stock : ${productDetails.Stock} unité(s)`;

    const price = document.createElement('p');
    price.className = 'card-price';
    price.innerText = `${productDetails.Prix}€`;

    cardDescription.appendChild(title);
    cardDescription.appendChild(reference);
    cardDescription.appendChild(description);
    cardDescription.appendChild(author);
    cardDescription.appendChild(stock);
    cardDescription.appendChild(price);

    card.appendChild(cardImage);
    card.appendChild(cardDescription);

    containerForDetails.appendChild(card);
}

// Appeler la fonction pour récupérer les produits et mettre à jour la page
getProduct()
    .then(data => {
        console.log('Données récupérées avec succès :', data);

        if (detailsParam) {
            const productDetails = JSON.parse(decodeURIComponent(detailsParam));
            console.log('Détails du produit :', productDetails);

            showProductDetailsInCard(productDetails);
        } else {
            console.error('Aucun paramètre "voirPlus" trouvé dans l\'URL.');
        }
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
});

// AJOUTER OU RETIRER UN LIVRE DU PANIER
let cartItems = {};

function addToCart(Image, Titre, Prix) {
    if (cartItems[Titre]) {
        cartItems[Titre].quantity++;
    } else {
        cartItems[Titre] = { titre: Titre, prix: Prix, quantity: 1, image: Image };
    }
    updateCartDisplay();
}

function updateCartDisplay() {
    cartItemsList.innerHTML = '';
    let total = 0;
    let totalItems = 0;

    for (const itemKey in cartItems) {
        const item = cartItems[itemKey];
        const listItem = document.createElement('div');

        const itemTotal = item.prix * item.quantity;
        total += itemTotal;
        totalItems += item.quantity;

        listItem.innerHTML =
            `
            <div class="product border border- d-flex mt-3" data-id="1">
                <img class="img" src="./assets/Pictures/${item.image}.jpg" alt="Product Image">
                <div class=" col-2 my-auto mx-auto">
                    <p class="text-light">${item.titre}</p>
                </div>
                <div class="col-2 my-auto mx-auto ">
                    <p class="text-light">${item.prix} €</p>
                </div>
                <div class="col-3 my-auto mx-auto">
                    <input class="quantity-input col-5 text-dark" type="number" value="${item.quantity}" min="1">
                    <p class="text-light">Total article: ${itemTotal.toFixed(2)}</p>
                    <span class="btn remove-btn bg-light" onclick="removeProduct('${itemKey}')">Supprimer</span>
                </div>
            </div>
            `;
        cartItemsList.appendChild(listItem);
    }

    const cartTotalElement = document.createElement('p');
    cartTotalElement.classList.add('text-light');
    cartTotalElement.textContent = `Total panier: ${total.toFixed(2)}`;
    cartItemsList.appendChild(cartTotalElement);

    cartTotalItems.textContent = `Total articles dans le panier : ${totalItems}`;
}

// Fonction pour mettre à jour la quantité dans le panier
document.addEventListener('input', function (e) {
    if (e.target.classList.contains('quantity-input')) {
        const newQuantity = parseInt(e.target.value);
        const parentProduct = e.target.closest('.product');
        const productTitle = parentProduct.querySelector('.text-light').textContent;

        if (cartItems[productTitle]) {
            cartItems[productTitle].quantity = newQuantity;
            updateCartDisplay();
        }
    }
});


function removeProduct(titre) {
    const product = cartItems[titre];

    if (product && product.quantity > 1) {
        // Si la quantité est supérieure à 1, décrémentez la quantité
        product.quantity--;
    } else {
        // Sinon, supprimez complètement le produit du panier
        delete cartItems[titre];
    }

    updateCartDisplay();
}


