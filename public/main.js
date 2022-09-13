const profileDetailsBtn = document.querySelector('#profile-details')
const profileInfo = document.querySelector('#profileInfo')
const socialMedia = document.querySelector('#socialMedia')

const urlParams = new URLSearchParams(location.search);
const isAdmin = urlParams.get('isAdmin')  

// This will change based on which profile we choose, For now hard coding to demo
// window.profileId = 0;

const getProfileDetails = () => {
    console.log("- getProfileDetails - ")
    axios.get(`/api/profileDetails`)
        .then((res) => {
            const data1 = res.data; 
            if(profileInfo){
                profileInfo.innerHTML = makeProfileInfoDisplay(res.data);
            }
            // Render footer content 
            socialMedia.innerHTML = res.data.socialPlatforms.map((socialPlatform) => `<a class="margin15" href="${socialPlatform.url}"> ${socialPlatform.mode}</a>`).join('')
    });
};


const makeProfileInfoDisplay = (profileInfo) => {
    const description = profileInfo.aboutMe.map((el) => `<p class="margin15">${el}</p>`).join('')
    setCookie('profileId', profileInfo.profileId)
    return `
        <div class=""> 
            <h1>${profileInfo.name}</h1> 
            <h2>${profileInfo.profileTitle}</h2> 
            <h4>${profileInfo.address}</h4>
            <div class="profileDescriptionContainer">
                ${description}
            </div>
        </div> 
    `
} 
 
getProfileDetails();

if(isAdmin){
    addPaintingLink.classList.remove('hide'); 
    homeLink.href = './?isAdmin=true';
    myPaintingLink.href = './myPaintings.html?isAdmin=true';
    addPaintingLink.href = './painting.html?isAdmin=true';
}