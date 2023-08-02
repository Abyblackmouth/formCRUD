const search = window.location.search;
const url = new URLSearchParams(search);
console.log(url.get("id"));


const getById = async () =>{
    const response = await fetch(`https://persona-bfd85-default-rtdb.firebaseio.com/${url.get("id")}.json`, 
    {
        method: "GET",
    });
    const data = await response.json();
    
    console.log(data)

}

getById()