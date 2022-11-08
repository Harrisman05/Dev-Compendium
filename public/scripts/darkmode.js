let darkMode = localStorage.getItem('darkMode');
const darkModeToggle = document.getElementById("darkmode_button");
const noteboxes = document.querySelectorAll(".notebox");

const enableDarkMode = () => {
    document.body.classList.add('darkmode');

    noteboxes.forEach((notebox) => {
        notebox.style.backgroundImage = "url('/assets/static_images/white_notebook_snip_resize2_darkmode_lines2.png')";
    })


    localStorage.setItem('darkMode', 'enabled');
    console.log('Darkmode enabled');
    
}

const disableDarkMode = () => {
    document.body.classList.remove('darkmode');

    noteboxes.forEach((notebox) => {
        notebox.style.backgroundImage = "url('/assets/static_images/white_notebook_snip_resize2.jpg')";
    })

    localStorage.setItem('darkMode', null);
    console.log('Darkmode disabled');
}


if (darkMode === 'enabled') {
    enableDarkMode();
}

darkModeToggle.addEventListener('click', () => {

    darkMode = localStorage.getItem('darkMode');
    
    if (darkMode !== 'enabled') {
        enableDarkMode();
    } else {
        disableDarkMode();
    }


})

