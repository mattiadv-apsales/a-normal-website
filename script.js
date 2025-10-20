import { creaCorso, ripristina_lezioni, return_lesson_left, lastLessons } from "./function.js";
import { get_all_courses } from "./localstorage.js";

window.addEventListener('DOMContentLoaded', () => {
    const corsiSalvati = get_all_courses();
    corsiSalvati.forEach(corso => {
        // Nota il false: NON salvare di nuovo
        creaCorso(corso.lezioni, corso.nome_corso, false);
    });

    ripristina_lezioni();
    lastLessons(return_lesson_left());
});

const createNow = document.getElementById('createNow');
const namecorse = document.getElementById('namecorse');
const lessons = document.getElementById('lessons');

createNow.addEventListener('click', function() {
    const name = namecorse.value.trim();
    const less = parseInt(lessons.value);

    if (!name || !less) return;

    creaCorso(less, name);       // crea il corso e lo salva
    ripristina_lezioni();        // aggiorna il conteggio
    lastLessons(return_lesson_left());

    // svuota i campi input
    namecorse.value = "";
    lessons.value = "";
});
