const trackImagesElem = document.querySelector(".track__images");
const trackImageTypeIcon = document.querySelector(".track__image-type-icon");
const trackButtonPrev = document.querySelector(".track__button_type_prev");
const trackButtonNext = document.querySelector(".track__button_type_next");
const paginatorButtons = document.querySelectorAll(".paginator__item");
const highwayBikeList = document.querySelector(".bikes__bike-list[data-track='highway']");
const gravelBikeList = document.querySelector(".bikes__bike-list[data-track='gravel']");
const ttBikeList = document.querySelector(".bikes__bike-list[data-track='highway']");
const bikes = document.querySelectorAll(".bikes__bike-container");

let trackCurrentAction = "";
let currentTrack = "highway";
let currentBikeTrack = "highway";
let currentBikePageId = 0;
let touchStartX = 0;
let touchEndX = 0;
let isSwiping = false;
let lastWidth = window.innerWidth;
const maxBikePageId = paginatorButtons.length - 1;

const switchBikePages = () => {
    if(window.innerWidth > 679) return;
    bikes.forEach(bikeContainer => {
        if(window.innerWidth > 574) {
            bikeContainer.style.transform = `translateX(-${(380 + 30) * currentBikePageId}px)`;
        } else {
            bikeContainer.style.transform = `translateX(-${(284 + 30) * currentBikePageId}px)`;
        }
    });
}

const handleSwipe = () => {
    if(window.innerWidth > 679) return;
    if(touchStartX < touchEndX && currentBikePageId > 0) {
        currentBikePageId--;
    } else if(touchStartX > touchEndX && currentBikePageId < maxBikePageId) {
        currentBikePageId++;
    }
    paginatorButtons.forEach(button => button.classList.remove("paginator__item_active"));
    paginatorButtons[currentBikePageId].classList.add("paginator__item_active");
    switchBikePages();
}

window.addEventListener("resize", () => {
    bikes.forEach(bikeContainer => {
        if(window.innerWidth > 679) {
            bikeContainer.removeAttribute("style");
        }

        if((lastWidth > 574 && window.innerWidth <= 574) || (lastWidth <= 574 && window.innerWidth > 574)) {
            bikeContainer.style.transition = "none";
        }
    });
    lastWidth = window.innerWidth;
    switchBikePages();
    setTimeout(() => {
        bikes.forEach(bikeContainer => bikeContainer.style.transition = "transform .4s linear .2s");
    },400);
});

[highwayBikeList, gravelBikeList, ttBikeList].forEach((bikeList) => {
    bikeList.addEventListener("touchstart", e => {
        e.preventDefault();
        e.stopImmediatePropagation();
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    bikeList.addEventListener("touchend", e => {
        e.preventDefault();
        e.stopImmediatePropagation();
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
});

for(let i = 0; i < paginatorButtons.length; i++) {
    paginatorButtons[i].addEventListener("click", () => {
        paginatorButtons.forEach(button => {
            button.classList.remove("paginator__item_active");
        });
        currentBikePageId = i;
        paginatorButtons[i].classList.add("paginator__item_active");
        switch(currentBikeTrack) {
            case "highway":
                switchBikePages(highwayBikeList);
                break;
            case "gravel":
                switchBikePages(gravelBikeList);
                break;
            case "tt":
                switchBikePages(ttBikeList);
                break;
        }
    });
}

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
    const trackTitleHighway = document.querySelector(".track__title_type_highway");
    const trackDescriptionHighway = document.querySelector(".track__description_type_highway");
    const trackTitleGravel = document.querySelector(".track__title_type_gravel");
    const trackDescriptionGravel = document.querySelector(".track__description_type_gravel");
    const trackTitleTT = document.querySelector(".track__title_type_tt");
    const trackDescriptionTT = document.querySelector(".track__description_type_tt");
    switch(currentTrack) {
        case "highway":
            prevTrackImage1.src = "./images/tt.png";
            prevTrackImage2.src = "./images/tt.png";
            currentTrackImage.src = "./images/highway.png";
            nextTrackImage.src = "./images/gravel.png";
            trackTitleHighway.classList.add("track__title_active");
            trackDescriptionHighway.classList.add("track__description_active");
            trackTitleGravel.classList.remove("track__title_active");
            trackDescriptionGravel.classList.remove("track__description_active");
            trackTitleTT.classList.remove("track__title_active");
            trackDescriptionTT.classList.remove("track__description_active");
            break;
        case "gravel":
            prevTrackImage1.src = "./images/highway.png";
            prevTrackImage2.src = "./images/highway.png";
            currentTrackImage.src = "./images/gravel.png";
            nextTrackImage.src = "./images/tt.png";
            trackTitleHighway.classList.remove("track__title_active");
            trackDescriptionHighway.classList.remove("track__description_active");
            trackTitleGravel.classList.add("track__title_active");
            trackDescriptionGravel.classList.add("track__description_active");
            trackTitleTT.classList.remove("track__title_active");
            trackDescriptionTT.classList.remove("track__description_active");
            trackImageTypeIcon.src = "./images/track-type-icon-gravel.svg";
            break;
        case "tt":
            prevTrackImage1.src = "./images/gravel.png";
            prevTrackImage2.src = "./images/gravel.png";
            currentTrackImage.src = "./images/tt.png";
            nextTrackImage.src = "./images/highway.png";
            trackTitleHighway.classList.remove("track__title_active");
            trackDescriptionHighway.classList.remove("track__description_active");
            trackTitleGravel.classList.remove("track__title_active");
            trackDescriptionGravel.classList.remove("track__description_active");
            trackTitleTT.classList.add("track__title_active");
            trackDescriptionTT.classList.add("track__description_active");
            trackImageTypeIcon.src = "./images/track-type-icon-tt.svg";
            break;
    }
    trackImageTypeIcon.classList.remove("track__image-type-icon_hidden");
});
