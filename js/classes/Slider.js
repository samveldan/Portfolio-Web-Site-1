export default class Slider {
    constructor(slider, arrows) {
        this.slider = slider;
        this.arrows = arrows;

        let width = 0

        this.arrows.forEach((item) => {
            item.addEventListener("click", () => {
                const active_slide = this.slider.querySelector(".slide.active");
                const first__slide = this.slider.querySelector(".slide:first-child");
                const last__slide = this.slider.querySelector(".slide:last-child");
                const amount_of_slides = this.slider.querySelectorAll(".slide").length - 1;

                if (item.classList.contains("intro__arrow_left")) {
                    if (active_slide.previousElementSibling) {
                        width -= this.slider.offsetWidth;
                        active_slide.previousElementSibling.classList.add("active");
                    } else {
                        last__slide.classList.add("active");
                        width = amount_of_slides * (this.slider.offsetWidth);
                    }
                } else {
                    if (active_slide.nextElementSibling) {
                        width += this.slider.offsetWidth;
                        active_slide.nextElementSibling.classList.add("active");
                    } else {
                        first__slide.classList.add("active");
                        width = 0;
                    }
                }

                this.slider.style.left = -width + "px";
                active_slide.classList.remove("active");
            })

        })
    }
}