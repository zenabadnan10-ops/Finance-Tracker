const btns = document.querySelectorAll(".nav-btns");
const sections = document.querySelectorAll(".page-section");
const defaultSection = document.getElementById("dashboard");
const defaultBtn = document.getElementById("dashboard-btn")

export const renderNavigation = () => {

    sections.forEach(sec => {
        sec.style.display = "none";
    });

    btns.forEach(btn => {
        btn.classList.remove("btn-active");
        btn.removeAttribute("aria-current");

        btn.addEventListener("click", () => {
            const target = btn.dataset.section;

            btns.forEach(b => {
                b.classList.remove("btn-active");
                b.removeAttribute("aria-current");
            });

            sections.forEach(sec => {
                sec.style.display = "none";
            });

            btn.classList.add("btn-active");
            btn.setAttribute("aria-current", "page");

            const activeSection = document.getElementById(target);
            if (activeSection) {
                activeSection.style.display = "";
            }
        });
    });

    if (defaultSection && defaultBtn) {
        defaultSection.style.display = "";
        defaultBtn.classList.add("btn-active");
        defaultBtn.setAttribute("aria-current", "page");
    }
}