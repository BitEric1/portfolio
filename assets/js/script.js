document.addEventListener("DOMContentLoaded", () => {
    const user = $("#user");
    const userInfo = $("#user-info");
    const overlay = $("#user__overlay");
    const headerSearch = document.querySelector("#header-search");

    if (user && userInfo) {
        user.addEventListener("click", () => {
            userInfo.classList.toggle("show");
            overlay.classList.toggle("show");
        });
    } else {
        console.error("Không tìm thấy #user hoặc #user-info");
    }

    overlay.addEventListener("click", () => {
        userInfo.classList.remove("show");
        overlay.classList.remove("show");
    });

    if (headerSearch) {
        document.addEventListener("click", (event) => {
            if (headerSearch.contains(event.target)) {
                headerSearch.classList.add("show");
            } else {
                headerSearch.classList.remove("show");
            }
        });
    } else {
        console.error("Không tìm thấy #header-search");
    }

    const navLinks = document.querySelectorAll(".mobile__nav-link");
    const pcNavLinks = document.querySelectorAll(".navbar__link");
    const sections = document.querySelectorAll(".profile__main-content");

    pcNavLinks.forEach((pcNavLink, index) => {
        pcNavLink.addEventListener("click", () => {
            sections.forEach((section) => {
                section.classList.remove("profile__main-content--active");
            });

            pcNavLinks.forEach((pcNavLink) => {
                pcNavLink.classList.remove("navbar__link--active");
            });

            pcNavLink.classList.add("navbar__link--active");
            sections[index].classList.add("profile__main-content--active");
        });
    });

    navLinks.forEach((link, index) => {
        link.addEventListener("click", function () {
            // Xóa class active khỏi tất cả các phần nội dung
            sections.forEach((section) => {
                section.classList.remove("profile__main-content--active");
            });

            navLinks.forEach((navLink) => {
                navLink.classList.remove("navbar__link--active");
            });

            // Thêm class active vào phần tương ứng
            link.classList.add("navbar__link--active");
            sections[index].classList.add("profile__main-content--active");
        });
    });

    const infoBreadcrums = document.querySelectorAll("#profile__infor-link");

    infoBreadcrums.forEach((infoBreadcrum, index) => {
        infoBreadcrum.addEventListener("click", () => {
            infoBreadcrums.forEach((infoBreadcrum) => {
                infoBreadcrum.classList.remove("breadcrumb__link--active");
            });

            infoBreadcrum.classList.add("breadcrumb__link--active");
        });
    });
});

window.addEventListener("template-loaded", () => {
    const switchBtn = document.querySelector("#switch-theme-btn");
    if (switchBtn) {
        switchBtn.onclick = function () {
            const isDark = localStorage.dark === "true";
            document.querySelector("html").classList.toggle("dark", !isDark);
            localStorage.setItem("dark", !isDark);
            switchBtn.querySelector("span").textContent = isDark ? "Dark mode" : "Light mode";
        };
        const isDark = localStorage.dark === "true";
        switchBtn.querySelector("span").textContent = isDark ? "Light mode" : "Dark mode";
    }
});

const isDark = localStorage.dark === "true";
document.querySelector("html").classList.toggle("dark", isDark);

// Birthday countdown
const targetDate = new Date("2025-03-21T00:00:00");

function updateCountdown() {
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) {
        document.getElementById("birth-day-date").innerText = "Happy birth day to me!";
        clearInterval(timerInterval);
        return;
    }

    const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor((difference % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById(
        "birth-day-date"
    ).innerText = `${days} days : ${hours} hours : ${minutes} minutes : ${seconds} seconds`;

    document.getElementById(
        "birth-day-date-dropdown"
    ).innerText = `${days} days : ${hours} hours : ${minutes} minutes : ${seconds} seconds`;
}
const timerInterval = setInterval(updateCountdown, 1000);

updateCountdown();

document.getElementById("birthday-dropdown").innerHTML = `
        <div class="bith-day__time">
        <button class="birthday-dropdown__close d--none d-sm-block">&times;</button>
            <p class="birth-day__time-desc birthday-dropdown__time-desc">
                <img src="./assets/icons/clock.svg" class="icon" alt="" />
                Time remaining:
            </p>
            <div class="birth-day__date birthday-dropdown__date" id="birth-day-date-dropdown">
                20 days : xx hours : xx minutes : xx seconds
            </div>
        </div>
        <div class="birthday-dropdown__gif-wrap">
            <img src="./assets/gif/cute-git.gif" alt="" class="birthday-dropdown__gif" />
        </div>
        <p class="birthday-dropdown__desc">It's not time yet, please come back later.</p>
    `;
