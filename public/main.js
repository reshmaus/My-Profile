const profileInfoDiv = document.querySelector('#profileInfo')
const socialMediaDiv = document.querySelector('#socialMedia')

const urlParams = new URLSearchParams(location.search);
const isAdmin = urlParams.get('isAdmin')   

// To get profile details Api call and rendering content on page
const getProfileDetails = () => { 
    axios.get(`/api/profileDetails`)
        .then((res) => {
            const profileInfo = res.data; 
            
            // This condition is required, As this Js file is used by all other page's and only on home page have the Div to render the profile details.
            if(profileInfoDiv){
                profileInfoDiv.innerHTML = makeProfileInfoDisplay(profileInfo);
            }

            // This will change based on which profile we choose, For now hard coding to demo, to pass data between pages
            setCookie('profileId', profileInfo.profileId)

            // Render footer content 
            socialMediaDiv.innerHTML = res.data.socialPlatforms.map((socialPlatform) => `<a class="margin15" href="${socialPlatform.url}"> ${socialPlatform.mode}</a>`).join('')
    });
};

// Build the profile Html to render on page, with profile info api response data
const makeProfileInfoDisplay = (profileInfo) => {
    const description = profileInfo.aboutMe.map((el) => `<p class="margin15">${el}</p>`).join('')
    
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

// Open call method, on js load
getProfileDetails();

if(isAdmin){
    addPaintingLink.classList.remove('hide'); 
    homeLink.href = './?isAdmin=true';
    myPaintingLink.href = './myPaintings.html?isAdmin=true';
    addPaintingLink.href = './painting.html?isAdmin=true';
}