const videoElement = document.getElementById('video');
const button = document. getElementById('button');

//Prompt tp select a medaia stream and pass to video to play
async function selectMediaStream() {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {
            videoElement.play();
        };
    } catch (error) {
        //Error message
    }
}

button.addEventListener('click', async () => {
    //Disable Button
    button.disabled = true;
    //Start picture in picture
    await videoElement.requestPictureInPicture();
    //Reset button
    button.disabled = false;
});