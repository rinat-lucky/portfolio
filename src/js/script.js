"use strict";

class ProjectCard{
    constructor(src, alt, title, link, parentSelector) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.link = link;
        this.parent = document.querySelector(parentSelector);
    }

    render() {
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="card border-0 h-100">
                <img src=${this.src} class="card-img-top h-100 img-thumbnail p-0" alt=${this.alt}>
                <div class="card-body">
                    <h5 class="card-title fw-bold text-center">${this.title}</h5>
                    <div class="text-center mt-3">
                        <a href=${this.link} class="btn btn-primary px-5">Посмотреть</a>
                    </div>
                </div>
            </div>
        `
        element.classList.add('col-8', 'col-sm-5', 'col-lg-3', 'mx-1', 'mb-5', 'p-0');
        this.parent.append(element);
    }
}

new ProjectCard(
    "img/preview_card.jpg",
    "Карточки CSS",
    "Карточки CSS",
    "projects/01-cards/index.html",
    "#js-wrapper"
).render()

new ProjectCard(
    "img/preview_drag.jpg",
    "Drug'n'drop",
    "Drug'n'drop",
    "projects/02-drag-n-drop/index.html",
    "#js-wrapper"
).render()

new ProjectCard(
    "img/preview_slider.jpg",
    "Слайдер",
    "Слайдер",
    "projects/03-slider/index.html",
    "#js-wrapper"
).render()

new ProjectCard(
    "img/preview_hover.jpg",
    "Hover-board",
    "Hover-board",
    "projects/04-board/index.html",
    "#js-wrapper"
).render()

new ProjectCard(
    "img/preview_aim.jpg",
    "AimGame",
    "AimGame",
    "projects/05-aim-game/index.html",
    "#js-wrapper"
).render()

new ProjectCard(
    "img/preview_add_card.jpg",
    "Добавление карточек",
    "Добавление карточек",
    "projects/08-add-card/index.html",
    "#js-wrapper"
).render()

new ProjectCard(
    "img/preview_todo.jpg",
    "ToDo",
    "ToDo",
    "projects/06-todo/index.html",
    "#js-wrapper"
).render()

new ProjectCard(
    "img/preview_calc.jpg",
    "Калькулятор",
    "Калькулятор",
    "projects/09-calc/index.html",
    "#js-wrapper"
).render()

new ProjectCard(
    "img/preview_tic-tac-toe.jpg",
    "Крестики-Нолики",
    "Крестики-Нолики",
    "projects/07-tic-tac-toe/index.html",
    "#js-wrapper"
).render()

new ProjectCard(
    "img/preview_smoke.jpg",
    "Smoke",
    "Smoke",
    "projects/1-smoke/index.html",
    "#html-wrapper"
).render()