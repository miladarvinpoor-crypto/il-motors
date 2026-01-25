/* ===========================
   DOM Elements
   =========================== */

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const dropdowns = document.querySelectorAll('.dropdown');
const navLinks = document.querySelectorAll('.nav-link');

/* ===========================
   Hamburger Menu Toggle
   =========================== */

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

/* ===========================
   Close Menu on Link Click
   =========================== */

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Don't close if it's a dropdown toggle
        if (!link.classList.contains('dropdown-toggle')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

/* ===========================
   Mobile Dropdown Toggle
   =========================== */

dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    
    toggle.addEventListener('click', (e) => {
        // Only toggle on mobile
        if (window.innerWidth <= 768) {
            e.preventDefault();
            
            // Close other dropdowns
            dropdowns.forEach(other => {
                if (other !== dropdown) {
                    other.classList.remove('active');
                }
            });
            
            // Toggle current dropdown
            dropdown.classList.toggle('active');
        }
    });
});

/* ===========================
   Close Menu on Outside Click
   =========================== */

document.addEventListener('click', (e) => {
    const isClickInsideNav = navMenu.contains(e.target) || hamburger.contains(e.target);
    
    if (!isClickInsideNav && window.innerWidth <= 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
});

/* ===========================
   Smooth Scroll Offset for Fixed Header
   =========================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Only handle anchor links
        if (href !== '#') {
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

/* ===========================
   Reset Dropdowns on Window Resize
   =========================== */

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    }, 250);
});

/* ===========================
   Intersection Observer for Fade-In Animation
   =========================== */

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all content sections
document.querySelectorAll('.content-section, .featured-section, .categories-section, .social-section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

/* ===========================
   Active Navigation Link Indicator
   =========================== */

const setActiveNavLink = () => {
    const sections = document.querySelectorAll('[id]');
    const headerHeight = document.querySelector('.header').offsetHeight;
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollY >= sectionTop - headerHeight - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
};

// Only activate if on desktop
if (window.innerWidth > 768) {
    setActiveNavLink();
}

/* ===========================
   Lazy Load Images (Optional Enhancement)
   =========================== */

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

/* ===========================
   Keyboard Navigation
   =========================== */

document.addEventListener('keydown', (e) => {
    // Close menu on Escape key
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
});

/* ===========================
   Utility: Check if Element in Viewport
   =========================== */

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/* ===========================
   Page Load Animation
   =========================== */

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Initial state
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

// Fade in after slight delay
setTimeout(() => {
    document.body.style.opacity = '1';
}, 100);
