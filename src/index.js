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
  const formInputs = Array.from(form.children).slice(0,3);
  const rowContents = Array.from(tableRow.children).slice(0, 3);

  console.log(rowContents);
  
  form.dataset.currentDog = tableRow.dataset.dogId;
  for(const i in formInputs) {
    formInputs[i].value = rowContents[i].innerText;
  }
}

function submitDog() {
  let dogObject = { id: form.dataset.currentDog };
  const formInputs = Array.from(form.children).slice(0,3);
  for (const i in formInputs) {
    dogObject[formInputs[i].name] = formInputs[i].value;
  }
  editDog(dogObject)
}

editDog = async dog => {
  await fetch( `http://localhost:3000/dogs/${dog.id}`,
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
    const tableRow = e.target.parentElement.parentElement;
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