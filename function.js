import { add_to_local_storage, lesson_finished, lesson_not_finished, course_already_exist } from "./localstorage.js";

let container = document.getElementById("container");
let lesson_left = 0

export function fatta_lezione(id, corso) {
    if (id) {
        let lez = document.getElementById(id);
        if (lez.dataset.doing == "true") {
            lez.style.background = "white";
            lez.style.color = "black";
            lez.dataset.doing = false;
            lesson_not_finished(id, corso)
            lesson_left += 1
            lastLessons(lesson_left)
        } else {
            lez.style.background = "lightgreen";
            lez.style.color = "white";
            lez.dataset.doing = true;
            lesson_finished(id, corso);
            lesson_left -= 1
            lastLessons(lesson_left)
        }
    }
}

export function closeCategory(id, titolo, corso) {
    if (id) {
        let cat = document.getElementById(id);
        let h1_enter = cat.querySelector("h1");

        if (cat.dataset.open == "true") {
            for (let elem of cat.children) {
                if (elem !== h1_enter) {
                    elem.style.display = "none"
                }
            }
            titolo.innerHTML = corso + " ˅";
            cat.dataset.open = "false";
        } else {
            for (let elem of cat.children) {
                if (elem !== h1_enter) {
                    elem.style.display = "flex"
                }
            }
            titolo.innerHTML = corso + " ˄";
            cat.dataset.open = "true";
        }
    }
}

export function creaCorso(quante_lezioni, nome_corso) {
    lesson_left += quante_lezioni;
    // container della categoria
    let cat_cont = document.createElement("div");
    cat_cont.classList.add("cont-cat");
    cat_cont.id = "cat_cont_" + nome_corso.replaceAll(" ", "_").toLowerCase()
    cat_cont.dataset.open = "true";

    container.appendChild(cat_cont);

    // creazione titolo della categoria
    let titolo_cat = document.createElement("h1");
    titolo_cat.innerHTML = nome_corso + " ˄";
    titolo_cat.onclick = function() {
        closeCategory(cat_cont.id, titolo_cat, nome_corso);
    }

    cat_cont.appendChild(titolo_cat);

    // creazione categoria
    let categoria = document.createElement("div");
    categoria.classList.add("category");

    cat_cont.appendChild(categoria);

    // creazione lezioni
    for (let i = 0; i < quante_lezioni; i++) {
        let lesson = document.createElement("div");
        lesson.classList.add("lesson");
        let value = i + 1
        lesson.innerHTML = "<h1>" + value + "</h1>";
        lesson.id = value + "_" + nome_corso.replaceAll(" ", "_").toLowerCase();
        lesson.onclick = function() {
            fatta_lezione(lesson.id);
        }
        lesson.dataset.doing = false;
        if (lesson.dataset.doing == true) {
            fatta_lezione(lesson.id, nome_corso)
        }
        categoria.appendChild(lesson);
    }

    add_to_local_storage(quante_lezioni, nome_corso)
}

export function ripristina_lezioni(corso) {
    const corso_key = corso.replaceAll(" ", "_").toLowerCase();
    const lezioni = document.querySelectorAll(`[id$="_${corso_key}"]`);

    lezioni.forEach(lez => {
        const lezione_key = "lezione_" + lez.id;
        if (localStorage.getItem(lezione_key)) {
            lez.style.background = "lightgreen";
            lez.style.color = "white";
            lez.dataset.doing = "true";
            lesson_left -= 1
        } else {
            lez.style.background = "white";
            lez.style.color = "black";
            lez.dataset.doing = "false";
        }
    });
}

export function return_lesson_left() {
    return lesson_left;
}

export function lastLessons(left) {
    let exist = document.querySelector('.lessons_left')

    if (exist) {
        exist.remove();

        let today = new Date();

        let futureDate = new Date();
        futureDate.setDate(today.getDate() + left)

        let giorno = String(futureDate.getDate()).padStart(2, '0');
        let mese = String(futureDate.getMonth() + 1).padStart(2, '0');
        let anno = futureDate.getFullYear();

        let dataFine = `${giorno}/${mese}/${anno}`;

        let val = document.createElement('div');
        val.classList.add("lessons_left");
        val.innerHTML = "Mancano " + left + " lezioni!<br><span class = 'datafinale'>" + dataFine + "</span>";

        document.body.appendChild(val);
    } else {
        let today = new Date();

        let futureDate = new Date();
        futureDate.setDate(today.getDate() + left)

        let giorno = String(futureDate.getDate()).padStart(2, '0');
        let mese = String(futureDate.getMonth() + 1).padStart(2, '0');
        let anno = futureDate.getFullYear();

        let dataFine = `${giorno}/${mese}/${anno}`;

        let val = document.createElement('div');
        val.classList.add("lessons_left");
        val.innerHTML = "Mancano " + left + " lezioni!<br><span class = 'datafinale'>" + dataFine + "</span>";

        document.body.appendChild(val);
    }
}