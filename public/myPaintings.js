const paintingContainerDiv = document.querySelector('#paintingCards')     
paintingContainerDiv.innerHTML = '<div class="loading">Loading....</div>'
// This will change based on which profile we choose, For now its fetched from cookies 
const profileId = getCookie('profileId')

// Api call to get all paintings 
const getPaintings = () => {
    axios.get(`/api/paintings/${profileId}`)
        .then((res) => {
            const data1 = res.data;
            renderPaintings(res.data);
    });
};

// Renders/ appends the painting cards on to page.
const renderPaintings = (painting) => { 
    paintingContainerDiv.innerHTML = '';

    painting.forEach(painting => {
        let cardHtml = makePaintingCardDisplay(painting)
        paintingContainerDiv.innerHTML += cardHtml
    })
}

// Build html painting card to render on page, with painting details
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

// On Card painting image click handler
const viewPdp = (id) => {  
    if(isAdmin){
        window.location.href = `/painting.html?id=${id}&isAdmin=true`;  
    } else { 
        window.location.href = `/painting.html?id=${id}`; 
    }
}

// On Card update button click handler 
const updatePainting = (id) => {  
    if(isAdmin){
        window.location.href = `/painting.html?id=${id}&isAdmin=true`;  
    } else { 
        window.location.href = `/painting.html?id=${id}`; 
    }
}

// On Card buy button click handler
const buyPainting = (buy_it_link) => {  
    window.open(buy_it_link); 
}  

// Open call method, on js load
getPaintings(); 