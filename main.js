/**
 * Friendly & Untamed - Main JavaScript
 * Wildlife Photography Portfolio
 */

// Import styles
import './style.css';

// ========================================
// MOBILE NAVIGATION
// ========================================
function initMobileNav() {
    const toggle = document.querySelector('.navbar__toggle');
    const mobileMenu = document.querySelector('.navbar__mobile-menu');

    if (!toggle || !mobileMenu) return;

    toggle.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.contains('active');

        mobileMenu.classList.toggle('active');
        toggle.setAttribute('aria-expanded', !isOpen);

        // Animate hamburger to X
        const lines = toggle.querySelectorAll('.navbar__toggle-line');
        if (!isOpen) {
            lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            lines[1].style.opacity = '0';
            lines[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            lines[0].style.transform = '';
            lines[1].style.opacity = '';
            lines[2].style.transform = '';
        }
    });

    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// ========================================
// HERO CAROUSEL
// ========================================
function initCarousel() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;

    const track = carousel.querySelector('.carousel__track');
    const slides = carousel.querySelectorAll('.carousel__slide');
    const indicatorsContainer = carousel.querySelector('.carousel__indicators');

    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    let autoplayInterval;
    const AUTOPLAY_DELAY = 4000; // 4 seconds as requested

    // Create indicators
    slides.forEach((_, i) => {
        const indicator = document.createElement('button');
        indicator.className = `carousel__indicator${i === 0 ? ' carousel__indicator--active' : ''}`;
        indicator.setAttribute('aria-label', `Go to slide ${i + 1}`);
        indicator.addEventListener('click', (e) => {
            e.stopPropagation();
            goToSlide(i);
            resetAutoplay();
        });
        indicatorsContainer.appendChild(indicator);
    });

    const indicators = indicatorsContainer.querySelectorAll('.carousel__indicator');

    function goToSlide(index) {
        // Handle cyclical navigation
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;

        // Update slides
        slides[currentIndex].classList.remove('carousel__slide--active');
        slides[currentIndex].setAttribute('aria-hidden', 'true');

        slides[index].classList.add('carousel__slide--active');
        slides[index].setAttribute('aria-hidden', 'false');

        // Update indicators
        indicators[currentIndex].classList.remove('carousel__indicator--active');
        indicators[index].classList.add('carousel__indicator--active');

        currentIndex = index;
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    function startAutoplay() {
        stopAutoplay();
        autoplayInterval = setInterval(nextSlide, AUTOPLAY_DELAY);
    }

    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
        }
    }

    function resetAutoplay() {
        stopAutoplay();
        startAutoplay();
    }

    // Click on left/right side to navigate
    carousel.addEventListener('click', (e) => {
        // Don't navigate if clicking on indicators
        if (e.target.closest('.carousel__indicators')) return;

        const rect = carousel.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const halfWidth = rect.width / 2;

        if (clickX < halfWidth) {
            // Clicked on left side - go to previous
            prevSlide();
        } else {
            // Clicked on right side - go to next
            nextSlide();
        }
        resetAutoplay();
    });

    // Start autoplay
    startAutoplay();

    // Pause when page is hidden
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoplay();
        } else {
            startAutoplay();
        }
    });
}

// ========================================
// SCROLL ANIMATIONS
// ========================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');

    if (animatedElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.animateDelay || 0;
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
}

// ========================================
// TRANSPARENT NAVBAR ON HOME
// ========================================
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const carousel = document.querySelector('.carousel');

    // If there's a carousel, make navbar transparent until scrolled past it
    // Otherwise, make navbar solid immediately
    function updateNavbar() {
        const currentScroll = window.pageYOffset;

        if (carousel) {
            // On home page with carousel
            if (currentScroll > 50) {
                navbar.classList.add('navbar--scrolled');
            } else {
                navbar.classList.remove('navbar--scrolled');
            }
        } else {
            // On other pages without carousel - always solid
            navbar.classList.add('navbar--scrolled');
        }
    }

    // Initial check
    updateNavbar();

    // Listen for scroll
    window.addEventListener('scroll', updateNavbar);
}

// ========================================
// GALLERY - Dynamic Category Tiles with Lightbox
// ========================================

