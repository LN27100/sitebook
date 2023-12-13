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
                <a href="#" class="btn btn-primary">Panier</a>
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

    // Fonction récupération des données d'URL pour afficher un livre et sa description 

    