const button = document.querySelector('#send')

button.addEventListener('click', ()=>{
    event.preventDefault()

    const avatar = document.querySelector('#avatar')
    const name = document.querySelector('#name')
    const lastName = document.querySelector('#lastName')
    const birthdate = document.querySelector('#birthdate')
    const gender = document.querySelector('#gender')
    const country = document.querySelector('#country')
    const description = document.querySelector('#description')

    console.log(avatar.value)
    console.log(name.value)
    console.log(lastName.value)
    console.log(birthdate.value)
    console.log(gender.value)
    console.log(country.value)
    console.log(description.value)

    const persona = {
        avatar: avatar.value,
        name: name.value,
        lastName: lastName.value,
        birthdate: birthdate.value,
        gender: gender.value,
        country: country.value,
        description: description.value
    }
    console.log(persona)

    createData( persona )
})


const createData = async ( persona )=>{
    const response = await fetch('https://persona-bfd85-default-rtdb.firebaseio.com/.json', {
        method: 'POST',
        headers:{
            "Content-type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify(persona)
    })
    if ( response.status = 200 ){
        cleanerList()
        getData()

    }
    
}

const getData = async() => {
    const response = await fetch('https://persona-bfd85-default-rtdb.firebaseio.com/.json', {
        method: 'GET',
    });
    const data = await response.json();

    const array = Object.entries(data);

    const parseData = array.map((item) => {
        const object = {
            id: item[0],
            avatar: item[1].avatar,
            name: item[1].name,
            lastName: item[1].lastName,
            birthdate: item[1].birthdate,
            gender: item[1].gender,
            country: item[1].country,
            description: item[1].description,
        };
        console.log(object)

        const card = ( character ) =>{
            const container = document.createElement('div')
            const img = document.createElement('img')
            const info = document.createElement('div')
            const buttonUserContainer = document.createElement('div')
            const buttonEdit = document.createElement('button')
            const buttonDelete = document.createElement('button')
        
            const infoName = document.createElement('h2')
            const infoLastName = document.createElement('h3')
            const infoBirthdate = document.createElement('h3')
            const infoGender = document.createElement('h3')
            const infoCountry = document.createElement('h3')
            const infoDescription = document.createElement('h3')
        
            container.classList.add( 'card__container')
            info.classList.add( 'card__info')
            buttonUserContainer.classList.add('button__container')
            buttonEdit.classList.add('buttonEdit')
            buttonDelete.classList.add('buttonDelete')

            buttonEdit.id = character.id    
            buttonDelete.id = character.id

            buttonEdit.innerText = 'EDITAR'
            buttonDelete.innerText = 'ELIMINAR'

            buttonEdit.addEventListener('click', ( event )=>{
                console.log('aqui se edita')
                window.location.href = 'http://127.0.0.1:5501/card.html' + '?id=' + event.target.id

            })

            buttonDelete.addEventListener('click', (event)=>{
                console.log(event)
                deleteData(event.target.id)
           
            })

            img.src = character.avatar
            img.width = 250
            infoName.textContent = character.name
            infoLastName.textContent = character.lastName
            infoBirthdate.textContent = character.birthdate
            infoGender.textContent = character.gender
            infoCountry.textContent = character.country
            infoDescription.textContent = character.description
        
            container.appendChild(img)
            container.appendChild(info)
            container.appendChild(buttonUserContainer)
            info.appendChild(infoName)
            info.appendChild(infoLastName)
            info.appendChild(infoBirthdate)
            info.appendChild(infoGender)
            info.appendChild(infoCountry)
            info.appendChild(infoDescription)
            buttonUserContainer.appendChild(buttonEdit)
            buttonUserContainer.appendChild(buttonDelete)

            document.body.appendChild(container)
        }
        card(object)
    }); 
};

const cleanerList = () =>{
    const cardItem = document.querySelectorAll('.card__container')
    cardItem.forEach(( element )=>{
        element.remove()

    })
}

getData()


const deleteData = async(id) =>
{
    const response = await fetch(`https://persona-bfd85-default-rtdb.firebaseio.com/${id}.json`, 
    {
        method: "DELETE",
        headers:{
            "Content-type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify({}),
    });
     
    if ( response.status = 200 ){
        cleanerList()
        getData()
    }

};




