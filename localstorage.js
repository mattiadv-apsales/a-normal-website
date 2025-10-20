// ------------------- Aggiunge un nuovo corso -------------------
export function add_to_local_storage(lezioni, corso) {
    let corsi = JSON.parse(localStorage.getItem("corsi")) || [];
    const normalizedCorso = normalizeCourseName(corso);

    if (!corsi.some(c => normalizeCourseName(c.nome_corso) === normalizedCorso)) {
        corsi.push({ nome_corso: corso, lezioni: lezioni });
    }

    localStorage.setItem("corsi", JSON.stringify(corsi));
}

// ------------------- Segna una lezione come completata -------------------
export function lesson_finished(lezione_id) {
    localStorage.setItem("lezione_" + lezione_id, "true");
}

// ------------------- Segna una lezione come non completata -------------------
export function lesson_not_finished(lezione_id) {
    localStorage.removeItem("lezione_" + lezione_id);
}

// ------------------- Controlla se un corso esiste già -------------------
export function course_already_exist(corso) {
    let corsi = JSON.parse(localStorage.getItem("corsi")) || [];
    return corsi.some(c => c.nome_corso === corso);
}

// ------------------- Recupera tutti i corsi salvati -------------------
export function get_all_courses() {
    return JSON.parse(localStorage.getItem("corsi")) || [];
}

// ------------------- Recupera lo stato di una lezione -------------------
export function is_lesson_finished(lezione_id) {
    return localStorage.getItem("lezione_" + lezione_id) === "true";
}

export function remove_course_from_storage(corso) {
    let corsi = JSON.parse(localStorage.getItem("corsi")) || [];

    const normalizedCorso = normalizeCourseName(corso);

    // trova il corso da eliminare
    const corso_obj = corsi.find(c => normalizeCourseName(c.nome_corso) === normalizedCorso);

    // se il corso esiste, elimina le lezioni singole
    if (corso_obj) {
        for (let i = 1; i <= corso_obj.lezioni; i++) {
            localStorage.removeItem(`lezione_${i}_${normalizedCorso}`);
        }
    }

    // filtra i corsi rimuovendo quello eliminato
    corsi = corsi.filter(c => normalizeCourseName(c.nome_corso) !== normalizedCorso);

    // salva l'array aggiornato nel localStorage
    localStorage.setItem("corsi", JSON.stringify(corsi));
}

function normalizeCourseName(nome) {
    return nome.trim().replaceAll(" ", "_").toLowerCase();
}