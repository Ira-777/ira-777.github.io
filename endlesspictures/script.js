//Helper function to set attributes on DOM
function setAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

//Unsplash API
let count = 5;
const apiKey ='TC4ubnhxytms0ZiEas_50G_fR9rgK_D2YFzfkqX68C8';
let apiUrl =`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Check if all images were loaded
function imageLoaded() {    
    imagesLoaded++;    
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;         
        count =  30;   
    }
}

//Create elements for links and photos
function displayPhotos () {
    imagesLoaded = 0;
    totalImages = photosArray.length;    
    photosArray.forEach((photo) => {
        //Link from Unsplash
        const item = document.createElement('a');        
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        const img = document.createElement('img');
            setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_decription,
        });
        //Event listener checking if finished loading
        img.addEventListener('load', imageLoaded);
        //Put image inside container
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

//Getting photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos ();
    } catch (error) {
        //  Error message
    }
}

//Check if scroll is close to the bottom
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})
getPhotos();
