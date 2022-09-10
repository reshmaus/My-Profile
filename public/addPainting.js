const deletePaintingButton = document.querySelector('#deleteButton')
const addPaintingButton = document.querySelector('#fortunePostButton')
const updateButton = document.querySelector('#updateButton')

let paintingName = document.querySelector('#name')
let imageURL = document.querySelector('#img')
let buyLink = document.querySelector('#buyLink')
let price = document.querySelector('#price')
let description = document.querySelector('#description') 

const urlParams = new URLSearchParams(location.search);
const isAdmin = urlParams.get('isAdmin')  
const id = urlParams.get('id')


const addPainting = (bodyObj) => {
    axios.post("/api/painting", bodyObj)
    .then(res => {
        const data = res.data;
        alert(res.data);
        paintingName.value = ''; 
        imageURL.value = '';
        buyLink.value = ''; 
        price.value = ''; 
        description.value = '';  
    });
};

function submitHandler(e) {
    e.preventDefault() 

    let bodyObj = {
        name: paintingName.value, 
        img_url: imageURL.value,
        buy_it_link: buyLink.value,
        price: price.value, 
        description: description.value,
    }

    addPainting(bodyObj)

    paintingName.value = ''; 
    imageURL.value = '';
    buyLink.value = ''; 
    price.value = ''; 
    description.value = '';  
} 

const updatePainting = (bodyObj) => {
    axios.put(`/api/painting/${id}`, bodyObj)
    .then(res => {
        alert(res.data); 
        window.location.href = `/myPaintings.html?isAdmin=true`;   
    });
};

function updateHandler(e) {
    e.preventDefault() 

    let bodyObj = {
        id,
        name: paintingName.value, 
        img_url: imageURL.value,
        buy_it_link: buyLink.value,
        price: price.value, 
        description: description.value,
    }

    updatePainting(bodyObj)

    paintingName.value = ''; 
    imageURL.value = '';
    buyLink.value = ''; 
    price.value = ''; 
    description.value = '';  
} 

const getPaintingById = (id) => {
    axios.get(`/api/painting/${id}`)
    .then(res => {
        console.log("--res --", res)
        const data = res.data[0];
        paintingName.value = data.name; 
        imageURL.value = data.img_url;
        buyLink.value = data.buy_it_link; 
        price.value = data.price; 
        description.value = data.description;  
    });
};

const deleteHandler = (e) => { 
    e.preventDefault() 

    axios.delete(`/api/painting/${id}`)
    .then(res => {
        alert(res.data); 
        window.location.href = `/myPaintings.html?isAdmin=true`;   
    });
};

addPaintingButton.addEventListener('click', submitHandler)
deletePaintingButton.addEventListener('click', deleteHandler)
updateButton.addEventListener('click', updateHandler)


if(id){ 
    deletePaintingButton.classList.remove('hide')
    updateButton.classList.remove('hide')
    getPaintingById(id);
} else {
    addPaintingButton.classList.remove('hide')
}

if(isAdmin){ 
    homeLink.href = './?isAdmin=true';
    myPaintingLink.href = './myPaintings.html?isAdmin=true';
}