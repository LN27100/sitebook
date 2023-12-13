// CONSTANTES

const cartItemsList = document.getElementById('cart');
const cartTotal = document.getElementById('cartTotal');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const detailsParam = urlParams.get('voirPlus');
const resultElement = document.getElementById('products');


// FONCTION AFFICHAGE DES DONNEES JSON TOUTE LA COLLECTION 

function getProduct() {
    return fetch('../assets/data.json')
        .then(response => response.json())
        .then(data => {
            // Appeler la fonction pour mettre à jour la page avec les données
            updatePageWithData(data);
            return data;
        });
}

// Fonction pour mettre à jour la page avec les données
function updatePageWithData(data) {

    if (resultElement) {
        resultElement.innerHTML = '';

        data.forEach(product => {
            // Créer une carte (card) pour chaque produit
            const card = document.createElement('div');
            card.className = 'card';
            card.style = 'width: 18rem;';

            // Créer le corps de la carte (card body)
            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';

            // Remplir le corps de la carte avec les détails du produit
            cardBody.innerHTML = `
                <img src="../assets/Pictures/${product.Image}.jpg" class="mx-auto d-block" alt="Product Image"></img>
                <h5 class="card-title">${product.Titre}</h5>
                <p class="card-ref">${product.Référence}</p>
                <p class="card-description">${product.description}</p>
                <p class="card-autor">Auteur: ${product.Auteur}</p>
                <p class="card-stock">Stock : ${product.Stock} unité(s)</p>
                <p class="card-price">${product.Prix}€</p>
                <a href="description.html?voirPlus=${encodeURIComponent(JSON.stringify(product))}" class="btn btn-light" id="voirPlus" target="_bank">Voir plus</a>
                <button data-img="${product.Image}" data-title="${product.Titre}" data-price="${product.Prix}" data-btn="addCart" class="btn btn-light" >Ajouter au panier</button>
            `;

            // Ajouter le corps de la carte à la carte
            card.appendChild(cardBody);
            // Ajouter la carte à l'élément résultat (products)
            resultElement.appendChild(card);
        });
    } else {
        console.error('Élément non trouvé');
    }
}

// Appeler la fonction pour récupérer les produits et mettre à jour la page
getProduct()
    .then(data => {
        console.log('Données récupérées avec succès :', data);

// FONCTION DE RECUPERATION DES DONNEES D'URL POUR AFFICHER UN SEUL LIVRE ET SA DESCRIPTION

        if (detailsParam) {
            // Décodage des données JSON
            const productDetails = JSON.parse(decodeURIComponent(detailsParam));

            // Créer un conteneur pour afficher les détails du produit
            const detailsContainer = document.createElement('div');
            detailsContainer.classList.add('index');

            // Créer des éléments HTML pour afficher les détails du produit
            const productTitre = document.createElement('h5');
            productTitre.textContent = productDetails.Titre;

            const productImage = document.createElement('img');
            productImage.src = `../assets/Pictures/${productDetails.Image}.jpg`;
            productImage.alt = 'Image du livre';

            const albumDetailsList = document.createElement('ul');
            const productReference = document.createElement('li');
            productReference.textContent = `Référence: ${productDetails.Référence}`;

            const productDescription = document.createElement('li');
            productDescription.textContent = `Description: ${productDetails.description}`;

            const productAuteur = document.createElement('li');
            productAuteur.textContent = `Auteur: ${productDetails.Auteur}`;

            const productPrice = document.createElement('li');
            productPrice.textContent = `Prix: ${productDetails.Prix}€`;

            // Ajouter les éléments à la liste des détails du produit
            albumDetailsList.appendChild(productPrice);
            albumDetailsList.appendChild(productAuteur);
            albumDetailsList.appendChild(productDescription);
            albumDetailsList.appendChild(productReference);

            // Ajouter les éléments au conteneur des détails
            detailsContainer.appendChild(productImage);
            detailsContainer.appendChild(productTitre);

            // Ajouter le conteneur des détails à la page HTML
            document.body.appendChild(detailsContainer);
        } else {
            // Gérer le cas où aucun paramètre 'voirPlus' n'est présent dans l'URL
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

    updateCartDisplay()
}



 //  Mise à jour du panier
function updateCartDisplay() {

    console.log('fonction')
    // PAR DEFAUT Réinitialise la liste des éléments du panier et le total
    cartItemsList.innerHTML = '';
    let total = 0;

    // Parcoure les éléments du panier et les ajoutent à la liste
    for (const itemKey in cartItems) {
        const item = cartItems[itemKey];
        const listItem = document.createElement('div');

        listItem.innerHTML = 
        `
            <div class="product border border- d-flex mt-3" data-id="1">
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
            </div>
         `
        cartItemsList.appendChild(listItem);


        // listItem.textContent = `${item.Titre} - Quantité: ${item.quantity} - €${item.Prix * item.quantity}; ${item.Titre} - Quantité: ${item.quantity} - €${item.Prix * item.quantity}`;
        // total += item.Prix * item.quantity; // Ajoute le prix total pour cet album
    }

    // Met à jour le total affiché
    cartTotal.textContent = total.toFixed(2); // Fixe le total à 2 décimales


}



