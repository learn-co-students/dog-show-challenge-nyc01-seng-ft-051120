const BASE_URL = "http://localhost:3000";
const DOGS_URL = `${BASE_URL}/dogs`;
document.addEventListener('DOMContentLoaded', () => {
  fetcher(DOGS_URL,displayDogs,console.log)
  addClickEvent()
  addSubmitEvent()
})

function displayDogs(dogs){
  tbody =  document.querySelector("#table-body")
  dogs.forEach(dog => {
    tbody.insertAdjacentHTML("beforeend",createDogTrHTML(dog))
  });
}

function createDogTrHTML(dog){
  return `<tr data-id ="${dog.id}">
          <td>${dog.name}</td> 
          <td>${dog.breed}</td>
           <td>${dog.sex}</td> 
           <td><button class="edit-dog" data-id ="${dog.id}">Edit</button></td>
           </tr>`
}


function fetcher(url,successCallback,errorCallback,data={},method="GET"){
  fetch(url,createObject(data,method))
  .then(resp=>resp.json())
  .then(json => successCallback(json))
  .catch(err => errorCallback(err))
}

function createObject(data,method){
  const object = {
    method:method,
    headers:{
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  }
  if(!isEmpty(data)){
    object["body"]= JSON.stringify(data)
  }
  return object
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function addClickEvent(){
  document.querySelector("#table-body")
  .addEventListener("click", e =>{
    if (e.target.className === "edit-dog"){
      const tr = e.target.closest("tr")
      populateFormfromTr(tr)
    }
  })

}

function addSubmitEvent(){
  document.querySelector("#dog-form")
  .addEventListener("submit",e => {
    e.preventDefault()
    data =  createDataFromForm(e.target)
    fetcher(`${DOGS_URL}/${data.id}`,updateDogTr,console.log,data,"PATCH")
  })
}

function populateFormfromTr(tr){
  const form =  document.querySelector("#dog-form")
  form.id.value = tr.dataset.id 
  form.name.value = tr.children[0].textContent
  form.breed.value = tr.children[1].textContent
  form.sex.value = tr.children[2].textContent
}

function createDataFromForm(form){
  const data = {
    id : form.id.value,
    name: form.name.value,
    breed : form.breed.value,
    sex: form.sex.value,
  }
  return data
}

function updateDogTr(dog){
  const tr = document.querySelector(`tr[data-id="${dog.id}"]`)
  tr.children[0].textContent = dog.name
  tr.children[1].textContent = dog.breed
  tr.children[2].textContent = dog.sex
}