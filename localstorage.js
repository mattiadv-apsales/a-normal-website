export function add_to_local_storage(lezioni, corso) {
    localStorage.setItem("lezioni_" + corso.replaceAll(" ", "_").toLowerCase(), lezioni)
    localStorage.setItem("Corso", corso)
}

export function lesson_finished(lezione, corso) {
    localStorage.setItem("lezione_" + lezione, true)
}

export function lesson_not_finished(lezione, corso) {
    localStorage.removeItem("lezione_" + lezione)
}

export function course_already_exist(lezioni, corso) {
    let value = localStorage.getItem("lezioni_" + corso)
    console.log(value)
}