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

function renderDogs(dog) {
// turns response data into what is shown on browser
// renders data by appending dogDiv into dogContainer

    const dogContainer = document.querySelector('margin')
    const dogTr = document.createElement('tr')

    dogTr.innerHTML = `
                        <tr><td>Dog ${dog.name}</td>
                        <td>*Dog ${dog.breed}</td>
                        <td>*Dog ${dog.sex}</td>
                        <td><button>Edit</button></td></tr>
                      `
    dogContainer.append(dogTr)
}

function updateDog(url, dog) {
// allows user to make updates to an existing dog's name, breed, and sex
// also creates a submit button that 

    const submitButton = document.querySelector('form')[3]

    submitButton.addEventListener("submit", function(e) {
        e.preventDefault
        if (e.target.textContent === "Submit")
            fetch("http://localhost:3000/dogs/:id"), {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    "name": `${dog.name}`,
                    "breed": `${dog.breed}`,
                    "sex": `${dog.sex}`
                })
            }
                .then(response => response.json())
                .then(updatedDog => render(updatedDog))

        const patchedDog = {
            name: e.target.getElementByTagName('form')[0],
            breed: e.target.getElementByTagName('form')[1],
            sex: e.target.getElementByTagName('form')[1],
        }

        updateDog("http://localhost:3000/dogs/:id", patchedDog)      
        form.reset()  
    })

}