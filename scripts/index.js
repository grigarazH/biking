const trackImagesElem = document.querySelector(".track__images");
const trackImageTypeIcon = document.querySelector(".track__image-type-icon");
const trackButtonPrev = document.querySelector(".track__button_type_prev");
const trackButtonNext = document.querySelector(".track__button_type_next");

let trackCurrentAction = "";
let currentTrack = "highway";

trackButtonPrev.addEventListener("click", () => {
    trackCurrentAction = "prev";
    switch(currentTrack) {
        case "highway":
            currentTrack = "tt";
            break;
        case "gravel":
            currentTrack = "highway";
            break;
        case "tt":
            currentTrack = "gravel";
            break;
    }
    trackImageTypeIcon.classList.add("track__image-type-icon_hidden");
    trackButtonPrev.disabled = true;
    trackButtonNext.disabled = true;
});

trackButtonNext.addEventListener("click", () => {
    trackCurrentAction = "next";
    switch(currentTrack) {
        case "highway":
            currentTrack = "gravel";
            break;
        case "gravel":
            currentTrack = "tt";
            break;
        case "tt":
            currentTrack = "highway";
            break;
    }
    trackImageTypeIcon.classList.add("track__image-type-icon_hidden");
    trackButtonPrev.disabled = true;
    trackButtonNext.disabled = true;
});

trackImageTypeIcon.addEventListener("transitionend", () => {
    switch(trackCurrentAction) {
        case "prev": 
            trackImagesElem.style.animation = "track-images-previous 2s";
            break;
        case "next":
            trackImagesElem.style.animation = "track-images-next 2s";
            break;
        default:
            trackImagesElem.style.animation = "";
            trackButtonPrev.disabled = false;
            trackButtonNext.disabled = false;
            return;
    }
});

trackImagesElem.addEventListener("animationend", () => {
    trackCurrentAction = "";
    const [prevTrackImage1, prevTrackImage2] = Array.from(document.querySelectorAll(".track__image_type_prev"));
    const currentTrackImage = document.querySelector(".track__image_type_current");
    const nextTrackImage = document.querySelector(".track__image_type_next");
    const trackAboutHighway = document.querySelector(".track__about_type_highway");
    const trackAboutGravel = document.querySelector('.track__about_type_gravel');
    const trackAboutTT = document.querySelector(".track__about_type_tt");
    switch(currentTrack) {
        case "highway":
            prevTrackImage1.src = "./images/tt.png";
            prevTrackImage2.src = "./images/tt.png";
            currentTrackImage.src = "./images/highway.png";
            nextTrackImage.src = "./images/gravel.png";
            trackAboutHighway.classList.add("track__about_active");
            trackAboutGravel.classList.remove("track__about_active");
            trackAboutTT.classList.remove("track__about_active");
            trackImageTypeIcon.src = "./images/track-type-icon-highway.svg";
            break;
        case "gravel":
            prevTrackImage1.src = "./images/highway.png";
            prevTrackImage2.src = "./images/highway.png";
            currentTrackImage.src = "./images/gravel.png";
            nextTrackImage.src = "./images/tt.png";
            trackAboutHighway.classList.remove("track__about_active");
            trackAboutGravel.classList.add("track__about_active");
            trackAboutTT.classList.remove("track__about_active");
            trackImageTypeIcon.src = "./images/track-type-icon-gravel.svg";
            break;
        case "tt":
            prevTrackImage1.src = "./images/gravel.png";
            prevTrackImage2.src = "./images/gravel.png";
            currentTrackImage.src = "./images/tt.png";
            nextTrackImage.src = "./images/highway.png";
            trackAboutHighway.classList.remove("track__about_active");
            trackAboutGravel.classList.remove("track__about_active");
            trackAboutTT.classList.add("track__about_active");
            trackImageTypeIcon.src = "./images/track-type-icon-tt.svg";
            break;
    }
    trackImageTypeIcon.classList.remove("track__image-type-icon_hidden");
});
