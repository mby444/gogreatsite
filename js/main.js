const menuBtn = document.querySelector(".menu-container");
const fcBtn = document.querySelector(".fc-btn");
const sidebarListItems = document.querySelectorAll(".sidebar-list-item");

class FeedbackError {
    constructor(message) {
        this.message = message;
    }
}

const checkEmail = (email = "") => {
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const output = regex.test(email);
    return output;
};

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

const sendFeedback = async ({ name, email, message, date = Date()}) => {
    const payload = { name, email, message, date };
    const rawResponse = await fetch("./php/rest/feedback.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    const response = await rawResponse.json();
    return response;
};

const submitFeedbackForm = async () => {
    try {
        const select = document.querySelector.bind(document);
        const [name, email, message] = [
            select("#name-input").value?.trim(),
            select("#email-input").value?.trim(),
            select("#feedback-input").value?.trim(),
        ];
        const isAllFieldFilled = Boolean(name && email && message);
        const isValidEmail = checkEmail(email);
        if (!isAllFieldFilled) throw new FeedbackError("Semua kolom wajib diisi");
        if (!isValidEmail) throw new FeedbackError("Email tidak valid");
        await sendFeedback({ name, email, message });
        await Swal.fire("Sukses Dikirim", "Terima kasih atas masukan anda", "success");
        location.reload();
    } catch (err) {
        const defaultErrMsg = "Telah terjadi kesalahan";
        const errMsg = err instanceof FeedbackError ? err.message : defaultErrMsg;
        await Swal.fire("Error", errMsg, "error");
    }
};

sidebarListItems.forEach((element) => {
    element.addEventListener("click", () => {
        switchSidebar(true);
    });
});

menuBtn.addEventListener("click", () => {
    toggleSidebar();
});

fcBtn.addEventListener("click", () => {
    submitFeedbackForm();
});

window.addEventListener("load", () => {
    initTypedSubtitle();
});