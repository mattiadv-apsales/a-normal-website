import { creaCorso, ripristina_lezioni, return_lesson_left, lastLessons } from "./function.js";

creaCorso(10, "Corso web developing")
creaCorso(6, "Corso programming principles")
creaCorso(8, "Corso computer architecture")
creaCorso(8, "Corso Discrete Mathematics")
creaCorso(6, "Corso computer Networks")

ripristina_lezioni("Corso web developing")
ripristina_lezioni("Corso programming principles")
ripristina_lezioni("Corso computer architecture")
ripristina_lezioni("Corso Discrete Mathematics")
ripristina_lezioni("Corso computer Networks")

lastLessons(return_lesson_left())