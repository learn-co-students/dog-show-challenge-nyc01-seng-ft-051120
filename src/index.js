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
        if(e.target.innerTect = "Edit Dog"){
          let id = e.target.id - 1
          let tableBody = document.querySelector('#table-body') 

          let dogForm = document.getElementById('dog-form')
          dogForm.innerHTML = `
            <input type="text" name="name" placeholder="dog's name" value="${tableBody.rows[id].cells[0].innerText}" />
            <input type="text" name="breed" placeholder="dog's breed" value="${tableBody.rows[id].cells[1].innerText}" />
            <input type="text" name="sex" placeholder="dog's sex" value="${tableBody.rows[id].cells[2].innerText}" />
            <input type="submit" value="Submit" />
          `
        //√get the input from the table row
        //√autopopulate it into the form
        }

     })


     document.addEventListener('click', function(e){
        e.preventDefault()
        if (e.target.innerText = "Submit"){
            
            console.log('success')
        }
     })


})