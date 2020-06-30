document.addEventListener('DOMContentLoaded', () => {
    const dogsUrl = 'http://localhost:3000/dogs'
    const dogTableBase = document.getElementById("table-body")
    const editFormBase = document.getElementById('dog-form')
    fetchDogs(dogsUrl)



    function fetchDogs(url) {
        fetch(url)
        .then(resp => resp.json())
        .then(dogsData => {
            dogTableBase.innerHTML = ''
            renderDogs(dogsData)})
        .catch(error => alert(error))
    }

    function renderDogs(dogsData) {
        dogsData.forEach(dog => renderDog(dog))
    }

    function renderDog(dog) {
        const dogTr = document.createElement('tr')
        dogTr.innerHTML = `
                    <td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button data-id="${dog.id}">Edit</button></td>
                        `
        dogTableBase.append(dogTr)
    }

    document.addEventListener('click', function(e){
        if (e.target.textContent === 'Edit') {
            const editButton = e.target
            const dogId = editButton.dataset.id
            const dogTr = editButton.parentNode.parentNode
            const dogNameTd = dogTr.querySelector('td')
            const dogName = dogNameTd.textContent
            const dogBreedTd = dogNameTd.nextElementSibling
            const dogBreed = dogBreedTd.textContent
            const dogSexTd = dogBreedTd.nextElementSibling
            const dogSex = dogSexTd.textContent
            editFormBase.dataset.dogid = dogId
            editFormBase.innerHTML = `
                                    <input type="text" name="name" placeholder="dog's name" value="${dogName}" />
                                    <input type="text" name="breed" placeholder="dog's breed" value="${dogBreed}" />
                                    <input type="text" name="sex" placeholder="dog's sex" value="${dogSex}" />
                                    <input type="submit" value="Submit" />
                                    `
        }
    })

    editFormBase.addEventListener('submit', function(e){
        e.preventDefault()
        const form = e.target
        const dogId = form.dataset.dogid
        const dogName = form.name.value
        const dogBreed = form.breed.value
        const dogSex = form.sex.value
        const dogObj = {
            "name": `${dogName}`,
            "breed": `${dogBreed}`,
            "sex": `${dogSex}`
        }
        if (!!dogId) {
            if (dogName === '') {
                alert('You must enter a dog name')
            }
            else if (dogBreed === '') {
                alert('You must enter a dog breed')
            }
            else if (dogSex != 'male' && dogSex != 'female') {
                alert('You must enter a valid dog sex')
            }
            else {
                fetchEdit(`${dogsUrl}/${dogId}`, dogObj)
            }
        }
        else {
            alert('You must choose a dog to edit')
        }
    
      
        
    })

    function fetchEdit(url, dogObj) {
        fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(dogObj)
        })
        .then(resp => resp.json())
        .then(data => {
            fetchDogs(dogsUrl)
        })
        .catch(error => alert(error))
    }



})