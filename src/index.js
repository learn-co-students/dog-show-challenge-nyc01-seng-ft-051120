document.addEventListener('DOMContentLoaded', () => {

    const BASE_URL = `http://localhost:3000/dogs`
    const tableBody = document.getElementById("table-body")
    const dogForm = document.getElementById("dog-form")

    fetch(BASE_URL)
    .then(resp => resp.json())
    .then(dogs => dogs.forEach(getDog))


    function getDog(dog){
        tableBody.innerHTML += `<tr data-id=${dog.id}><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button id="edit-btn" data-id=${dog.id}>Edit</button></td></tr>`
    }
    

    // - On page load, render a list of already registered dogs in the table. You can fetch these dogs from http://localhost:3000/dogs.
    // - The dog should be put on the table as a table row. The HTML might look something like this `<tr><td>Dog *Name*</td> <td>*Dog Breed*</td> <td>*Dog Sex*</td> <td><button>Edit</button></td></tr>`
     
    document.addEventListener("click", e => {
    e.preventDefault()
    if(e.target.id === "edit-btn"){
        editDog(e.target.dataset.id)
    } else if(e.target.parentElement.id === "dog-form"){
        updateDog(e)
    }
    })

    function editDog(id){
        fetch(`${BASE_URL}/${id}`)
        .then(resp => resp.json())
        .then(dog => {
            dogForm.name.value = dog.name,
            dogForm.breed.value = dog.breed,
            dogForm.sex.value = dog.sex,
            dogForm.dataset.id = dog.id
        })
    }
    

    function updateDog(e){
        let dog = {
            name: e.target.parentElement.name.value,
            breed: e.target.parentElement.breed.value,
            sex: e.target.parentElement.sex.value
     
        }
    
  
     // - Make a dog editable. Clicking on the edit button next to a dog should populate the top form with that dog's current information.
    

     fetch(`${BASE_URL}/${e.target.parentElement.dataset.id}`, {
    
        method: 'PATCH',
        headers: {
            "content-type": 'application/json',
            accepts: 'application/json'
        },
        body: JSON.stringify(dog)
     })
      .then(response => response.json())
      .then(dog => {
        let chosenDog = document.querySelector(`tr[data-id="${dog.id}"]`)
        // console.log(chosenDog)
        chosenDog.children[0].innerText = dog.name
        chosenDog.children[1].innerText = dog.breed
        chosenDog.children[2].innerText = dog.sex


     })

    
    
    }


    // - On submit of the form, a PATCH request should be made to http://localhost:3000/dogs/:id to update the dog information (including name, breed and sex attributes).
    // - Once the form is submitted, the table should reflect the updated dog information. You could search for the table fields you need to edit and update each of them in turn
})