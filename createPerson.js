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
    getData()

})


const createData = async ( persona )=>{
    const response = await fetch('https://persona-bfd85-default-rtdb.firebaseio.com/.json', {
        method: 'POST',
        headers:{
            "Content-type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify(persona)
    })
    
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
    });
    return parseData;
};
