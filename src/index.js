document.addEventListener('DOMContentLoaded', () => {
const baseUrl = 'http://localhost:3000/dogs'
const table = document.querySelector('#table-body')
const form = document.querySelector('#dog-form')

const fetchDogs = () => {
  fetch(baseUrl)
  .then(r => r.json())
  .then(data => {
    data.forEach(d => (render(d)))
  })
}

const render = (dog) => {
  const row = document.createElement('tr')
  row.dataset.id = dog.id
  row.dataset.name = dog.name
  row.dataset.breed = dog.breed
  row.dataset.sex = dog.sex
  
  row.innerHTML = `
  <td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button>Edit</button></td>
  `
  table.appendChild(row)
}

const editDogs = () => {
  table.addEventListener('click', e => {
    if (e.target.textContent === "Edit") {
      let dogInfo = e.target.parentNode.parentNode
      form.name.value = dogInfo.dataset.name
      form.breed.value = dogInfo.dataset.breed
      form.sex.value = dogInfo.dataset.sex
      form.dataset.id = dogInfo.dataset.id
    }
  })
}

const submitDogs = () => {
  form.addEventListener('submit', e => {
    e.preventDefault()
    const dogObj = {
      'name': form.name.value,
      'breed': form.breed.value,
      'sex': form.sex.value
    }
    fetch(`${baseUrl}/${form.dataset.id}`, {
      method: 'PATCH',
      body: JSON.stringify(dogObj),
      headers: {
        'Content-type': 'application/json; charset=UTF-8' 
      }
    })
    .then(r => r.json())
    .then(table.remove())
    .then(fetchDogs())
  })
  // fetchDogs()
}

fetchDogs()
editDogs()
submitDogs()
})