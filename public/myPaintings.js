const profileInfo = document.querySelector('#paintingCards') 
const addPaintingLink = document.querySelector('#addPaintingLink')   
const myPaintingLink = document.querySelector('#myPaintingLink')     
const homeLink = document.querySelector('#homeLink')    

const urlParams = new URLSearchParams(location.search);
const isAdmin = urlParams.get('isAdmin') 
 
const makePaintingChoiceCard = (ProfileInfo) => {
    return `
        <div class="paintingCards outline"> 
        <img src='${ProfileInfo.imgUrl}' alt='${ProfileInfo.name}'/> 
        <h3>${ProfileInfo.name}</h3>
        <h4>Price: ${ProfileInfo.price}</h4>
         </div>
    `
}

const makePaintingCardDisplay = (ProfileInfo) => {
    let btnHtml = `<button class="buyBtn" onclick=buyPainting('${ProfileInfo.buyItLink}')> Buy </button>`;

    if(isAdmin){
        btnHtml = `<button class="updateBtn" onclick=updatePainting(${ProfileInfo.id})> Update </button>`;
    }

    return `
        <div class="paintingCards outline"> 
            <img src='${ProfileInfo.imgUrl}' alt='${ProfileInfo.name}'/> 
            <h3>${ProfileInfo.name}</h3>
            <h4>Price: ${ProfileInfo.price}</h4>
            ${btnHtml} 
        </div>
    `
}

const updatePainting = (id) => {  
    window.location.href = `/addPainting.html?id=${id}`; 
}

const buyPainting = (buyItLink) => {  
    window.open(buyItLink); 
}



const getPaintings = () => {
    axios.get("/api/paintings")
        .then((res) => {
            const data1 = res.data;
            renderPaintings(res.data);
    });
};

const renderPaintings = (painting) => { 

    painting.forEach(painting => {
        let cardHtml = makePaintingCardDisplay(painting)
        profileInfo.innerHTML += cardHtml
    })
}
 
getPaintings();

if(isAdmin){
    addPaintingLink.classList.remove('hide'); 
    homeLink.href = './?isAdmin=true';
    myPaintingLink.href = './myPaintings.html?isAdmin=true';
}