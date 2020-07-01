document.addEventListener("DOMContentLoaded", () => {
getDogs()
editDog()
})


function getDogs(){
    fetch('http://localhost:3000/dogs')
    .then(resp => resp.json())
    .then(dogs => {dogs.forEach(function(dog){
        render(dog)
    })
})
}

function render(dog){
    const table = document.querySelector('#table-body')
    let row = document.createElement('tr')
 
    row.className = 'table-row'
    row.id = `row ${dog.id}`
    row.innerHTML += `
    <td name='name'>${dog.name}</td>
    <td name='breed'>${dog.breed}</td>
    <td name='sex'>${dog.sex}</td>
    <td><button class='edit-button' id=edit${dog.id}>Edit</button></td>
    `
    table.append(row)

    const form = document.querySelector('#dog-form')
    let editBtn = document.querySelector(`#edit${dog.id}`)
        document.addEventListener('click', function(e){
            if(e.target.id === editBtn.id){
                e.preventDefault()
                form.children['name'].value = dog.name
                form.children['name'].id = dog.id
                form.children['breed'].value = dog.breed
                form.children['sex'].value = dog.sex
            }
        })
//         const dogBtns = Array.from(document.querySelectorAll(".dog-btn"))
//         dogBtns.forEach(btn => {
//           btn.addEventListener('click', (event) => {
//             if (event.target.dataset.id === btn.dataset.id){
//               populateForm(btn.dataset.id)
//             }
//           })
//         })
}

function editDog(){
    document.addEventListener('submit', function(e){
        if(e.target.matches('#dog-form')){
            e.preventDefault()
            const formContent = e.target
            const currentDogId = formContent.children['name'].id
            const currentRow = document.getElementById(`row ${currentDogId}`)
      
            const dogObj = {
                name: formContent.children['name'].value,
                breed: formContent.children['breed'].value,
                sex: formContent.children['sex'].value
            }

            fetch(`http://localhost:3000/dogs/${currentDogId}`,{
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(dogObj)
            })

            currentRow.children.name.textContent = dogObj.name
            currentRow.children.breed.textContent = dogObj.breed
            currentRow.children.sex.textContent = dogObj.sex
        }
       
    })
  
}

























// document.addEventListener('DOMContentLoaded', () => {
//     const table = document.getElementById('table-body')
//     const form = document.getElementById('dog-form')

// const getDogs = function(){
//     fetch('http://localhost:3000/dogs')
//     .then(resp => resp.json())
//     .then(dogs => {dogs.forEach(function(dog){
//             const dogList = createDog(dog)
//             renderDog(dogList)
//         })
//     }) 
// }

// function renderDog(dogList){
//     table.append(dogList)
// }

// function createDog(dog){
//     let row = document.createElement('tr')
//     row.id = `row ${dog.id}`

//     row.innerHTML += `
//     <td>${dog.name}</td>
//     <td>${dog.breed}</td>
//     <td>${dog.sex}</td>
//     <td><button class='edit-button' id=${dog.id}>Edit</button></td>
//     `    
//     return row
// }

// function editForm(){
//     document.addEventListener('click', function(e){
//         if (e.target.matches('.edit-button')){
//             const button = e.target
//             const currentDog = button.id
//             const sex = button.parentNode.previousSibling.previousElementSibling
//             const breed = sex.previousElementSibling
//             const name = breed.previousElementSibling
//             form.innerHTML = `
//             <input id=${currentDog} type="text" name="name" placeholder="dog's name" value=${name.innerText} />
//             <input type="text" name="breed" placeholder="dogs's breed" value=${breed.innerText} />
//             <input type="text" name="sex" placeholder="dog's sex" value=${sex.innerText} />
//             <input type="submit" id='submit' value="Submit" />
//             `
//         }
//     })
// } 

// function editDogs(){
//     form.addEventListener('submit', function(e){ 
//         e.preventDefault()
//         let submitBtn = e.target
//         let dogId = submitBtn.firstChild.nextElementSibling.id
//         let dogRow = document.getElementById(`row ${dogId}`)

//         const dogObj = { 
//             name: form.name.value,
//             breed: form.breed.value,
//             sex: form.sex.value
//         }
      
//         fetch(`http://localhost:3000/dogs/${dogId}`,{
//         method: "PATCH",
//         headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json"
//         },
//         body: JSON.stringify(dogObj)
//     })
    
//     dogRow.childNodes[1].textContent = dogObj.name
//     dogRow.childNodes[3].innerText = dogObj.breed
//     dogRow.childNodes[5].innerText = dogObj.sex

 
//     })    
 
// }

//     getDogs()
//     editForm()
//     editDogs()
// })
