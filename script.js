// Enable progressive enhancement styles immediately
document.body.classList.add('js-enabled');

// Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent immediate closing
    const isActive = hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    hamburger.setAttribute("aria-expanded", isActive);
    document.body.classList.toggle("no-scroll", isActive);
  });

  // Close mobile menu when clicking on a navigation link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      hamburger.setAttribute("aria-expanded", false);
      document.body.classList.remove("no-scroll");
    });
  });

  // Close when clicking outside or pressing Escape
  document.addEventListener("click", (e) => {
    if (navMenu.classList.contains("active") && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      hamburger.setAttribute("aria-expanded", false);
      document.body.classList.remove("no-scroll");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenu.classList.contains("active")) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      hamburger.setAttribute("aria-expanded", false);
      document.body.classList.remove("no-scroll");
      hamburger.focus(); // Return focus to trigger
    }
  });
}

// Typed text animation for hero section
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["AI/ML Engineering", "Data Science", "Data Engineering"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (!typedTextSpan || !cursorSpan) return;
  
  if (charIndex < textArray[textArrayIndex].length) {
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (!typedTextSpan || !cursorSpan) return;
  if (charIndex > 0) {
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 500); // slightly faster pause before next typing
  }
}

// Start the typing animation when the page loads
document.addEventListener("DOMContentLoaded", function () {
  if (typedTextSpan && cursorSpan && textArray.length) {
    // Check for prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      typedTextSpan.textContent = textArray[0];
      cursorSpan.style.display = 'none';
    } else {
      setTimeout(type, newTextDelay + 250);
    }
  }

  // Project filtering
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.getAttribute("data-filter");

        projectCards.forEach((card) => {
          if (filter === "all" || card.getAttribute("data-category") === filter) {
            card.style.display = ""; // Fix: allow CSS to handle flex layout
            setTimeout(() => card.classList.remove("fade-out"), 10);
          } else {
            card.classList.add("fade-out");
            setTimeout(() => { 
              if(card.classList.contains("fade-out")) card.style.display = "none"; 
            }, 300);
          }
        });
      });
    });
  }

  // Form submission
  const contactForm = document.getElementById("contactForm");
  if (contactForm && typeof emailjs !== 'undefined') {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      emailjs
        .sendForm(
          "service_yq7w8e7",
          "template_okyox08",
          this,
          "uk3IvRaxju8DRuQZC"
        )
        .then(
          function () {
            alert("Your message has been sent successfully!");
            contactForm.reset();
          },
          function (error) {
            alert("Sorry, there was an error sending your message. Please try again later.");
            console.error("EmailJS error:", error);
          }
        );
    });
  }

  // Active section scroll spy
  if ('IntersectionObserver' in window) {
    const sections = document.querySelectorAll("section[id]");
    const spyOptions = {
      rootMargin: "-20% 0px -70% 0px"
    };
    
    const spyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          document.querySelectorAll(".nav-link").forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${id}`) {
              link.classList.add("active");
            }
          });
        }
      });
    }, spyOptions);

    sections.forEach(sec => spyObserver.observe(sec));
  }
});

// Scroll animations for sections
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  document.querySelectorAll("section").forEach((section) => {
    observer.observe(section);
  });
} else {
  // Fallback if IntersectionObserver is not supported
  document.querySelectorAll("section").forEach((section) => {
    section.classList.add("show");
  });
}

// Preloader
function hidePreloader() {
  const preloader = document.getElementById("preloader");
  if (preloader && !preloader.classList.contains("fade-out")) {
    preloader.classList.add("fade-out");
    setTimeout(() => {
      preloader.style.display = "none";
    }, 500);
  }
}

if (document.readyState === "complete") {
  hidePreloader();
} else {
  window.addEventListener("load", hidePreloader);
  // Removed the 3000ms forced timeout to respect actual load time
}

// Header scroll effect
const header = document.getElementById("header");
if (header) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }
  });
}
