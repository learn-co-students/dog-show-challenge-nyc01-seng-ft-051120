document.addEventListener('DOMContentLoaded', () => {
 document.addEventListener("click", function(e){
   if (e.target.textContent === "edit"){
     formInputs = document.querySelector("#dog-form").childNodes
     submitButton = document.querySelector('input[type="submit"]')

     submitButton.setAttribute("id", `${e.target.id}`)
     dogdata = e.target.parentNode.parentNode.childNodes
//set name on form
       formInputs[1].placeholder = dogdata[0].innerText
//set dogs breed
       formInputs[3].placeholder =  dogdata[1].innerText
//set dog's sex
       formInputs[5].placeholder = dogdata[2].innerText

        console.log(formInputs[5].value)

    } else if (e.target.type == "submit" ) {
      dogObj = {"name" : formInputs[1].value, "breed" : formInputs[3].value, "sex": formInputs[5].value }
      fetch(`http://localhost:3000/dogs/${submitButton.id}`,{
        method: "PATCH",
        headers: {
        'Content-Type' : 'application/json'
          },
        body: JSON.stringify(dogObj)
      })
       .then(response => response.json())
       .then(data => {
         console.log('Success:', data);
         })
       .catch((error) => {
         console.error('Error:', error);
       })
     }

 })
//methods


const getDogs = () => {
  fetch("http://localhost:3000/dogs")
  .then(response => response.json())
  .then(dogs => {
    renderDogs(dogs)
  })
 }

const renderDogs = dogs => {
 const table = document.querySelector("#table-body")
   dogs.forEach(dog => {

    tdName = document.createElement("td")
    tdName.innerText = `${dog.name}`

    tdBreed = document.createElement("td")
    tdBreed.innerText = `${dog.breed}`

    tdSex = document.createElement("td")
    tdSex.innerText = `${dog.sex}`

    tdEdit = document.createElement("td")
    editButton = document.createElement("BUTTON")
    editButton.innerText = "edit"
    editButton.setAttribute("id", `${dog.id}`)
    tdEdit.appendChild(editButton)

     tr = document.createElement("tr")
     tr.appendChild(tdName)
     tr.appendChild(tdBreed)
     tr.appendChild(tdSex)
     tr.appendChild(tdEdit)

   table.appendChild(tr)

   })
}

getDogs()
 })
