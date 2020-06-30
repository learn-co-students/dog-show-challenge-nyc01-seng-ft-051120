document.addEventListener('DOMContentLoaded', () => {

const tableBody = document.getElementById("table-body")
const form = document.getElementById("dog-form")

    function renderDog(dog){
        const oneDogRow = document.createElement("tr")
        oneDogRow.dataset.id = dog.id
        oneDogRow.innerHTML = 
        `<td>${dog.name}</td> 
        <td>${dog.breed}</td> 
        <td>${dog.sex}</td> 
        <td><button class="edit">Edit</button></td>`
        tableBody.append(oneDogRow)
    }

    function renderDogs(dogs){
        dogs.forEach(dog => {renderDog(dog)})
    }

    function fetchDogs(url){
        fetch(url)
        .then(resp => resp.json())
        .then(dogObjects => renderDogs(dogObjects))
        .catch(error => {console.log(error)})
    }
    fetchDogs("http://localhost:3000/dogs")



    document.addEventListener("click", function(e){

        if(e.target.className === "edit"){
            const editButton = e.target
            const thatRow = editButton.parentNode.parentNode
            const thatDogId = thatRow.dataset.id
            
            form.dataset.id = thatRow.dataset.id
            form.name.value = thatRow.children[0].textContent
            form.breed.value = thatRow.children[1].textContent
            form.sex.value = thatRow.children[2].textContent
        }

    })


    function patchDog(url, dogWithChanges){
        fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            },
            body: JSON.stringify(dogWithChanges)
        })
        .then(resp => resp.json())
        .then(data => {
            tableBody.innerHTML = ""
            fetchDogs("http://localhost:3000/dogs")
        })
        .catch(error => {console.log(error)})
    }

    form.addEventListener("submit", function(e){
        e.preventDefault()

        if (form.dataset.id === undefined){
            alert('Choose a dog to edit')
        }
        else {
        const updatedDog = {
            name: e.target.name.value,
            breed: e.target.breed.value,
            sex: e.target.sex.value
        }
        thatDogId = form.dataset.id
        patchDog(`http://localhost:3000/dogs/${thatDogId}`, updatedDog)
        form.removeAttribute('data-id')
        form.reset() 
        }
})

})