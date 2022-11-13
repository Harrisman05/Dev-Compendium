let notebox_links = document.querySelectorAll(".notebox #notebox_content a");
// console.log(notebox_links);

for (let i = 0; i < notebox_links.length; i++) {
    if (notebox_links[i] != window.location.hostname) {
        notebox_links[i].target = '_blank';
    }
}

