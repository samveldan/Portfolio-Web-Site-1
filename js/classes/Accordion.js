export default class Accordion {
    constructor(titles) {
        this.titles = titles;

        this.titles.forEach((item) => {
            item.addEventListener("click", function() {
                const accord_p = item.nextElementSibling;
                const accord_span = item.querySelector("span");

                accord_p.classList.toggle("active");
                accord_span.classList.toggle("active");
                item.classList.toggle("active");

                if (item.classList.contains("active")) {
                    accord_p.style.maxHeight = accord_p.scrollHeight + "px";
                } else {
                    accord_p.style.maxHeight = 0;
                }
            })
        })
    }
}