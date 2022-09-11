const deletePaintingButton = document.querySelector('#deleteButton')
const addPaintingButton = document.querySelector('#fortunePostButton')
const updateButton = document.querySelector('#updateButton')

let paintingName = document.querySelector('#name')
let imageURL = document.querySelector('#img')
let buyLink = document.querySelector('#buyLink')
let price = document.querySelector('#price')
let description = document.querySelector('#description') 

let paintingNameReadOnly = document.querySelector('#nameReadOnly')
let imageURLReadOnly = document.querySelector('#imgReadOnly')
let buyLinkReadOnly = document.querySelector('#buyLinkReadOnly')
let priceReadOnly = document.querySelector('#priceReadOnly')
let descriptionReadOnly = document.querySelector('#descriptionReadOnly') 

let imgView = document.querySelector('#imgView')   
let imgViewReadOnly = document.querySelector('#imgViewReadOnly') 
let adminView = document.querySelector('#adminView')  
let guestView = document.querySelector('#guestView')  
let BuyButton = document.querySelector('#BuyButton') 

// This will change based on which profile we choose, For now hard coding to demo
const profile_Id = 1;
let buy_it_link;
const urlParms = new URLSearchParams(location.search); 
const id = urlParms.get('id')
const adminIs = urlParms.get('isAdmin')  


const addPainting = (bodyObj) => {
    axios.post("/api/painting", bodyObj)
    .then(res => {
        const data = res.data;
        alert(res.data);
        window.location.href = `/myPaintings.html?isAdmin=true`;  
    });
};

function submitHandler(e) {
    e.preventDefault() 

    let bodyObj = {
        profile_id: profile_Id,
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
        imgView.src = data.img_url;
        buyLink.value = data.buy_it_link; 
        price.value = data.price; 
        description.value = data.description;  

        paintingNameReadOnly.value = data.name; 
        imageURLReadOnly.value = data.img_url;
        imgViewReadOnly.src = data.img_url;
        buyLinkReadOnly.value = data.buy_it_link; 
        priceReadOnly.value = data.price; 
        descriptionReadOnly.value = data.description;   
        buy_it_link = data.buy_it_link;
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

const updateImage = (e) => { 
    e.preventDefault()  
    imgView.src = imageURL.value; 
};

const buyPainting = (e) => {
    e.preventDefault()    
    window.open(buy_it_link); 
} 

addPaintingButton.addEventListener('click', submitHandler)
deletePaintingButton.addEventListener('click', deleteHandler)
updateButton.addEventListener('click', updateHandler)
imageURL.addEventListener('change', updateImage)
BuyButton.addEventListener('click', buyPainting)


if(adminIs){
    adminView.classList.remove('hide')
} else { 
    guestView.classList.remove('hide')
}

buy_it_link = '';
if(id){ 
    deletePaintingButton.classList.remove('hide')
    updateButton.classList.remove('hide')
    getPaintingById(id);
} else {
    addPaintingButton.classList.remove('hide')
} 