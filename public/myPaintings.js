const profileInfo = document.querySelector('#paintingCards')

console.log("- myPaintings js file - ")
 

const makePaintingCardDisplay = (ProfileInfo) => {
    return `
        <div class=""> 
        <h3>${ProfileInfo.name}</h3>
        <h4>Price: ${ProfileInfo.price}</h4>
        <img src='${ProfileInfo.imgUrl}' alt='${ProfileInfo.name}'/> 
        </div>
    `
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

// profileDetailsBtn.addEventListener('click',getProfileDetails)
getPaintings();