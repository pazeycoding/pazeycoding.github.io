// JavaScript Document

// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');

    // Stop if this page has no particles container
    if (!particlesContainer) return;

    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration =
            (Math.random() * 10 + 15) + 's';

        particle.style.background = Math.random() > 0.5
            ? '#00B2FF'
            : '#9B41F2';

        particlesContainer.appendChild(particle);
    }
}
// Mobile menu toggle

/* ========================================
   MOBILE MENU AND SERVICES DROPDOWN
======================================== */

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

const servicesDropdown = document.querySelector('#navLinks .dropdown');
const servicesToggle = document.querySelector(
    '#navLinks .dropdown-toggle'
);

if (menuToggle && navLinks) {

    // Open and close the hamburger menu
    menuToggle.addEventListener('click', function () {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Services dropdown: tap to expand on mobile
    if (servicesDropdown && servicesToggle) {

        servicesToggle.setAttribute('aria-expanded', 'false');

        servicesToggle.addEventListener('click', function (e) {

            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();

                const isOpen = servicesDropdown.classList.toggle('open');

                servicesToggle.setAttribute(
                    'aria-expanded',
                    String(isOpen)
                );
            }
        });
    }

    // Close the menu when a normal navigation link is selected.
    // Do NOT close it when Services itself is tapped.
    navLinks.querySelectorAll('a').forEach(function (link) {

        link.addEventListener('click', function () {

            if (link.classList.contains('dropdown-toggle')) {
                return;
            }

            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');

            // Reset the Services submenu
            if (servicesDropdown) {
                servicesDropdown.classList.remove('open');
            }

            if (servicesToggle) {
                servicesToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
}




        // Active navigation highlighting
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('.nav-link');

        function updateActiveNav() {
            const scrollPosition = window.pageYOffset + 100;

            sections.forEach((section, index) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navItems.forEach(item => item.classList.remove('active'));
                    const currentNav = document.querySelector(`.nav-link[href="#${section.id}"]`);
                    if (currentNav) currentNav.classList.add('active');
                }
            });
        }

        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            updateActiveNav();
        });

        // Initial active nav update
        updateActiveNav();

        // Smooth scrolling for navigation links
  
/* Smooth scrolling, excluding dropdown toggles */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener('click', function (e) {

        // Let the mobile dropdown handler handle Services
        if (anchor.classList.contains('dropdown-toggle')) {
            if (window.innerWidth <= 768) {
                return;
            }
        }

        const href = anchor.getAttribute('href');

        if (!href || href === '#') return;

        const target = document.querySelector(href);

        if (target) {
            e.preventDefault();

            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

        // Feature tabs functionality
        const tabs = document.querySelectorAll('.tab-item');
        const panels = document.querySelectorAll('.content-panel');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.getAttribute('data-tab');
                
                // Remove active class from all tabs and panels
                tabs.forEach(t => t.classList.remove('active'));
                panels.forEach(p => p.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding panel
                tab.classList.add('active');
                document.getElementById(tabId).classList.add('active');
            });
        });


        // Initialize particles
        createParticles();

        // Text rotation with character animation
        const textSets = document.querySelectorAll('.text-set');
        let currentIndex = 0;
        let isAnimating = false;

        function wrapTextInSpans(element) {
            const text = element.textContent;
            element.innerHTML = text.split('').map((char, i) => 
                `<span class="char" style="animation-delay: ${i * 0.05}s">${char === ' ' ? '&nbsp;' : char}</span>`
            ).join('');
        }

        function animateTextIn(textSet) {
            const glitchText = textSet.querySelector('.glitch-text');
            const subtitle = textSet.querySelector('.subtitle');
            
            // Wrap text in spans for animation
            wrapTextInSpans(glitchText);
            
            // Update data attribute for glitch effect
            glitchText.setAttribute('data-text', glitchText.textContent);
            
            // Show subtitle after main text
            setTimeout(() => {
                subtitle.classList.add('visible');
            }, 800);
        }

        function animateTextOut(textSet) {
            const chars = textSet.querySelectorAll('.char');
            const subtitle = textSet.querySelector('.subtitle');
            
            // Animate characters out
            chars.forEach((char, i) => {
                char.style.animationDelay = `${i * 0.02}s`;
                char.classList.add('out');
            });
            
            // Hide subtitle
            subtitle.classList.remove('visible');
        }

        function rotateText() {
            if (isAnimating) return;
            isAnimating = true;

            const currentSet = textSets[currentIndex];
            const nextIndex = (currentIndex + 1) % textSets.length;
            const nextSet = textSets[nextIndex];

            // Animate out current text
            animateTextOut(currentSet);

            // After out animation, switch sets
            setTimeout(() => {
                currentSet.classList.remove('active');
                nextSet.classList.add('active');
                animateTextIn(nextSet);
                
                currentIndex = nextIndex;
                isAnimating = false;
            }, 600);
        }

        // Initialize first text set
        textSets[0].classList.add('active');
        animateTextIn(textSets[0]);

        // Start rotation after initial display
        setTimeout(() => {
            setInterval(rotateText, 5000); // Change every 5 seconds
        }, 4000);

        // Add random glitch effect
        setInterval(() => {
            const glitchTexts = document.querySelectorAll('.glitch-text');
            glitchTexts.forEach(text => {
                if (Math.random() > 0.95) {
                    text.style.animation = 'none';
                    setTimeout(() => {
                        text.style.animation = '';
                    }, 200);
                }
            });
        }, 3000);

       
/* ========================================
   TESTIMONIAL SLIDER
======================================== */

(function () {
    const slider = document.querySelector(".testimonial-slider");
    if (!slider) return;

    const slides = slider.querySelectorAll(".testimonial-slide");
    const dots = slider.querySelectorAll(".slider-dots .dot");
    const prevButton = slider.querySelector("#prevTestimonial");
    const nextButton = slider.querySelector("#nextTestimonial");

    if (!slides.length) return;

    let currentIndex = 0;
    let autoAdvance;
    const intervalTime = 6000;

    function showSlide(index) {
        currentIndex = (index + slides.length) % slides.length;

        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === currentIndex);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentIndex);
            dot.setAttribute(
                "aria-current",
                i === currentIndex ? "true" : "false"
            );
        });
    }

    function startAutoAdvance() {
        clearInterval(autoAdvance);

        autoAdvance = setInterval(() => {
            showSlide(currentIndex + 1);
        }, intervalTime);
    }

    function goToSlide(index) {
        showSlide(index);
        startAutoAdvance();
    }

    prevButton?.addEventListener("click", () => {
        goToSlide(currentIndex - 1);
    });

    nextButton?.addEventListener("click", () => {
        goToSlide(currentIndex + 1);
    });

    dots.forEach((dot, index) => {
        dot.style.cursor = "pointer";
        dot.addEventListener("click", () => {
            goToSlide(index);
        });
    });

    // Pause while the visitor is interacting with the slider
    slider.addEventListener("mouseenter", () => {
        clearInterval(autoAdvance);
    });

    slider.addEventListener("mouseleave", startAutoAdvance);

    // Pause when the browser tab is hidden
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            clearInterval(autoAdvance);
        } else {
            startAutoAdvance();
        }
    });

    showSlide(0);
    startAutoAdvance();
})();
