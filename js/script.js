import Slider from "./classes/Slider.js"
import Accordion from "./classes/Accordion.js"
import Filter from "./classes/Filter.js"
import ClientsSlider from "./classes/ClientsSlider.js"

/* Делаем Бургер-Меню */
const burger = document.querySelector(".burger");
const menu = document.querySelector(".header__menu");

burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    menu.classList.toggle("header__menu_active");
    document.body.classList.toggle("active");
});

/* Вызываем Интро Слайдер */
const intro__slider = document.querySelector(".intro__slider");
const intro__arrows = document.querySelectorAll(".intro__arrow");

const intro_slider = new Slider(intro__slider, intro__arrows);

/* Вызываем About Accordion */
const accord_items = document.querySelectorAll(".about__accordion-title");

const about__accordion = new Accordion(accord_items);

/* Вызываем Фильтр Портфолио */
const portf_works = document.querySelectorAll(".portfolio__work");
const portf_btns = document.querySelectorAll(".portfolio__menu li");

const portf_filter = new Filter(portf_works, portf_btns);

/* Вызываем Clients Слайдер */
const cls__slides = document.querySelector(".clients__slides");

const clients_slider = new ClientsSlider(cls__slides);

/* Бегущие цифры */
const skills_block = document.querySelector(".skills__wrapper");

window.addEventListener("scroll", function change_numbers(e) {
    const skills_top = skills_block.getBoundingClientRect().top;

    if (skills_top - window.innerHeight < -50) {
        window.removeEventListener("scroll", change_numbers);
        const skills_elements = document.querySelectorAll("span[data-perc]");

        skills_elements.forEach((elem) => {
            let num = Number(elem.innerHTML);
            let add_num = setInterval(() => {
                if (num != elem.dataset.perc) {
                    elem.innerHTML = ++num + "<span>%</span>";
                } else {
                    clearInterval(add_num);
                }
            }, 20)
        })
    }
})

/* Посты */
const blog_posts = document.querySelectorAll(".blog__post");
const blog_wrapper = document.querySelector(".blog__wrapper");
const arrow_down = document.querySelector(".arrow-down");
const arrow_up = document.querySelector(".arrow-up");

for (let i = 0; i < blog_posts.length; i++) {
    if (i == 0) blog_posts[i].classList.add("prev");
    if (i == 1) {
        blog_posts[i].classList.add("next");
        break;
    }
}

let amount_of_posts = 0;
let blog_height = 0;

blog_posts.forEach(post => {
    amount_of_posts++;
})

let prev_post = document.querySelector(".blog__post.prev");
let next_post = document.querySelector(".blog__post.next");
const blog_move = blog_wrapper.firstElementChild;
let move_amount = 0;

if (amount_of_posts > 2) {
    arrow_down.classList.add("active");
    blog_height = blog_posts[0].scrollHeight + blog_posts[1].scrollHeight;
    blog_wrapper.style.maxHeight = blog_height + "px";

}

arrow_down.addEventListener("click", () => {
    clearPosts();
    prev_post = prev_post.nextElementSibling;
    next_post = next_post.nextElementSibling;

    move_amount += next_post.scrollHeight;

    blog_move.style.top = -move_amount + "px";
    prev_post.classList.add("prev");
    next_post.classList.add("next");

    if (next_post.nextElementSibling == null) arrow_down.classList.remove("active");
    if (prev_post.previousElementSibling != null) arrow_up.classList.add("active");
})

arrow_up.addEventListener("click", () => {
    clearPosts();
    prev_post = prev_post.previousElementSibling;
    next_post = next_post.previousElementSibling;

    if (prev_post == blog_posts[0]) move_amount = 0
    else move_amount -= prev_post.scrollHeight;

    blog_move.style.top = -move_amount + "px";
    prev_post.classList.add("prev");
    next_post.classList.add("next");

    if (next_post.nextElementSibling != null) arrow_down.classList.add("active");
    if (prev_post.previousElementSibling == null) arrow_up.classList.remove("active");
})

function clearPosts() {
    blog_posts.forEach(post => {
        post.classList.remove("next");
        post.classList.remove("prev");
    })
}

/* Эффект у элементом меню при скролле */
const header_menu = document.querySelectorAll(".header__menu li");
let last_scroll = 0;
let blocks = document.querySelectorAll("section");

if (document.body.clientWidth > 768) {
    header_menu[0].classList.add("active");
    window.addEventListener("scroll", (e) => {
        let top = window.pageYOffset;

        header_menu.forEach(li => {
            if (li.classList.contains("active")) {
                let li_next_active = li.nextElementSibling || header_menu[header_menu.length - 1];
                let li_prev_active = li.previousElementSibling || header_menu[0];

                if (last_scroll < top) {
                    blocks.forEach(block => {
                        if (block.dataset.li == li_next_active.dataset.li) {
                            let block_top = block.getBoundingClientRect().top;

                            if (block_top - window.innerHeight < -800) {
                                reset_li();
                                li_next_active.classList.add("active");
                            }
                            return;
                        }
                    })
                } else {
                    blocks.forEach((block) => {
                        if (block.dataset.li == li_prev_active.dataset.li) {
                            let block_top = block.getBoundingClientRect().bottom;

                            if (block_top > 400) {
                                reset_li();
                                li_prev_active.classList.add("active");
                            }
                            return;
                        }
                    })
                }
                return;
            }
        })
        last_scroll = top;
    })
}


header_menu.forEach(li => {
    li.addEventListener("click", (e) => {
        e.preventDefault();

        blocks.forEach(block => {
            if (li.dataset.li == block.dataset.li) {
                const block_top = block.getBoundingClientRect().top;

                menu.classList.remove("header__menu_active");
                burger.classList.remove("active");
                document.body.classList.remove("active");

                window.scrollBy({
                    top: block_top,
                    behavior: 'smooth'
                });
                reset_li();
                if (document.body.clientWidth > 768) li.classList.add("active");
            }
        })
    })
})

function reset_li() {
    header_menu.forEach(li => {
        li.classList.remove("active");
    })
}