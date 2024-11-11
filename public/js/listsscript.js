
class Item{
    constructor(title, status = "PENDING") {
    this.title = title;
    this.status = status;
}
}
class Lista{
    description = "";
    items = [];
}

let token = localStorage.getItem('token')


fetch('http://localhost:8080/validate-token',{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }   
})
.then(response => {
    if (!response.ok) {        
        console.log("token inválido ou erro na rede.")
        window.location.href = '/';
    }        
    return response;
})
.catch(error => {
    console.log(error.message) 
});


let shuffleButton = document.querySelector("#shufflebtn")
let paragraph =  document.querySelector("p")
let textArea = document.querySelector("textarea")
let backButton = document.querySelector("#backbtn")
let saveListButton = document.querySelector("#saveListBtn")
let saveButton = document.querySelector("#saveBtn")
let cancelButton = document.querySelector("#cancelBtn");
let listName = document.querySelector("#modalInput")
let span = document.querySelector(".close-btn");

function shuffleList(){
    let items = textArea.value;
    items = items.split("\n");
    items = items.filter( element => element!=="");
    
    fetch('http://localhost:8080/list/shuffle', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
             'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(items) 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na resposta da rede');
        }        
        return response.json();
    })
    .then(data => {
        console.log(data);
        showList(data) 
        localStorage.setItem(list, data);
    })
    .catch(error => {
        console.log(error.message) 
    });
    
}

function showList(data){
    
    shuffleButton.classList.add("hide")
    textArea.classList.add("hide")
    backButton.classList.remove("hide")
    saveListButton.classList.remove("hide")
    
    paragraph.innerText = "Here is your list:"
    orderedList = document.createElement("ol")
    
    data.forEach(element => { 
        let item = document.createElement("li")
        item.textContent = element
        orderedList.appendChild(item)
    });

    paragraph.insertAdjacentElement("afterend", orderedList)
}


shuffleButton.addEventListener("click", function(event)  {    
    event.preventDefault()    
    shuffleList()
    showList()
})

backButton.addEventListener("click", function(event) {
    event.preventDefault()
    location.reload(true)
})

saveListButton.addEventListener("click", function(event) {
    event.preventDefault()
    modal.style.display = "block";
})

saveButton.addEventListener("click", function(event) {
    event.preventDefault()
 /*   let lista = new Lista();
    lista.description = listName.value;

    fetch('http://localhost:8080/list', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(lista) 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na resposta da rede');
        }
        return response.json();
    })
    .then(data => {
      console.log(data)
    })
    .catch(error => {
        console.log(error.message) 
    });
*/
})

span.onclick = function() {
    modal.style.display = "none";
}

cancelButton.onclick = function() {
    modal.style.display = "none";
}