document.addEventListener('DOMContentLoaded', () => {

    function getDogs(){
        fetch('http://localhost:3000/dogs', {
        })
        .then(response => response.json())
        .then(dogs => renderDogs(dogs))
    }

    function renderDogs(dogs){
        const dogTable = document.querySelector('#table-body')
        
        dogs.map(dog => {
            const dogRow = document.createElement('tr')
            
            const nameTd = document.createElement('td')
            nameTd.textContent = dog.name

            const breedTd = document.createElement('td')
            breedTd.textContent = dog.breed
            breedTd.dataset.id = 'breed'

            const sexTd = document.createElement('td')
            sexTd.textContent = dog.sex

            const editButton = document.createElement('button')
            editButton.innerHTML = `
                <button>Edit</button>
            `

            dogRow.dataset.id = dog.id

            dogRow.append(nameTd, breedTd, sexTd, editButton)
            dogTable.append(dogRow)
        })
    }

    function editDog(){
        document.addEventListener('click', function(e){
            if (e.target.innerText === 'Edit' ){
                const dogForm = document.querySelector('#dog-form')
                dogNode = e.target.parentNode.parentNode
                dogId = dogNode.dataset.id
                
                
                dogForm.name.value = dogNode.getElementsByTagName('td')[0].innerText
                
                dogForm.breed.value = dogNode.getElementsByTagName('td')[1].innerText

                dogForm.sex.value = dogNode.getElementsByTagName('td')[2].innerText

                document.addEventListener('submit', function(j) {
                    j.preventDefault()
                    
                    
                    let newName = dogForm.name.value
        
                    let newBreed = dogForm.breed.value
        
                    let newSex = dogForm.sex.value
        
                    fetch(`http://localhost:3000/dogs/${dogId}`, {
                    method: 'PATCH',
                    headers: {
                        'content-type': 'application/json',
                        'accept': 'application/json'
                    },
                    body: JSON.stringify({
                        'name': `${newName}`,
                        'breed': `${newBreed}`,
                        'sex': `${newSex}`
                    })
                
                    })
                    .then(response => response.json())
                    .then(

                    dogNode.getElementsByTagName('td')[0].innerText = newName,

                    dogNode.getElementsByTagName('td')[1].innerText = newBreed,

                    dogNode.getElementsByTagName('td')[2].innerText = newSex,
                
                    console.log('Edited')
                )

                dogForm.reset()
                        
                })
                
            }
        })
       
    }

    

    editDog()
    getDogs()
})


