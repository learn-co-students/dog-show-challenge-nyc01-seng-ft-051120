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
    fetchDogs(http://localhost:3000/dogs);

    function editDog(){
        const buttonContainer = document.getElementsByTagName(tr) //grab parent for edit button since every row has an edit button
        buttonContainer.addEventListener("click", function(e){
            e.preventDefault();
            const editBtn = buttonContainer.children[3]     //grabs fourth tr 
            if(editBtn.innerText === "Edit Dog"){       //unsure how to proceed here

            }
        })
    },

    function fetchEdit(url, dog){
        fetch(url, dog {
            method:"POST", 
            headers: {
                'Content-type': 'application/json`,
                //reponse you accept in return :'application/json`

            },
            body: JSON.stringify(dog),
        })
        .then(resp => resp.json());
        .then(json => dog)
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
