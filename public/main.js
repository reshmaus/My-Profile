const profileDetailsBtn = document.querySelector('#profile-details')
const profileInfo = document.querySelector('#profileInfo')

console.log("- main js file - ")

const getProfileDetails = () => {
    console.log("- getProfileDetails - ")
    axios.get("/api/profileDetails")
        .then((res) => {
            const data1 = res.data;
            console.log("- profileDetails -", data1)
            profileInfo.innerHTML = makeProfileInfoDisplay(res.data);
    });
};


const makeProfileInfoDisplay = (ProfileInfo) => {
    return `
        <div class=""> 
        <h3>${ProfileInfo.name}</h3>
        <h4>Health: ${ProfileInfo.address}</h4>
        <p>Attack 1: ${ProfileInfo.aboutMe} damage</p> 
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

// profileDetailsBtn.addEventListener('click',getProfileDetails)
getProfileDetails();