export default class ClientsSlider {
    constructor(slider) {
        this.slider = slider;
        this.slides = slider.querySelectorAll(".clients__slide");
        this.btns = slider.nextElementSibling.querySelectorAll("span");

        this.getHightOnce();

        this.current_pos = 0;
        this.move_mouse = false;

        this.slider.addEventListener("touchstart", (e) => {
            this.current_pos = e.touches[0].pageX;
            this.move_mouse = true;
        })

        this.slider.addEventListener("touchmove", (e) => {
            if (this.move_mouse) {
                if ((this.current_pos - 70) > e.touches[0].pageX) this.swipeSlide("right");
                else if ((this.current_pos + 70) < e.touches[0].pageX) this.swipeSlide("left");
            }
        })

        window.addEventListener("resize", () => {
            this.btns.forEach((btn) => {
                if (btn.classList.contains("active")) {
                    const data_btn = btn.dataset.slide;

                    this.showSlide(data_btn);
                }
            })
        })

        this.btns.forEach((btn) => {
            btn.addEventListener("click", () => {
                this.resetBtns();
                btn.classList.add("active");
                const data_btn = btn.dataset.slide;

                this.showSlide(data_btn);
            })
        })
    }

    swipeSlide(where) {
        const btn = this.slider.nextElementSibling.querySelector("span.active");
        if (btn.classList.contains("active")) {
            const first_btn = this.btns[0];
            const last_btn = this.btns[this.btns.length - 1];
            const next_btn = btn.nextElementSibling;
            const prev_btn = btn.previousElementSibling;
            this.resetBtns();

            if (where == "left") {
                if (prev_btn) prev_btn.classList.add("active");
                else last_btn.classList.add("active");
            } else if (where == "right") {
                if (next_btn) next_btn.classList.add("active");
                else first_btn.classList.add("active");
            }

            this.showSlide(btn.dataset.slide);
        }
        this.move_mouse = false;
    }

    showSlide(data) {
        this.slides.forEach((slide) => {
            if (slide.dataset.slide == data) {
                slide.classList.add("active");
                this.slider.style.height = slide.scrollHeight + "px";
            } else {
                slide.classList.remove("active");
            }
        })
    }

    getHightOnce() {
        this.btns.forEach((btn) => {
            if (btn.classList.contains("active")) {
                const data_btn = btn.dataset.slide;

                this.showSlide(data_btn);
            }
        })
    }

    resetBtns() {
        this.btns.forEach((btn) => {
            btn.classList.remove("active");
        })
    }
}