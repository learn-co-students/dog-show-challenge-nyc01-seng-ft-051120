document.addEventListener('DOMContentLoaded', () => {

    const dogsList = document.getElementsByByTagName("table");   //isolate table

    function renderDog(dog){
       const dogDivv = document.getElementsByTagName("tr");      //grab dog class
       dogDivv.className = "padding"
       dogDivv.innerHTML=  `
         <td>Name ${dog.name}</td> 
        <td>Breed ${dog.breed} </td> 
        <td>Sex ${dog.sex}</td> 
        <td><button>Edit</button></td>
       `
       dogDivv.append(innerDiv)
    }

    function renderDogs(dogsData){
        dogsData.forEach(dog => {
            renderDog(dog)
        })
    }
    
    function fetchDogs(url){
        fetch(url)
        .then(resp => resp.json())
        .then(dogsData => rederDogs(dogsData))  //forgot what goes in here
    }
    fetchDogs("http://localhost:3000/dogs");
    
    function editDog(){
        const doggoForm = document.getElementById("dog-form") 
        doggoForm.addEventListener("submit", function(e){
            e.preventDefault();
            //update dog info somehow - create variable?
        })
    }

    function fetchEdit(url, dogObj){
        fetch(url, dog {
            method:"PATCH", 
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'

            },
            body: JSON.stringify({
                "dog": dogObj       
        })
        .then(resp => resp.json())
        .then(dog => editedDog)   
        })

        const newDogObj = {           //this syntax is wrong but I know I need to return the user input from the form to update the changes
            name: newDogObj[name],
            breed:newDogObj[breed],
            sex:newDogObj[sex]
        }
        //also need id of dog being changed since we are editing a specific dog
    }

})


//define container for all dogs
//renderDog - gives you a dog div
//renderDogs - adds each dog to registered dog list
//fetchDogs - fetch request to get all dogs info for list

//get edit button
//add click event listener for edit button
//send post fetch request to change - remember to somehow grab form..method post, head /body 
//create const inside of post fetch to capture user input
//when you edit you need to get the form somehow.....? in fetch?
//add event listener for submit on form - prevent deault on event 
//for patch request an id will be needed


//edit part 2 - to edit isolate form
//add patch to form