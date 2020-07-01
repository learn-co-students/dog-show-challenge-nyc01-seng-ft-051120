document.addEventListener('DOMContentLoaded', () => {
let tBody = document.getElementById('table-body')
let editForm = document.getElementById('dog-form')

const dogApi = ()=>{fetch('http://localhost:3000/dogs')
.then (resp => resp.json())
.then (json => json.forEach(dog => postDoggies(dog)))}

const postDoggies = (dog) =>{
let tr = document.createElement('tr')
tr.dataset.id =dog.id
tr.innerHTML =`<td name="name">${dog.name}</td>
<td name="breed">${dog.breed}</td> <td name="sex">${dog.sex}</td> <td><button data-id=${dog.id}>Edit</button></td>
`
tBody.append(tr)}
document.addEventListener('click',function(e){
  if(e.target.textContent == "Edit"){
    let tableValues = e.target.parentNode.parentNode.children
   let name = tableValues.name.innerText
   let breed = tableValues.breed.innerText
   let sex = tableValues.sex.innerText
  editForm.dataset.id= e.target.dataset.id
   editForm.name.value =  name
   editForm.breed.value =  breed
   editForm.sex.value = sex
  }
})

document.addEventListener('submit',function(e){
  e.preventDefault()
  let form =e.target
  let name =form.name.value
  let breed = form.breed.value
  let sex = form.sex.value
  fetch (`http://localhost:3000/dogs/${form.dataset.id}`,{
    method :'PATCH',
    body: JSON.stringify({
      name: name,
      breed : breed,
      sex : sex
    }),
    headers: {
      'content-type':'application/json'
    }
  })
  let update = document.querySelector(`tr[data-id="${form.dataset.id}"]`)
  update.children.name.innerText = name
  update.children.breed.innerText = breed
  update.children.sex.innerText = sex
  editForm.reset()
})
dogApi()
})