// Everytime a new view is rendered, the new view refreshes to the top of the page. 

// Event listener used to constantly get scroll Y position. This value is set in localstorage to persist across loading a new page

// This script loads any new view at the previous scroll y position, so it's seemless

// https://stackoverflow.com/questions/26112503/scroll-to-same-position-on-reload-and-load

document.addEventListener('scroll', (e) => {
    currentScrollPosition = window.scrollY;
    // console.log(currentScrollPosition);
    localStorage.setItem("currentScrollPosition", currentScrollPosition);
});


window.onload = () => {
    const reloadScrollPosition = localStorage.getItem("currentScrollPosition");
    // console.log("window onload function executing"); 
    window.scroll(0, reloadScrollPosition);
}