let mainArtImage = document.querySelector(".art-img");
let menuBtn = document.querySelector("#menu-btn")
let rightMenuBar = document.querySelector(".right-menu-bar")
let closeMenuBtn = document.querySelector("#close-menu-btn")
let darkBack = document.querySelector(".dark-back")

// if (window.screen.width < 625) {
//     mainArtImage.setAttribute("src", "assets/images/image-web-3-mobile.jpg")
// } else {
//     mainArtImage.setAttribute("src", "assets/images/image-web-3-desktop.jpg")
// }


menuBtn.addEventListener("click", () => {
    rightMenuBar.style.display = "block"
    darkBack.style.display = "block"
})

closeMenuBtn.addEventListener("click", () => {
    rightMenuBar.style.display = "none"
    darkBack.style.display = "none"
})