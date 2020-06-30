let baseUrl = 'http://localhost:3000/dogs'

document.addEventListener('DOMContentLoaded', () => {

getDogs()
clickHandler()
})


const getDogs = () => {
    fetch(baseUrl)
    .then(res => res.json())
    .then(dogs => {
        dogs.forEach(dog => {
            dogsTable(dog)
            // editDog(dog)
        }); 
    })
}

const dogsTable = dog => {
    const tableBody = document.getElementById('table-body')
    tableBody.innerHTML += 
    `<tr><td>${dog.name}</td> 
        <td>${dog.breed}</td> 
        <td>${dog.sex}</td> 
        <td><button data-dog-id="${dog.id}">Edit Dog</button>
    </td></tr>`

}

const clickHandler = () =>{
    const tableBody = document.getElementById('table-body')
    // const dogForm = document.getElementById('dog-form')
    
    tableBody.addEventListener('click', e => {
        console.log(e.target.dataset["dogId"]);
        // editDog(e.target.dataset["dogId"])
        fetch(`${baseUrl} /${e.target.dataset["dogId"]}`, {
            method: "PATCH",
            headers: {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json'
            },
            body: JSON.stringify({
                // 'dog_id': event.target.dataset["dogId"]
                'name': name,
                // 'breed': breed,
                //  'sex': sex

            })
        })
        .then(res => res.json())
        .then(dogObj => {
            // console.log(dogObj.name); 
            editDog(dogObj) 
        })
    })
}

const editDog = dog => {
    const dogForm = document.getElementById('dog-form')
    dogForm.innerHTML = 
`        <form id='dog-form' class="padding margin border-round border-grey">
          <input type="text" name="name" placeholder="dog's name" value="${dog.name}" />
          <input type="text" name="breed" placeholder="dog's breed" value="${dog.breed}" />
          <input type="text" name="sex" placeholder="dog's sex" value="${dog.sex}" />
          <input type="submit" value="Submit" />
        </form>` 
    dogForm.addEventListener('submit', e => {
        console.log(e.target)
    })
}


    // const dogForm = document.getElementById('dog-form')



/*
1. fetch 
2. put into the table
   fetch(baseUrl + `/${e.target.id}`)
* Make a dog editable
 - add eventlistener on edit button
 - 
*/

