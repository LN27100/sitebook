// CONSTANTES
const resultElement = document.getElementById('products');
const cartItemsList = document.getElementById('cart');
const cartTotalItems = document.getElementById('cartTotalItems');
const containerForDetails = document.getElementById('containerForDetails');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const detailsParam = urlParams.get('voirPlus');



// FONCTION AFFICHAGE DES DONNEES JSON TOUTE LA COLLECTION
async function getProduct() {
    try {
        const response = await fetch('../assets/data.json');
        const data = await response.json();
        updatePageWithData(data);
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération des produits :', error);
    }
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
                <p class="card-note">Note: ${product.Note}/5<p>
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

async function getCategories() {
    try {
        const response = await fetch('../assets/categorie.json');
        const categories = await response.json();
        return categories;
    } catch (error) {
        console.error('Erreur lors de la récupération des catégories :', error);
        return [];
    }
}

// Fonction pour obtenir l'ID de catégorie à partir du nom de la catégorie
async function getCategoryId(categoryName) {
    try {
        const response = await fetch('../assets/categorie.json');
        const categories = await response.json();
        const category = categories.find(cat => cat.Catégorie === categoryName);
        return category ? category.id : null;
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'ID de catégorie :', error);
        return null;
    }
}

// Utilisation de la fonction pour obtenir l'ID de la catégorie souhaitée (par exemple, "Littérature")
getCategoryId("Littérature").then(categoryId => {
    console.log('ID de la catégorie "Littérature" récupéré avec succès :', categoryId);
    // Maintenant, utilisez cet ID pour filtrer les produits dans data.json
    if (categoryId !== null) {
        getProductByCategory(categoryId);
    } else {
        console.error('La catégorie spécifiée n\'a pas été trouvée.');
    }
}).catch(error => {
    console.error('Une erreur s\'est produite lors de la récupération de l\'ID de catégorie :', error);
});

// Fonction pour filtrer les produits par catégorie dans data.json et afficher les résultats dans la page
async function getProductByCategory(categoryId) {
    try {
        const response = await fetch('../assets/data.json');
        const products = await response.json();
        const filteredProducts = products.filter(product => {
            return product.Catégorie === categoryId;
        });

        return filteredProducts;
    } catch (error) {
        console.error('Erreur lors de la récupération des produits par catégorie :', error);
        return [];
    }
}

// Fonction pour mettre à jour la page avec les produits filtrés pour une catégorie spécifique
function updatePageWithFilteredProducts(products, categoryId) {
    const productsFilteredElement = document.getElementById(`productsFiltered${categoryId}`);
    if (productsFilteredElement) {
        productsFilteredElement.innerHTML = ''; // Nettoie le contenu existant de la div

        products.forEach(product => {
            // CARD pour chaque produit
            const card = document.createElement('div');
            card.className = 'card m-3';

            card.innerHTML = `
            <img src="../assets/Pictures/${product.Image}.jpg" class="card-img-top" alt="${product.Titre}">
                <div class="card-body">
                    <h5 class="card-title">${product.Titre}</h5>
                    <p class="card-text">Auteur: ${product.Auteur}</p>
                    <p class="card-text">Prix: ${product.Prix}€</p>
                    <a href="description.html?voirPlus=${encodeURIComponent(JSON.stringify(product))}" class="btn btn-outline-dark btn-center" target="_blank">Voir plus</a>
                </div>
            `;

            productsFilteredElement.appendChild(card);
        });
    } else {
        console.error(`Élément "productsFiltered${categoryId}" non trouvé.`);
    }
}

// Filtrer et afficher les produits pour chaque catégorie
Promise.all([
    getCategoryId("Littérature"),
    getCategoryId("Manga"),
    getCategoryId("Activités manuelles")
]).then(categoryIds => {
    categoryIds.forEach(categoryId => {
        if (categoryId !== null) {
            getProductByCategory(categoryId).then(products => {
                updatePageWithFilteredProducts(products, categoryId);
            });
        } else {
            console.error('La catégorie spécifiée n\'a pas été trouvée.');
        }
    });
}).catch(error => {
    console.error('Une erreur s\'est produite lors de la récupération des ID de catégorie :', error);
});


// FONCTION RECUPERATION D'URL POUR AFFICHER LES DETAILS DU PRODUIT DANS UNE CARD

function showProductDetailsInCard(productDetails) {
    const card = document.createElement('div');
    card.className = 'card';

    const cardImage = document.createElement('div');
    cardImage.className = 'card-image';

    const image = document.createElement('img');
    image.src = `../assets/Pictures/${productDetails.Image}.jpg`;
    image.className = 'mx-auto d-block';
    image.alt = 'Product Image';

    cardImage.appendChild(image);

    const cardDescription = document.createElement('div');
    cardDescription.className = 'card-description';

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

    const btnAdd = document.createElement('button');
    btnAdd.innerHTML = 'Ajouter au panier';
    btnAdd.className = 'btn btn-outline-dark btn-center'
    btnAdd.addEventListener('click', function () {
        addToCart(productDetails.Image, productDetails.Titre, productDetails.Prix);

    });


    cardDescription.appendChild(title);
    cardDescription.appendChild(reference);
    cardDescription.appendChild(description);
    cardDescription.appendChild(author);
    cardDescription.appendChild(stock);
    cardDescription.appendChild(price);
    cardDescription.appendChild(btnAdd)

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


//local storage
document.addEventListener('DOMContentLoaded', function () {
    // Charger les données du panier depuis localStorage
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
        cartItems = JSON.parse(storedCartItems);
        updateCartDisplay(); // Mettre à jour l'affichage avec les données chargées
    }

    // Ajouter le gestionnaire d'événements pour les clics sur les boutons "addCart"
    document.addEventListener('click', handleAddToCartClick);
});







document.addEventListener('click', function (e) {
    if (e.target.dataset.btn === "addCart") {




        let img = e.target.dataset.img
        let title = e.target.dataset.title
        let price = e.target.dataset.price
        addToCart(img, title, price)


    }
});








// Nouvelle fonction pour gérer le clic sur le bouton "addCart"
function handleAddToCartClick(e) {
    if (e.target.dataset.btn === "addCart") {
        let img = e.target.dataset.img;
        let title = e.target.dataset.title;
        let price = e.target.dataset.price;
        addToCart(img, title, price);
    }
}






// AJOUTER OU RETIRER UN LIVRE DU PANIER
let cartItems = {};


//fonction pour ajouter des articles dans le panier 
function addToCart(Image, Titre, Prix) {


    if (cartItems[Titre]) {
        // Si l'article est déjà dans le panier, incrémente seulement la quantité
        cartItems[Titre].quantity++;
    } else {
        // Si l'article n'est pas dans le panier, l'ajoute avec une quantité de 1
        cartItems[Titre] = { titre: Titre, prix: Prix, quantity: 1, image: Image };
    }


    // Mettre à jour le panier et sauvegarder dans localStorage
    updateCartDisplay();
    saveCartToLocalStorage();
}



function saveCartToLocalStorage() {
    // Sauvegarder les données du panier dans localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
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

    // Sauvegarder les données du panier dans localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
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



