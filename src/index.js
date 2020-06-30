document.addEventListener('DOMContentLoaded', () => {


    
    fetch("http://localhost:3000/dogs")
    .then(response => response.json())
    .then(data => {
        data.forEach(dog => {
            let tableBody = document.querySelector('#table-body') 
            let tableRow = document.createElement('tr')
            tableRow.innerHTML = `
            <td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button id="${dog.id}">Edit Dog</button></td>
            `
            tableBody.append(tableRow)
        })
    })
    


    document.addEventListener('click', function(e){
        if(e.target.innerText = "Edit Dog"){
          let id = e.target.id
          let newId = id - 1
          let tableBody = document.querySelector('#table-body') 

          let dogForm = document.getElementById('dog-form')
          dogForm.innerHTML = `
            <input id="${id}" type="text" name="name" placeholder="dog's name" value="${tableBody.rows[newId].cells[0].innerText}" />
            <input type="text" name="breed" placeholder="dog's breed" value="${tableBody.rows[newId].cells[1].innerText}" />
            <input type="text" name="sex" placeholder="dog's sex" value="${tableBody.rows[newId].cells[2].innerText}" />
            <input type="submit" value="Submit" />
          `
        //√get the input from the table row
        //√autopopulate it into the form
        }

     })


     document.addEventListener('click', function(e){
        e.preventDefault()
        if(e.target.value === "Submit"){
           console.log('hooray')

           let tableBody = document.querySelector('#table-body') 
 
           let dogForm = document.getElementById('dog-form')

           let formObj = {
             name: dogForm[0].value,
             breed: dogForm[1].value,
             sex: dogForm[2].value
          }

           fetch(`http://localhost:3000/dogs/${dogForm[0].id} `, {
               method: "PATCH",
               headers: {
                   "content-type": "application/json",
                   "accept": "application/json"
               }, 
               body: JSON.stringify(formObj)
           })
             .then(response => response.json())
             .then(console.log)

        }
     })


})