const trackImagesElem = document.querySelector(".track__images");
const trackImageTypeIcon = document.querySelector(".track__image-type-icon");
const trackButtonPrev = document.querySelector(".track__button_type_prev");
const trackButtonNext = document.querySelector(".track__button_type_next");
const paginatorButtons = document.querySelectorAll(".paginator__item");
const highwayBikeList = document.querySelector(".bikes__bike-list[data-track='highway']");
const gravelBikeList = document.querySelector(".bikes__bike-list[data-track='gravel']");
const ttBikeList = document.querySelector(".bikes__bike-list[data-track='tt']");
const bikesTypeSelect = document.querySelector(".bikes__type-select");
const highwayBikeTab = document.querySelector(".bikes__type")
const bikes = document.querySelectorAll(".bikes__bike-container");
const bikeTabs = document.querySelectorAll(".bikes__type");
const footerForm = document.querySelector(".footer__form");
const footerSubmit = footerForm.submit;
const headerMenuToggleButton = document.querySelector(".header__menu-toggle");
const menu = document.querySelector(".menu");
const menuLinks = document.querySelectorAll(".menu__link");
const switcherCheckboxes = document.querySelectorAll(".switcher__checkbox");

let trackCurrentAction = "";
let currentTrack = "highway";
let currentBikeTrack = "highway";
let currentBikePageId = 0;
let touchStartX = 0;
let touchEndX = 0;
let isSwiping = false;
let lastWidth = window.innerWidth;
const maxBikePageId = paginatorButtons.length - 1;

const switchBikes = () => {
    if(window.innerWidth > 679) return;
    bikes.forEach(bikeContainer => {
        if(window.innerWidth > 574) {
            bikeContainer.style.transform = `translateX(-${(380 + 30) * currentBikePageId}px)`;
        } else {
            bikeContainer.style.transform = `translateX(-${(284 + 30) * currentBikePageId}px)`;
        }
    });
}

const toggleTheme = () => {
    const page = document.querySelector(".page");
    const switcherButtons = document.querySelectorAll(".switcher__pseudo-item");
    const switcherWrappers = document.querySelectorAll(".switcher__wrapper");
    const header = document.querySelector(".header");
    const headerLinks = document.querySelectorAll(".header__link");
    const sections = document.querySelectorAll(".section");
    const sectionTitles = document.querySelectorAll(".section__title");
    const sectionDescriptions = document.querySelectorAll(".section__description");
    const leadBikeTitle = document.querySelector(".lead__bike-title");
    const eddieSection = document.querySelector(".eddie");
    const eddieQuoteText = document.querySelector(".eddie__quote-text");
    const eddieAuthorName = document.querySelector(".eddie__author-name");
    const eddieAuthorOccupation = document.querySelector(".eddie__author-occupation");
    const bikesSection = document.querySelector(".bikes");
    const bikeHeadings = document.querySelectorAll(".bikes__bike-heading");
    const trackSection = document.querySelector(".track");
    const trackButtons = document.querySelectorAll(".track__button");
    const trainingSection = document.querySelector(".training");
    const trainingLinks = document.querySelectorAll(".training__link");
    const footer = document.querySelector(".footer");
    const footerTitle = footer.querySelector(".footer__title");
    const footerAbout = footer.querySelector(".footer__about");
    const footerInput = footer.querySelector(".footer__input");
    const footerCopyright = footer.querySelector(".footer__copyright");
    page.classList.toggle("page_theme_dark");
    header.classList.toggle("header_theme_dark");
    headerLinks.forEach(headerLink => headerLink.classList.toggle("header__link_theme_dark"));
    headerMenuToggleButton.classList.toggle("header__menu-toggle_theme_dark");
    menu.classList.toggle("menu_theme_dark");
    menuLinks.forEach(menuLink => menuLink.classList.toggle("menu__link_theme_dark"));
    switcherWrappers.forEach(button => button.classList.toggle("switcher__wrapper_theme_dark"));
    switcherButtons.forEach(button => button.classList.toggle("switcher__pseudo-item_theme_dark"));
    sections.forEach(section => section.classList.toggle("section_theme_dark"));
    sectionTitles.forEach(title => title.classList.toggle("section__title_theme_dark"));
    sectionDescriptions.forEach(description => description.classList.toggle("section__description_theme_dark"));
    leadBikeTitle.classList.toggle("lead__bike-title_theme_dark");
    eddieSection.classList.toggle("eddie_theme_dark");
    eddieQuoteText.classList.toggle("eddie__quote-text_theme_dark");
    eddieAuthorName.classList.toggle("eddie__author-name_theme_dark");
    eddieAuthorOccupation.classList.toggle("eddie__author-occupation_theme_dark");
    trackSection.classList.toggle("track_theme_dark");
    trackButtons.forEach(button => button.classList.toggle("track__button_theme_dark"));
    bikesSection.classList.toggle("bikes_theme_dark");
    bikeHeadings.forEach(heading => heading.classList.toggle("bikes__bike-heading_theme_dark"));
    bikeTabs.forEach(tab => tab.classList.toggle("bikes__type_theme_dark"));
    bikesTypeSelect.classList.toggle("bikes__type-select_theme_dark");
    trainingSection.classList.toggle("training_theme_dark");
    trainingLinks.forEach(link => link.classList.toggle("training__link_theme_dark"));
    paginatorButtons.forEach(button => button.classList.toggle("paginator__item_theme_dark"));
    footer.classList.toggle("footer_theme_dark");
    footerTitle.classList.toggle("footer__title_theme_dark");
    footerAbout.classList.toggle("footer__about_theme_dark");
    footerCopyright.classList.toggle("footer__copyright_theme_dark");
    footerInput.classList.toggle("footer__input_theme_dark");
}

