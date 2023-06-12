const menuBtn = document.querySelector(".menu-container");
const sidebarListItems = document.querySelectorAll(".sidebar-list-item");

const initTypedSubtitle = () => {
    const texts = [
        "Solusi Web yang Handal",
        "Kreativitas yang Menginspirasi",
        "Berkolaborasi dalam Kesempurnaan",
        "Website yang Memikat",
        "Menghadirkan Potensi Penuh",
        "Percayakan Keahlian Kami"
    ];
    new Typed(".subtitle-typed", {
        strings: [...texts],
        loop: true,
        typeSpeed: 25,
        backSpeed: 10,
        backDelay: 1000,
    });
};

const switchSidebar = (isShown = false) => {
    const element = document.querySelector(".nav-sidebar");
    const btn = document.querySelector(".menu-container");
    const shownClassName = "nav-sidebar-shown";
    const menuActiveClassName = "menu-container-active";
    isShown ? element.classList.remove(shownClassName) : element.classList.add(shownClassName);
    isShown ? btn.classList.remove(menuActiveClassName) : btn.classList.add(menuActiveClassName);
};

const toggleSidebar = () => {
    const element = document.querySelector(".nav-sidebar");
    const shownClassName = "nav-sidebar-shown";
    const isShown = element.classList.contains(shownClassName);
    switchSidebar(isShown);
};

sidebarListItems.forEach((element) => {
    element.addEventListener("click", () => {
        switchSidebar(true);
    });
});

menuBtn.addEventListener("click", () => {
    toggleSidebar();
});

window.addEventListener("load", () => {
    initTypedSubtitle();
});