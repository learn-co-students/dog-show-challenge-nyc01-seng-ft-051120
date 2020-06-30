document.addEventListener('DOMContentLoaded', () => {


    
    fetch("http://localhost:3000/dogs")
    .then(response => response.json())
    .then(data => {
        data.forEach(dog => {
            let tableBody = document.querySelector('#table-body') 
            let tableRow = document.createElement('tr')
            tableRow.innerHTML = `
            <td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button>Edit Dog</button></td></tr>
            `
            tableBody.append(tableRow)
        })
    })


    document.addEventListener('click', function(e){
        if(e.target.innerTect = "Edit Dog"){
         let dogForm = document.getElementById('dog-form')
        console.log(e.target.parentElement.parentElement)
        //get the input from the table row
        //autopopulate it into the form
        }
    })


})