const profileDetailsBtn = document.querySelector('#profile-details')
const profileInfo = document.querySelector('#profileInfo')

const urlParams = new URLSearchParams(location.search);
const isAdmin = urlParams.get('isAdmin')  

const getProfileDetails = () => {
    console.log("- getProfileDetails - ")
    axios.get("/api/profileDetails")
        .then((res) => {
            const data1 = res.data;
            console.log("- profileDetails -", data1)
            profileInfo.innerHTML = makeProfileInfoDisplay(res.data);
    });
};


const makeProfileInfoDisplay = (profileInfo) => {
    const description = profileInfo.aboutMe.map((el) => `<p>${el}</p>`).join('')

    return `
        <div class=""> 
        <h3>${profileInfo.name}</h3>
        <h4>${profileInfo.address}</h4>
        ${description}
        </div>
    `
}

const getPaintings = () => {
    axios.get("/api/paintings")
        .then((res) => {
            const data1 = res.data;
            alert(data1);
    });
};

const addPainting = () => {
    axios.post("/api/painting", { name, imgUrl, buyItLink, price: inputCreate.value })
    .then(res => {
        const data = res.data;
        inputCreate.value = '';
        alert(data);
        getPaintings();
    });
};
 
getProfileDetails();

if(isAdmin){
    addPaintingLink.classList.remove('hide'); 
    homeLink.href = './?isAdmin=true';
    myPaintingLink.href = './myPaintings.html?isAdmin=true';
}