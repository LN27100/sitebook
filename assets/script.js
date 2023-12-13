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
        resultElement.textContent = JSON.stringify(data, null, 2);
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