import product from "./data.json"

function getProduct () {
fetch(product)
        .then(response => response.json())
        .then(data => {
            console.log(data)

            
            weatherInfo.innerHTML = '' // Vide le contenu existant
         })
        }