// Gallery data with all images per category
const galleryData = {
    'stripes-in-sync': {
        title: 'Stripes in Sync',
        images: [
            '/assets/images/portfolio/Stripes in sync/SDG_0876.webp',
            '/assets/images/portfolio/Stripes in sync/SDG_0906.webp',
            '/assets/images/portfolio/Stripes in sync/SDG_0909.webp',
            '/assets/images/portfolio/Stripes in sync/SDG_0938-2.webp',
            '/assets/images/portfolio/Stripes in sync/SDG_1035-Enhanced-NR.webp',
            '/assets/images/portfolio/Stripes in sync/SDG_1045.webp',
            '/assets/images/portfolio/Stripes in sync/SDG_1055.webp',
            '/assets/images/portfolio/Stripes in sync/SDG_1060.webp',
            '/assets/images/portfolio/Stripes in sync/SDG_1134.webp',
            '/assets/images/portfolio/Stripes in sync/SDG_1157.webp'
        ]
    },
    'cold-dessert': {
        title: 'The Cold Dessert',
        images: [
            '/assets/images/portfolio/The cold dessert/SDG_6671.webp',
            '/assets/images/portfolio/The cold dessert/SDG_7094.webp',
            '/assets/images/portfolio/The cold dessert/SDG_7184.webp',
            '/assets/images/portfolio/The cold dessert/SDG_7759.webp',
            '/assets/images/portfolio/The cold dessert/SDG_7945.webp',
            '/assets/images/portfolio/The cold dessert/SDG_8193.webp',
            '/assets/images/portfolio/The cold dessert/SDG_8197-2.webp',
            '/assets/images/portfolio/The cold dessert/SDG_8409-3.webp',
            '/assets/images/portfolio/The cold dessert/SDG_8839.webp'
        ]
    },
    'wetlands-vibes': {
        title: 'Wetlands Vibes',
        images: [
            '/assets/images/portfolio/Wetlands vibes/SDG_4288-2.webp',
            '/assets/images/portfolio/Wetlands vibes/SDG_8938-Enhanced-NR.webp',
            '/assets/images/portfolio/Wetlands vibes/SDG_8941.webp',
            '/assets/images/portfolio/Wetlands vibes/SDG_8950.webp',
            '/assets/images/portfolio/Wetlands vibes/SDG_8975.webp',
            '/assets/images/portfolio/Wetlands vibes/SDG_9032-3.webp'
        ]
    },
    'owls': {
        title: 'Owls!',
        images: [
            '/assets/images/portfolio/Owls!/SDG_3433.webp',
            '/assets/images/portfolio/Owls!/SDG_3623.webp',
            '/assets/images/portfolio/Owls!/SDG_7759.webp',
            '/assets/images/portfolio/Owls!/SDG_8839.webp'
        ]
    },
    'deep-jungle': {
        title: 'Deep into the Jungle',
        images: [
            '/assets/images/portfolio/Deep into the jungle/SDG_2319.webp',
            '/assets/images/portfolio/Deep into the jungle/SDG_2586-Enhanced-NR.webp',
            '/assets/images/portfolio/Deep into the jungle/SDG_8069.webp',
            '/assets/images/portfolio/Deep into the jungle/SDG_8229.webp',
            '/assets/images/portfolio/Deep into the jungle/SDG_9076.webp'
        ]
    }
};

let lightboxCurrentIndex = 0;
let lightboxImages = [];
let lightboxTitle = '';

