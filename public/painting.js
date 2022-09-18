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
 
// This will change based on which profile we choose, For now set in cookie 
const profileId = getCookie('profileId');
let buyItLink;
const urlParms = new URLSearchParams(location.search); 
const id = urlParms.get('id')
// The constant will give error it its isAdmin, As main.js has same constant defined. So have to define constant is_admin 
const is_admin = urlParms.get('isAdmin')  

// Add new painting Api call
const addPainting = (bodyObj) => {
    axios.post("/api/painting", bodyObj)
    .then(res => {
        const data = res.data;
        alert(res.data);
        window.location.href = `/myPaintings.html?isAdmin=true`;  
    });
};

// Add new painting button handler 
function submitHandler(e) {
    e.preventDefault() 

    let bodyObj = {
        profile_id: profileId,
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

// Update painting Api call
const updatePainting = (bodyObj) => {
    axios.put(`/api/painting/${id}`, bodyObj)
    .then(res => {
        alert(res.data); 
        window.location.href = `/myPaintings.html?isAdmin=true`;   
    });
};

// Update existing painting details button handler
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

// Get painting by id Api call
const getPaintingById = (id) => {
    axios.get(`/api/painting/${id}`)
    .then(res => { 
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
        // Add value to constant here   
        buyItLink = data.buy_it_link;
    });
};

// Delete painting Api call and button handler
const deleteHandler = (e) => { 
    e.preventDefault() 

    axios.delete(`/api/painting/${id}`)
    .then(res => {
        alert(res.data); 
        window.location.href = `/myPaintings.html?isAdmin=true`;   
    });
};

// Update the image url to shoe new uploaded image on change  
const updateImage = (e) => { 
    e.preventDefault()  
    imgView.src = imageURL.value; 
};

// Buy painting button click handler 
const buyPainting = (e) => {
    e.preventDefault()    
    window.open(buyItLink); 
} 

addPaintingButton.addEventListener('click', submitHandler)
deletePaintingButton.addEventListener('click', deleteHandler)
updateButton.addEventListener('click', updateHandler)
imageURL.addEventListener('change', updateImage)
BuyButton.addEventListener('click', buyPainting)


if(is_admin){
    adminView.classList.remove('hide')
} else { 
    guestView.classList.remove('hide')
}

buyItLink = '';
if(id){ 
    deletePaintingButton.classList.remove('hide')
    updateButton.classList.remove('hide')
    getPaintingById(id);
} else {
    addPaintingButton.classList.remove('hide')
} 