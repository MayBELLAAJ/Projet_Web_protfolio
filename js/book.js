document.addEventListener("DOMContentLoaded", () => {
    const cover = document.querySelector(".cover");
    const pages = document.querySelectorAll(".page");
    let currentPage = 0;

    // Ouvrir le livre (couverture)
    cover.addEventListener("click", () => {
        // Si nous sommes sur la couverture et que nous cliquons, ouvrir le livre
        if (currentPage === 0) {
            cover.classList.add("open");
            setTimeout(() => {
                cover.style.display = "none";
                pages[currentPage].style.transform = `rotateY(0deg)`; // Afficher la première page
            }, 800);
        } else {
            // Si on clique sur la couverture après l'avoir tourné, on revient à la couverture
            pages[currentPage].style.transform = `rotateY(180deg)`;
            currentPage = 0; // Revenir à la couverture
            setTimeout(() => {
                cover.style.display = "flex";
                cover.classList.remove("open");
                pages[currentPage].style.transform = `rotateY(0deg)`; // Afficher la couverture
            }, 800);
        }
    });

    // Fonction pour tourner les pages
    const turnPage = (direction) => {
        if (direction === "next" && currentPage < pages.length) {
            pages[currentPage].style.transform = `rotateY(-180deg)`;
            currentPage++;
            if (currentPage < pages.length) {
                pages[currentPage].style.transform = `rotateY(0deg)`;
            }
        } else if (direction === "prev" && currentPage > 0) {
            pages[currentPage].style.transform = `rotateY(180deg)`;
            currentPage--;
            pages[currentPage].style.transform = `rotateY(0deg)`;
        }
    };

    // Ajouter des événements pour navigation par clic sur la page
    document.addEventListener("click", (event) => {
        // Si on clique sur la couverture
        if (event.target === cover) return;
        // Si on clique sur une page et que ce n'est pas la couverture
        if (!event.target.classList.contains("cover")) {
            if (event.clientX < window.innerWidth / 2) {
                // Cliquer sur le côté gauche pour revenir à la page précédente
                turnPage("prev");
            } else {
                // Cliquer sur le côté droit pour avancer à la page suivante
                turnPage("next");
            }
        }
    });

    // Ajouter des événements pour navigation au clavier
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowRight") {
            turnPage("next");
        } else if (event.key === "ArrowLeft") {
            turnPage("prev");
        }
    });
});
