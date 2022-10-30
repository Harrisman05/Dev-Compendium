function auto_resize_textareas() {
    const textareas = document.getElementsByTagName("textarea");

    for (const textarea of textareas) {
        textarea.style.csstext = `height: ${textarea.scrollHeight}px; overflow-y: hidden`;
        textarea.addEventListener("input", function () {
            this.style.height = "auto";
            this.style.height = `${this.scrollHeight}px`;
        });
    }
}

window.onload = () => {
    const textareas = document.getElementsByTagName("textarea");

    for (const textarea of textareas) {
        textarea.style.csstext = `height: ${textarea.scrollHeight}px; overflow-y: hidden`;
        textarea.style.height = "auto";
        textarea.style.height = `${this.scrollHeight}px`;
    }
}

auto_resize_textareas();
