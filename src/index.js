document.addEventListener("DOMContentLoaded", () => {
  // 1.On page load, render a list of already
  //registered dogs in the table. You can fetch these dogs from localhost
  // 2.The dog should be put on the table as a table row.
  function fetchDogs(url) {
    fetch(url)
      .then(function (res) {
        return res.json();
      })
      .then(function (dogs) {
        const table = document.querySelector("#table-body");
        for (let i = 0; i < dogs.length; i++) {
          const addTr = document.createElement("tr");
          addTr.id = dogs[i].id;
          addTr.innerHTML = `<td>${dogs[i].name}</td> 
            <td>${dogs[i].breed}</td> <td>${dogs[i].sex}</td> 
            <td><button class="edit">Edit</button></td>`;
          table.append(addTr);
        }
      });
  }
  // 3. Make a dog editable. Clicking on the edit button next to a dog should
  //populate the top form with that dog's current information.
  //grab edit button and add listener
  // send it to "edit" form
  // add listener to "submit"
  // update changes do DB
  function clickHandler() {
    const buttons = document.querySelector("body > div");
    buttons.addEventListener("click", function (e) {
      if (e.target.matches(".edit")) {
        let td = e.target.parentNode;
        let name = td.parentNode.firstChild.innerText;
        let breed = td.parentNode.firstChild.nextElementSibling.innerHTML;
        let sex =
          td.parentNode.firstChild.nextElementSibling.nextElementSibling
            .innerHTML;
        let editForm = document.querySelector("#dog-form");
        editForm.innerHTML = `
    <input type="text" name="name" placeholder="${name}" value="${name}" />
    <input type="text" name="breed" placeholder="${breed}" value="${breed}" />
    <input type="text" name="sex" placeholder="${sex}" value="${sex}" />
    <input type="submit" value="Submit" />`;
        console.log(editForm.innerHTML);
      } else if (e.target.value === "Submit") {
        // 4. On submit of the form, a PATCH request should be made to
        // http://localhost:3000/dogs/:id to update the dog information
        //(including name, breed and sex attributes).
        //
        e.preventDefault();
        const subButton = e.target;
        let dogSex = subButton.previousElementSibling.value;
        let dogBreed =
          subButton.previousElementSibling.previousElementSibling.value;
        let dogName =
          subButton.previousElementSibling.previousElementSibling
            .previousElementSibling.value;
        console.log(subButton.dogName);

        fetch("http://localhost:3000/dogs/:id", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: dogName,
            breed: dogBreed,
            sex: dogSex,
          })
        })
        .then(r => r.json())
        .then(newDog => { 
        })
      }
    });
  }

  fetchDogs("http://localhost:3000/dogs");
  clickHandler();
});