function createLightbox() {
    // Only create if it doesn't exist
    if (document.getElementById('lightbox')) return;

    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
    <div class="lightbox__overlay"></div>
    <button class="lightbox__close" aria-label="Close gallery">&times;</button>
    <div class="lightbox__content">
      <button class="lightbox__nav lightbox__nav--prev" aria-label="Previous image">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <div class="lightbox__image-container">
        <img class="lightbox__image" src="" alt="">
      </div>
      <button class="lightbox__nav lightbox__nav--next" aria-label="Next image">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
    <div class="lightbox__info">
      <span class="lightbox__title"></span>
      <span class="lightbox__counter"></span>
    </div>
  `;

    document.body.appendChild(lightbox);

    // Event listeners
    const overlay = lightbox.querySelector('.lightbox__overlay');
    const closeBtn = lightbox.querySelector('.lightbox__close');
    const prevBtn = lightbox.querySelector('.lightbox__nav--prev');
    const nextBtn = lightbox.querySelector('.lightbox__nav--next');
    const imageContainer = lightbox.querySelector('.lightbox__image-container');

    overlay.addEventListener('click', closeLightbox);
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showLightboxImage(lightboxCurrentIndex - 1); });
    nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showLightboxImage(lightboxCurrentIndex + 1); });

    // Click on image container for prev/next
    imageContainer.addEventListener('click', (e) => {
        const rect = imageContainer.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const halfWidth = rect.width / 2;

        if (clickX < halfWidth) {
            showLightboxImage(lightboxCurrentIndex - 1);
        } else {
            showLightboxImage(lightboxCurrentIndex + 1);
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showLightboxImage(lightboxCurrentIndex - 1);
        if (e.key === 'ArrowRight') showLightboxImage(lightboxCurrentIndex + 1);
    });
}

function openLightbox(categoryId) {
    const category = galleryData[categoryId];
    if (!category) return;

    lightboxImages = category.images;
    lightboxTitle = category.title;
    lightboxCurrentIndex = 0;

    const lightbox = document.getElementById('lightbox');
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';

    showLightboxImage(0);
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function showLightboxImage(index) {
    // Cyclical navigation
    if (index < 0) index = lightboxImages.length - 1;
    if (index >= lightboxImages.length) index = 0;

    lightboxCurrentIndex = index;

    const lightbox = document.getElementById('lightbox');
    const img = lightbox.querySelector('.lightbox__image');
    const title = lightbox.querySelector('.lightbox__title');
    const counter = lightbox.querySelector('.lightbox__counter');

    img.src = lightboxImages[index];
    img.alt = `${lightboxTitle} - Photo ${index + 1}`;
    title.textContent = lightboxTitle;
    counter.textContent = `${index + 1} / ${lightboxImages.length}`;
}

function initGallery() {
    const categoriesContainer = document.getElementById('gallery-categories');
    if (!categoriesContainer) return;

    // Create lightbox
    createLightbox();

    // Gallery categories with captions
    const categories = [
        {
            id: 'stripes-in-sync',
            title: 'Stripes in Sync',
            caption: 'Stripes moving with the rhythm of the forest: power, precision, and presence held in perfect balance.',
        },
        {
            id: 'cold-dessert',
            title: 'The Cold Dessert',
            caption: 'Soft moments in a stark land: quiet resilience, gentle curiosity, and unexpected warmth in the cold desert.',
        },
        {
            id: 'wetlands-vibes',
            title: 'Wetlands Vibes',
            caption: 'Quiet waters, shifting light, and life moving at its own pace: wetlands where reflections speak as loudly as wings.',
        },
        {
            id: 'owls',
            title: 'Owls!',
            caption: 'Guardians of the night: still, watchful, and impossibly calm, seen when the forest begins to whisper.',
        },
        {
            id: 'deep-jungle',
            title: 'Deep into the Jungle',
            caption: 'Where light fades, patience grows, and every movement feels earned, life unfolding beneath dense canopies.',
        }
    ];

    categories.forEach(category => {
        const data = galleryData[category.id];
        if (!data) return;

        const images = data.images;
        const mainImage = images[0];
        const previewImages = images.slice(1, 5); // Show up to 4 preview thumbnails

        const card = document.createElement('article');
        card.className = 'portfolio-card';

        // Build preview thumbnails HTML
        const previewsHTML = previewImages.map(img =>
            `<img src="${img}" alt="" class="portfolio-card__preview" loading="lazy">`
        ).join('');

        const remainingCount = images.length - 5;
        const moreHTML = remainingCount > 0
            ? `<span class="portfolio-card__more">+${remainingCount}</span>`
            : '';

        card.innerHTML = `
      <div class="portfolio-card__main">
        <img src="${mainImage}" alt="${category.title}" class="portfolio-card__image" loading="lazy">
      </div>
      <div class="portfolio-card__info">
        <h2 class="portfolio-card__title">${category.title}</h2>
        <p class="portfolio-card__caption">${category.caption}</p>
        <div class="portfolio-card__previews">
          ${previewsHTML}
          ${moreHTML}
        </div>
        <span class="portfolio-card__count">${images.length} photos</span>
      </div>
    `;

        // Open lightbox on click
        card.addEventListener('click', () => {
            openLightbox(category.id);
        });

        categoriesContainer.appendChild(card);
    });
}

// ========================================
// FOOTER YEAR
// ========================================
function updateFooterYear() {
    const yearSpan = document.querySelector('.footer__year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

// ========================================
// IMAGE PROTECTION
// ========================================
function initImageProtection() {
    const copyrightMessage = '© Friendly and Untamed by Saumya Gupta. All images are protected by copyright.';

    // Disable right-click context menu
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        alert(copyrightMessage);
        return false;
    });

    // Disable keyboard shortcuts for saving
    document.addEventListener('keydown', (e) => {
        // Ctrl+S, Ctrl+Shift+S, Ctrl+P (print), Ctrl+Shift+I (dev tools), F12
        if (
            (e.ctrlKey && e.key === 's') ||
            (e.ctrlKey && e.shiftKey && e.key === 'S') ||
            (e.ctrlKey && e.key === 'p') ||
            (e.ctrlKey && e.shiftKey && e.key === 'I') ||
            e.key === 'F12'
        ) {
            e.preventDefault();
            alert(copyrightMessage);
            return false;
        }

        // Cmd+S for Mac
        if (e.metaKey && e.key === 's') {
            e.preventDefault();
            alert(copyrightMessage);
            return false;
        }
    });

    // Disable image dragging
    document.querySelectorAll('img').forEach(img => {
        img.setAttribute('draggable', 'false');
        img.addEventListener('dragstart', (e) => e.preventDefault());
    });

    // Also apply to dynamically loaded images
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeName === 'IMG') {
                    node.setAttribute('draggable', 'false');
                    node.addEventListener('dragstart', (e) => e.preventDefault());
                }
                if (node.querySelectorAll) {
                    node.querySelectorAll('img').forEach(img => {
                        img.setAttribute('draggable', 'false');
                        img.addEventListener('dragstart', (e) => e.preventDefault());
                    });
                }
            });
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

// ========================================
// INITIALIZE
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    initCarousel();
    initScrollAnimations();
    initNavbarScroll();
    initGallery();
    updateFooterYear();
    initImageProtection();
});
