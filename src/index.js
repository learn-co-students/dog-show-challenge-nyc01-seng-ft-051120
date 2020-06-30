const tableBody = document.querySelector("#table-body");
const form = document.querySelector("#dog-form");

function getDogs() {
  fetch("http://localhost:3000/dogs")
  .then(res => res.json())
  .then(json => renderDogs(json))
}

function renderDogs(dogs) {
  tableBody.innerHTML = "";
  dogs.map(dog => {
    tableBody.innerHTML += `
      <tr data-dog-id="${dog.id}">
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <td><button>Edit</button></td>
      </tr>
    `
  })
}

function displayDogInfo(tableRow) {
  const formInputs = Array.from(form.children).splice(0,3);
  const rowContents = Array.from(tableRow.children).splice(0, 3)
  formInputs.forEach((form, i) => {
    form.value = rowContents[i].innerText
  })
  form.dataset.currentDog = tableRow.dataset.dogId
}

function submitDog() {
  let dogObject = { id: form.dataset.currentDog };
  const inputs = Array.from(form.children);

  inputs.splice(0,3).forEach(input => {
    dogObject[input.name] = input.value
  })
  editDog(dogObject)
}

editDog = async (dog) => {
  await fetch(
    `http://localhost:3000/dogs/${dog.id}`,
    {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: `${dog.id}`,
        name: `${dog.name}`,
        breed: `${dog.breed}`,
        sex: `${dog.sex}`
      })
    }
  )
  getDogs()
}

tableBody.addEventListener('click', e => {
  if (e.target.tagName == "BUTTON") {
    const tableRow = e.target.parentElement.parentElement;;
    displayDogInfo(tableRow)
  }
});

form.addEventListener('click', e => {
  if (e.target.type == "submit") {
    e.preventDefault()
    submitDog()
  } 
})

getDogs()