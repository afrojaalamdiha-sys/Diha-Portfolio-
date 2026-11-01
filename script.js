
// MOBILE NAVIGATION
const menuToggle = document.querySelector(".menu-toggle");
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("open");
});

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navbar.classList.remove("open");
    });
});

// TEXT REVEAL ANIMATION
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12
});

document.querySelectorAll(".reveal").forEach(element => {
    revealObserver.observe(element);
});

// TYPING ANIMATION
const typingElement = document.querySelector(".typing");

const words = [
    "Creative Thinker",
    "Dreamer",
    "Learner",
    "Explorer"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    const word = words[wordIndex];

    typingElement.textContent = word.substring(0, charIndex);

    if (!deleting) {
        charIndex++;

        if (charIndex > word.length) {
            deleting = true;
            setTimeout(typeEffect, 1200);
            return;
        }
    } else {
        charIndex--;

        if (charIndex < 0) {
            deleting = false;
            charIndex = 0;
            wordIndex = (wordIndex + 1) % words.length;
        }
    }

    setTimeout(typeEffect, deleting ? 45 : 90);
}

typeEffect();

// ACTIVE NAVIGATION
const sections = document.querySelectorAll("main section[id]");

const activeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === "#" + entry.target.id
                );
            });
        }
    });
}, {
    rootMargin: "-35% 0px -55% 0px"
});

sections.forEach(section => activeObserver.observe(section));

// CUSTOM CURSOR
if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    const dot = document.querySelector(".cursor-dot");
    const ring = document.querySelector(".cursor-ring");

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    document.addEventListener("pointermove", event => {
        mouseX = event.clientX;
        mouseY = event.clientY;

        dot.style.transform =
            `translate(${mouseX - 3}px, ${mouseY - 3}px)`;

        document.body.classList.add("cursor-active");
    });

    function animateRing() {
        ringX += (mouseX - ringX) * 0.16;
        ringY += (mouseY - ringY) * 0.16;

        ring.style.transform =
            `translate(${ringX - 16}px, ${ringY - 16}px)`;

        requestAnimationFrame(animateRing);
    }

    animateRing();

    document.querySelectorAll("a, button, summary").forEach(element => {
        element.addEventListener("mouseenter", () => {
            document.body.classList.add("cursor-hover");
        });

        element.addEventListener("mouseleave", () => {
            document.body.classList.remove("cursor-hover");
        });
    });
}
