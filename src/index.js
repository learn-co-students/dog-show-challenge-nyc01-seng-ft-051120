document.addEventListener('DOMContentLoaded', () => {
    const baseUrl = 'http://localhost:3000/dogs'
    const tableBody = document.querySelector("#table-body")
    const dogForm = document.querySelector("#dog-form")
    const fetchDogs = () => {
        fetch(baseUrl)
        .then(r => r.json())
        .then(dogs => renderDogs(dogs))
    }
    
   



    
    
    
    
    
    
    
    
    
    const renderDogs = (dogs) => {
        dogs.forEach(dog => {
            let tableRow = document.createElement("tr")
            tableRow.dataset.id = `${dog.id}`
            tableRow.innerHTML = `<td name="name">${dog.name}</td> <td name="breed">${dog.breed}</td> <td name="sex">${dog.sex}</td> <td><button id=${dog.id}>Edit</button></td>`
            tableBody.append(tableRow)
        })

    }


        document.addEventListener("click", e => {
            if (e.target.textContent === "Edit"){
                let dog = e.target
                let dogId = e.target.id
                
             
                let tRow = dog.closest("tr")
           
                
                let name = tRow.children.name.innerText
                let breed = tRow.children.breed.innerText
                let sex = tRow.children.sex.innerText
    
                dogForm.name.value = name
                dogForm.breed.value = breed
                dogForm.sex.value = sex
   
                document.addEventListener("submit", e => {
                    e.preventDefault()
                    let newName = dogForm.name.value
                    let newBreed = dogForm.breed.value
                    let newSex = dogForm.sex.value

                    
                    fetch(baseUrl+`/${dogId}`, {
                        method: 'PATCH',
                        headers: {"content-type": "application/json"},
                        body: JSON.stringify({
                            name: newName,
                            breed: newBreed,
                            sex: newSex
                        })
                    })
                    .then(r => r.json())
                    .then(dog => {
                        let updatedDog = document.querySelector(`tr[data-id="${dog.id}"]`)
                        updatedDog.children[0].innerText = dog.name
                        updatedDog.children[1].innerText = dog.breed
                        updatedDog.children[2].innerText = dog.sex
                    })
                   
                   
                })   
                            
            }
         
        fetchDogs()
        })


 
fetchDogs()
})