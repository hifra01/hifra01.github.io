const navButton = document.getElementById("nav-button")
navButton.onclick = () => {
    navDrawer = document.getElementById("nav-drawer")
    navDrawer.classList.toggle("open")
}