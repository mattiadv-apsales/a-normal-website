import { add_to_local_storage, lesson_finished, lesson_not_finished, remove_course_from_storage } from "./localstorage.js";

let container = document.getElementById("container");
let lesson_left = 0;

// ------------------- Normalizza nome corso per ID e localStorage -------------------
function normalizeCourseName(nome) {
    return nome.trim().replaceAll(" ", "_").toLowerCase();
}

// ------------------- Fatta lezione -------------------
export function fatta_lezione(id, corso) {
    if (!id) return;

    let lez = document.getElementById(id);
    if (lez.dataset.doing === "true") {
        lez.style.background = "white";
        lez.style.color = "black";
        lez.dataset.doing = "false";
        lesson_not_finished(id);
        lesson_left += 1;
    } else {
        lez.style.background = "lightgreen";
        lez.style.color = "white";
        lez.dataset.doing = "true";
        lesson_finished(id);
        lesson_left -= 1;
    }

    lastLessons(lesson_left);
}

// ------------------- Toggle Categoria -------------------
export function closeCategory(id, titolo, corso) {
    if (!id) return;

    let cat = document.getElementById(id);
    let h1_enter = cat.querySelector("h1");

    if (cat.dataset.open == "true") {
        for (let elem of cat.children) {
            if (elem !== h1_enter) elem.style.display = "none";
        }
        titolo.innerHTML = corso + " ˅";
        cat.dataset.open = "false";
    } else {
        for (let elem of cat.children) {
            if (elem !== h1_enter) elem.style.display = "flex";
        }
        titolo.innerHTML = corso + " ˄";
        cat.dataset.open = "true";
    }
}

// ------------------- Crea Corso -------------------
export function creaCorso(quante_lezioni, nome_corso, saveToStorage = true) {
    const corsoKey = normalizeCourseName(nome_corso);

    // container e creazione DOM
    let cat_cont = document.createElement("div");
    cat_cont.classList.add("cont-cat");
    cat_cont.id = "cat_cont_" + corsoKey;
    cat_cont.dataset.open = "true";
    container.appendChild(cat_cont);

    // titolo corso
    let titolo_cat = document.createElement("h1");
    titolo_cat.innerHTML = nome_corso + " ˄";
    titolo_cat.onclick = function() { closeCategory(cat_cont.id, titolo_cat, nome_corso); }
    cat_cont.appendChild(titolo_cat);

    // pulsante elimina corso
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Elimina corso";
    deleteBtn.classList.add("delete-course");
    deleteBtn.onclick = () => {
        cat_cont.remove();
        remove_course_from_storage(nome_corso);
        ripristina_lezioni();
        lastLessons(return_lesson_left());
    };
    cat_cont.appendChild(deleteBtn);

    // contenitore lezioni
    let categoria = document.createElement("div");
    categoria.classList.add("category");
    cat_cont.appendChild(categoria);

    // creazione lezioni
    for (let i = 0; i < quante_lezioni; i++) {
        let lesson = document.createElement("div");
        lesson.classList.add("lesson");
        lesson.id = `${i + 1}_${corsoKey}`;
        lesson.innerHTML = `<h1>${i + 1}</h1>`;
        lesson.dataset.doing = "false";
        lesson.onclick = () => fatta_lezione(lesson.id, nome_corso);
        categoria.appendChild(lesson);
    }

    if (saveToStorage) add_to_local_storage(quante_lezioni, nome_corso);

    ripristina_lezioni();
}

// ------------------- Ripristina tutte le lezioni -------------------
export function ripristina_lezioni() {
    lesson_left = 0;

    const corsi = JSON.parse(localStorage.getItem("corsi")) || [];

    corsi.forEach(corso => {
        const corsoKey = normalizeCourseName(corso.nome_corso);
        for (let i = 1; i <= corso.lezioni; i++) {
            const lezione_id = `${i}_${corsoKey}`;
            const lez = document.getElementById(lezione_id);
            if (!lez) continue;

            if (localStorage.getItem(`lezione_${lezione_id}`)) {
                lez.style.background = "lightgreen";
                lez.style.color = "white";
                lez.dataset.doing = "true";
            } else {
                lez.style.background = "white";
                lez.style.color = "black";
                lez.dataset.doing = "false";
                lesson_left += 1;
            }
        }
    });
}

// ------------------- Restituisci lezioni mancanti -------------------
export function return_lesson_left() {
    return lesson_left;
}

// ------------------- Aggiorna contatore e data -------------------
export function lastLessons(left) {
    const exist = document.querySelector(".lessons_left");
    if (exist) exist.remove();

    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + left);

    const giorno = String(futureDate.getDate()).padStart(2, "0");
    const mese = String(futureDate.getMonth() + 1).padStart(2, "0");
    const anno = futureDate.getFullYear();

    const dataFine = `${giorno}/${mese}/${anno}`;

    const val = document.createElement("div");
    val.classList.add("lessons_left");
    val.innerHTML = `Mancano ${left} lezioni!<br><span class='datafinale'>${dataFine}</span>`;
    document.body.appendChild(val);
}

// ------------------- Carica corsi salvati all'avvio -------------------
export function loadSavedCourses() {
    const corsiSalvati = JSON.parse(localStorage.getItem("corsi")) || [];
    corsiSalvati.forEach(corso => {
        creaCorso(corso.lezioni, corso.nome_corso, false);
    });
}
