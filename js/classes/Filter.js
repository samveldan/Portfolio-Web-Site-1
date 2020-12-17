export default class Filter {
    constructor(slides, btns) {
        this.slides = slides;
        this.btns = btns;

        this.btns.forEach((btn) => {
            btn.addEventListener("click", () => {
                const data_btn = btn.dataset["btn"];

                this.delActiveBtns();
                btn.classList.add("active");

                this.hideNonActiveSlides(data_btn);
            })
        })
    }

    delActiveBtns() {
        this.btns.forEach((btn) => {
            btn.classList.remove("active");
        })
    }

    hideNonActiveSlides(data) {
        this.slides.forEach((slide) => {
            if (slide.dataset["work"] != data && data != "all") {
                slide.classList.add("anime");
            } else {
                slide.classList.remove("anime");
                slide.classList.remove("hide");
            }
        })
        this.slides.forEach((slide) => {
            slide.addEventListener("transitionend", () => {
                if (slide.classList.contains("anime")) {
                    slide.classList.add("hide");
                }
            })
        })
    }
}