const baseUrl="http://localhost:3000/dogs"
let editID
document.addEventListener('DOMContentLoaded', () => {
getDog()
document.addEventListener('click', event=>{
    event.preventDefault()
    if(event.target.innerText==='Edit'){
        editDog(event.target.closest('tr'))
    } else if(event.target.tagName==='INPUT' && event.target.type==='submit'){
        const editForm=document.getElementById('dog-form')
        patchDog({
            name: editForm.name.value,
            breed: editForm.breed.value,
            sex: editForm.sex.value
        })
        editForm.reset()
    }
    else console.log(event.target)
})
})

const getDog=()=>{
fetch(baseUrl)
.then(res=>res.json())
.then(dogs=>{
    dogs.forEach(dog => {
        renderDog(dog)
    });
})
}

const renderDog=dog=>{
    const tBody=document.querySelector('#table-body')
    const tr=document.createElement('tr')
    tr.innerHTML=`<td>${dog.name}</td> 
                    <td>${dog.breed}</td> 
                    <td>${dog.sex}</td> 
                    <td><button>Edit</button></td>`
    tr.id=dog.id
    tBody.appendChild(tr)
}

const editDog=(tr)=>{
    editID=tr.id
    const editForm=document.getElementById('dog-form')
    console.log(tr.childNodes[4])
    editForm.name.value=tr.childNodes[0].textContent
    editForm.breed.value=tr.childNodes[2].textContent
    editForm.sex.value=tr.childNodes[4].textContent
}

const patchDog=(dog)=>{
    fetch(`${baseUrl}/${editID}`, {
        method: "PATCH",
        headers: {
            "content-type": "application/json",
            "accept": 'application/json'
        },
        body: JSON.stringify(dog)
    })
    .then(res=>res.json())
    .then(updatedDog=>{
    const tr=document.getElementById(`${editID}`)
        tr.innerHTML=`<td>${updatedDog.name}</td> 
                    <td>${updatedDog.breed}</td> 
                    <td>${updatedDog.sex}</td> 
                    <td><button>Edit</button></td>`
    })
}