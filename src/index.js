document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('table-body')
    const form = document.getElementById('dog-form')

const getDogs = function(){
    fetch('http://localhost:3000/dogs')
    .then(resp => resp.json())
    .then(dogs => {dogs.forEach(function(dog){
            const dogList = createDog(dog)
            renderDog(dogList)
        })
    }) 
}

function renderDog(dogList){
    table.append(dogList)
}

function createDog(dog){
    let row = document.createElement('tr')
    row.id = `row ${dog.id}`

    row.innerHTML += `
    <td>${dog.name}</td>
    <td>${dog.breed}</td>
    <td>${dog.sex}</td>
    <td><button class='edit-button' id=${dog.id}>Edit</button></td>
    `    
    return row
}

function editForm(){
    document.addEventListener('click', function(e){
        if (e.target.matches('.edit-button')){
            const button = e.target
            const currentDog = button.id
            const sex = button.parentNode.previousSibling.previousElementSibling
            const breed = sex.previousElementSibling
            const name = breed.previousElementSibling
            form.innerHTML = `
            <input id=${currentDog} type="text" name="name" placeholder="dog's name" value=${name.innerText} />
            <input type="text" name="breed" placeholder="dogs's breed" value=${breed.innerText} />
            <input type="text" name="sex" placeholder="dog's sex" value=${sex.innerText} />
            <input type="submit" id='submit' value="Submit" />
            `
        }
    })
} 

function editDogs(){
    form.addEventListener('submit', function(e){ 
        e.preventDefault()
        let submitBtn = e.target
        let dogId = submitBtn.firstChild.nextElementSibling.id
        let dogRow = document.getElementById(`row ${dogId}`)

        const dogObj = { 
            name: form.name.value,
            breed: form.breed.value,
            sex: form.sex.value
        }
      
        fetch(`http://localhost:3000/dogs/${dogId}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(dogObj)
    })
    
    dogRow.childNodes[1].textContent = dogObj.name
    dogRow.childNodes[3].innerText = dogObj.breed
    dogRow.childNodes[5].innerText = dogObj.sex

 
    })    
 
}

    getDogs()
    editForm()
    editDogs()
})







// document.addEventListener('DOMContentLoaded', () => {
//     const table = document.getElementById('table-body')
//     const form = document.getElementById('dog-form')
 
   

// function getDogs(){
//     fetch('http://localhost:3000/dogs')
//     .then(resp => resp.json())
//     .then(dogs => {dogs.forEach(function(dog){
//         render(dog) })
//     })
    
// }

// function render(dog){
//     const row = document.createElement('tr')

//     row.innerHTML += `
//     <td>${dog.name}</td>
//     <td>${dog.breed}</td>
//     <td>${dog.sex}</td>
//     <td><button class='edit-button' id=${dog.id}>Edit</button></td>
//     `
    
//     table.appendChild(row)

//     const edit = document.getElementById(`${dog.id}`)

//         edit.addEventListener('click', function(e){
//             if (e.target.id === edit.id){
//                 e.preventDefault()
//         form.innerHTML = `
//             <input type="text" name="name" placeholder=${dog.name} value=${dog.name} />
//             <input type="text" name="breed" placeholder=${dog.breed} value=${dog.breed} />
//             <input type="text" name="sex" placeholder=${dog.sex} value=${dog.sex} />
//             <input type="submit" id='submit' value="Submit" />
//         `
//             }
 
        
        
//     })
// }

// function editDogs(){
//     form.addEventListener('submit', function(e){
//         e.preventDefault()
//         fetch(`http://localhost:3000/dogs/${e.target.id}`,{
//         method: "PATCH",
//         headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json"
//         },
//         body: JSON.stringify({
//             name: form.name.value,
//             breed: form.breed.value,
//             sex: form.sex.value
//         })
//         .then(resp => resp.json())
//         .then(newDog => render(newDog))
//     })
   


//     })    
//    }


//     getDogs()
//     editDogs()
// })