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
                const dogNode = e.target.parentNode.parentNode
                const dogId = dogNode.dataset.id
                debugger
                console.dir(dogNode.querySelector('td'))
                
                dogForm.name.value = dogNode.name.value
                
                dogForm.breed.value = dogNode.breed.value

                dogForm.sex.value = dogNode.sex.value

                
            }
        })
        console.log('Done')
    }

    editDog()
    getDogs()
})


document.addEventListener('submit', () => {
    e.preventDefault()
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
    .then(console.log)
})