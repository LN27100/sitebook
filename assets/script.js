// Fonction affichage des données Json toute la collection
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
    const resultElement = document.getElementById('products');

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
                <a href="#" class="btn btn-light">Ajouter au panier</a>
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
 
        // Fonction récupération des données d'URL pour afficher un livre et sa description
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const detailsParam = urlParams.get('voirPlus');

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