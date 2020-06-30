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
   console.log( e.target.parentElement.parentElement.datasetName)
  //  formBody.name.value = 
  //  formBody.breed.value=
  //  formBody.sex.value =
  }

})




fetchDogs()
})