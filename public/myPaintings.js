const paintingContainer = document.querySelector('#paintingCards')     
paintingContainer.innerHTML = '<div class="loading">Loading....</div>'
// This will change based on which profile we choose, For now set in cookie 
const idProfile = getCookie('profileId')

const makePaintingChoiceCard = (painting) => {
    return `
        <div class="paintingCards outline"> 
            <img src='${ProfileInfo.img_url}' alt='${painting.name}'/> 
            <h3>${painting.name}</h3>
            <h4>Price: ${painting.price}</h4>
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
                <img class="cardImg" onclick="viewPdp(${painting.id})" src='${painting.img_url}' alt='${painting.name}'/> 
            </div>
            <div class="cardBelowContainer">
                <h3>${painting.name}</h3>
                <h4>Price: ${painting.price}</h4>
                ${btnHtml} 
            </div>
        </div>
    `
}

const viewPdp = (id) => {  
    if(isAdmin){
        window.location.href = `/painting.html?id=${id}&isAdmin=true`;  
    } else { 
        window.location.href = `/painting.html?id=${id}`; 
    }
}

const updatePainting = (id) => {  
    if(isAdmin){
        window.location.href = `/painting.html?id=${id}&isAdmin=true`;  
    } else { 
        window.location.href = `/painting.html?id=${id}`; 
    }
}

const buyPainting = (buy_it_link) => {  
    window.open(buy_it_link); 
} 

const getPaintings = () => {
    axios.get(`/api/paintings/${idProfile}`)
        .then((res) => {
            const data1 = res.data;
            renderPaintings(res.data);
    });
};

const renderPaintings = (painting) => { 
    paintingContainer.innerHTML = '';
    painting.forEach(painting => {
        let cardHtml = makePaintingCardDisplay(painting)
        paintingContainer.innerHTML += cardHtml
    })
}
 
getPaintings(); 