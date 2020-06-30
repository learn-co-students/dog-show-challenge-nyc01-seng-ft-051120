function updateDog(url, dog) {
// allows user to make updates to an existing dog's name, breed, and sex
// also creates a submit button that 

    const submitButton = document.querySelector('form')[3]

    submitButton.addEventListener("submit", function(e) {
        e.preventDefault
        if (e.target.textContent === "Submit")
            fetch("http://localhost:3000/dogs/:id"), {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    "name": `${dog.name}`,
                    "breed": `${dog.breed}`,
                    "sex": `${dog.sex}`
                })
            }
                .then(response => response.json())
                .then(updatedDog => render(updatedDog))

        const patchedDog = {
            name: e.target.getElementByTagName('form')[0],
            breed: e.target.getElementByTagName('form')[1],
            sex: e.target.getElementByTagName('form')[1],
        }

        updateDog("http://localhost:3000/dogs/:id", patchedDog)      
        form.reset()  
    })

}