const toggleMenu = () => {
    menu.classList.toggle("menu_active");
    headerMenuToggleButton.classList.toggle("header__menu-toggle_active");
}

const closeMenu = () => {
    menu.classList.remove("menu_active");
    headerMenuToggleButton.classList.remove("header__menu-toggle_active");
}

const switchBikeTrack = () => {
    bikeTabs.forEach(tab => tab.classList.remove("bikes__type_active"));
    const [highwayBikeTab, gravelBikeTab, ttBikeTab] = bikeTabs;
    switch(currentBikeTrack) {
        case "highway":
            highwayBikeList.classList.add("bikes__bike-list_active");
            gravelBikeList.classList.remove("bikes__bike-list_active");
            ttBikeList.classList.remove("bikes__bike-list_active");
            highwayBikeTab.classList.add("bikes__type_active");
            bikesTypeSelect.value = "highway";
            break;
        case "gravel":
            highwayBikeList.classList.remove("bikes__bike-list_active");
            gravelBikeList.classList.add("bikes__bike-list_active");
            ttBikeList.classList.remove("bikes__bike-list_active");
            gravelBikeTab.classList.add("bikes__type_active");
            bikesTypeSelect.value = "gravel";
            break;
        case "tt":
            highwayBikeList.classList.remove("bikes__bike-list_active");
            gravelBikeList.classList.remove("bikes__bike-list_active");
            ttBikeList.classList.add("bikes__bike-list_active");
            ttBikeTab.classList.add("bikes__type_active");
            bikesTypeSelect.value = "tt";
            break;
    }
    currentBikePageId = 0;
    paginatorButtons.forEach(button => button.classList.remove("paginator__item_active"));
    paginatorButtons[currentBikePageId].classList.add("paginator__item_active");
    switchBikes();
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
    switchBikes();
}

bikeTabs.forEach((bikeTab) => {
    bikeTab.addEventListener("click", () => {
        currentBikeTrack = bikeTab.dataset.type;
        switchBikeTrack();
    });
});

bikesTypeSelect.addEventListener("change", () => {
    currentBikeTrack = bikesTypeSelect.value;
    switchBikeTrack();
});

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
    switchBikes();
    setTimeout(() => {
        bikes.forEach(bikeContainer => bikeContainer.style.transition = "transform .4s linear .2s");
    },400);
});

[highwayBikeList, gravelBikeList, ttBikeList].forEach((bikeList) => {
    bikeList.addEventListener("touchstart", e => {
        e.stopImmediatePropagation();
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    bikeList.addEventListener("touchend", e => {
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
                switchBikes(highwayBikeList);
                break;
            case "gravel":
                switchBikes(gravelBikeList);
                break;
            case "tt":
                switchBikes(ttBikeList);
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
            prevTrackImage1.alt = "Асфальтная дорога в поле";
            prevTrackImage2.alt = "Асфальтная дорога в поле";
            currentTrackImage.alt = "Асфальтная дорога в горах";
            nextTrackImage.alt = "Дорога в лесу";
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
            prevTrackImage1.alt = "Асфальтная дорога в горах";
            prevTrackImage2.alt = "Асфальтная дорога в горах";
            currentTrackImage.alt = "Дорога в лесу";
            nextTrackImage.alt = "Асфальтная дорога в поле";
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
            prevTrackImage1.alt = "Дорога в лесу";
            prevTrackImage2.alt = "Дорога в лесу";
            currentTrackImage.alt = "Асфальтная дорога в поле";
            nextTrackImage.alt = "Асфальтная дорога в горах";
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

// Предотвращает скрытие кнопки "ок" при попытке нажать на нее
footerSubmit.addEventListener("mousedown", e => {
    e.preventDefault();
});

footerForm.addEventListener("submit", e => {
    e.preventDefault();
    console.log("submit");
    const footerInput = footerForm.email;
    footerInput.disabled = true;
    footerInput.value = "Круто!";
    footerSubmit.style.display = "none";
});

headerMenuToggleButton.addEventListener("click", () => {
    toggleMenu();
});

menuLinks.forEach(link => {
    link.addEventListener("click", () => {
        closeMenu();
    });
});

switcherCheckboxes.forEach(checkbox => {
    checkbox.addEventListener("change", () => {
        toggleTheme();
    })
})