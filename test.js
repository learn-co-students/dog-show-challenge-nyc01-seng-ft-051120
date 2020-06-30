// const localHost = "http://localhost:3000/dogs"

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
// 

}
