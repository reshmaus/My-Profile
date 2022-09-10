const profileInfo = document.querySelector('#paintingCards') 
const addPaintingLink = document.querySelector('#addPaintingLink')   
const myPaintingLink = document.querySelector('#myPaintingLink')     
const homeLink = document.querySelector('#homeLink')    

const urlParams = new URLSearchParams(location.search);
const isAdmin = urlParams.get('isAdmin') 
 
const makePaintingChoiceCard = (ProfileInfo) => {
    return `
        <div class="paintingCards outline"> 
        <img src='${ProfileInfo.img_url}' alt='${ProfileInfo.name}'/> 
        <h3>${ProfileInfo.name}</h3>
        <h4>Price: ${ProfileInfo.price}</h4>
         </div>
    `
}

const makePaintingCardDisplay = (painting) => {
    let btnHtml = `<button class="buyBtn" onclick=buyPainting('${painting.buy_it_link}')> Buy </button>`;

    if(isAdmin){
        btnHtml = `<button class="updateBtn" onclick=updatePainting(${painting.id})> Update </button>`;
    }

    return `
        <div class="paintingCards outline"> 
            <div class="cardImgContainer">
                <img class="cardImg" src='${painting.img_url}' alt='${painting.name}'/> 
            </div>
            <div class="cardBelowContainer">
                <h3>${painting.name}</h3>
                <h4>Price: ${painting.price}</h4>
                ${btnHtml} 
            </div>
        </div>
    `
}

const updatePainting = (id) => {  
    if(isAdmin){
        window.location.href = `/addPainting.html?id=${id}&isAdmin=true`;  
    } else { 
        window.location.href = `/addPainting.html?id=${id}`; 
    }
}

const buyPainting = (buy_it_link) => {  
    window.open(buy_it_link); 
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