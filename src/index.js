document.addEventListener('DOMContentLoaded', () => {

    getDogs("http://localhost:3000/dogs")

})

function getDogs(url) {
// fetches all dogs from db
// stored as a collection, so two then() chain functions (collection to each dog)

    fetch(url)
        .then(response => response.json())
        .then(allDogs => {
            allDogs.forEach(function(dog) {
            renderDogs(dog)
        }) 
    })
}

function renderDogs() {
// turns response data into what is shown on browser
// renders data by appending dogDiv into dogContainer

    const dogContainer = document.querySelector('margin')
    const dogTr = document.createElement('tr')

    dogTr.innerHTML = `
                        <tr><td>Dog ${dog.name}</td>
                        <td>*Dog ${breed}</td>
                        <td>*Dog Sex*</td>
                        <td><button>Edit</button></td></tr>`
                      `
    dogContainer.append(dogTr)
}


// 
// 
// 

