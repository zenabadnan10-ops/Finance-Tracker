const btns = document.querySelectorAll(".nav-btns");
const sections = document.querySelectorAll(".page-section");
const defaultSection = document.getElementById("dashboard");
const defaultBtn = document.getElementById("dashboard-btn")

btns.forEach(btn => {
    btn.addEventListener("click", () => {
        const target = btn.dataset.section;

        btns.forEach(btn => {
            btn.classList.remove("btn-active");
            btn.removeAttribute("aria-current");
        });

        sections.forEach(sec => {
            sec.style.display = "none";
        });

        btn.classList.add("btn-active");
        btn.setAttribute("aria-current", "page");

        document.getElementById(target).style.display = "grid";
    });
});

defaultSection.style.display = "grid";
defaultBtn.classList.add("btn-active");