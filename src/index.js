document.addEventListener('DOMContentLoaded', () => {
let tableBody = document.getElementById("table-body")
let formBody = document.getElementById('dog-form')

const fetchDogs = () =>{fetch ("http://localhost:3000/dogs")
.then(resp => resp.json())
.then(json => json.forEach(dog => postDogs(dog)))}

const postDogs = (dog) =>{
let tr = document.createElement('tr')
let td = document.createElement('td')
tr.dataset.id = dog.id
tr.innerHTML = `<td data-name = ${dog.name}>${dog.name}</td> <td> ${dog.breed}</td> <td data-sex = ${dog.sex}>${dog.sex}</td> <td><button>Edit</button></td>`
tableBody.append(tr)
}
document.addEventListener('click',function(e){
  if(e.target.innerText == 'Edit'){
   fetch(`http://localhost:3000/dogs/${e.target.parentElement.parentElement.dataset.id}`)
   .then (response => response.json())
   .then (json => form(json))
  function form(json){ formBody.name.value = json.name,
   formBody.breed.value=json.breed,
   formBody.sex.value = json.sex
  formBody.dataset.id = json.id}
   document.addEventListener('submit',function(e){
     let form = e.target
     fetch(`http://localhost:3000/dogs/${e.target.dataset.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        name:`${e.target.name.value}`,
        breed:`${e.target.breed.value}`,
        sex:`${e.target.sex.value}`
        }),
        headers: {
          "Content-type": "application/json"
          }
     })
     form.reset()
   })
 
}})


fetchDogs()
})