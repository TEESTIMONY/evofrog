// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP and ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Make sure social links and buttons are visible by default
    gsap.set('.social-link, .hero-buttons .btn', { opacity: 1 });
    
    // Custom cursor
    initCustomCursor();
    
    // Navigation menu handling
    initNavigation();
    
    // Evolution stages animation
    initEvolutionStages();
    
    // Video handling
    initVideoPlayer();
    
    // Add floating animations to various elements
    initFloatingElements();
    
    // Parallax scrolling for background elements
    initParallaxScrolling();
    
    // Animations
    initAnimations();
    
    // Background bubble animations
    initBackgroundEffects();
});

// Custom cursor functionality
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    
    // Set initial position off-screen to avoid a jump
    gsap.set(cursor, { x: -100, y: -100 });
    
    document.addEventListener('mousemove', function(e) {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: 'power1.out'
        });
    });
    
    // Cursor effects on hover
    const hoverables = document.querySelectorAll('a, button, .btn, .play-button, .social-link, .timeline-item');
    
    hoverables.forEach(hoverable => {
        hoverable.addEventListener('mouseenter', () => {
            gsap.to(cursor, {
                scale: 1.5,
                duration: 0.3,
                backgroundColor: '#ff4081'
            });
        });
        
        hoverable.addEventListener('mouseleave', () => {
            gsap.to(cursor, {
                scale: 1,
                duration: 0.3,
                backgroundColor: '#ff4081'
            });
        });
    });
    
    // Hide cursor when it leaves the window
    document.addEventListener('mouseout', function(e) {
        if (e.relatedTarget === null) {
            gsap.to(cursor, {
                opacity: 0,
                duration: 0.3
            });
        }
    });
    
    document.addEventListener('mouseenter', function() {
        gsap.to(cursor, {
            opacity: 0.7,
            duration: 0.3
        });
    });
}

// Navigation handling (mobile menu toggle, scroll effects)
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.querySelector('#mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');
    const body = document.body;
    
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Toggle body class for overlay
            body.classList.toggle('menu-active');
            
            // Prevent body scrolling when menu is open
            if (navLinks.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
            
            console.log("Mobile menu toggled");
        });
    } else {
        console.error("Mobile menu button not found");
    }
    
    // Close mobile menu when link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                body.classList.remove('menu-active');
                body.style.overflow = '';
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = navLinks.contains(event.target);
        const isClickOnMenuBtn = mobileMenuBtn.contains(event.target);
        
        if (navLinks.classList.contains('active') && !isClickInsideMenu && !isClickOnMenuBtn) {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            body.classList.remove('menu-active');
            body.style.overflow = '';
        }
    });
    
    // Change navbar style on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Evolution stages rotation - Enhanced for mobile
function initEvolutionStages() {
    const stages = ['froakie', 'frogadier', 'greninja'];
    let currentIndex = 2; // Start with Greninja (index 2)
    
    // Check if stage elements exist
    const elementsExist = stages.every(stageName => {
        const element = document.getElementById(stageName);
        if (!element) {
            console.error(`Evolution stage element with ID "${stageName}" not found.`);
            return false;
        }
        return true;
    });
    
    if (!elementsExist) {
        console.warn("Some evolution stage elements are missing. Check if images are loaded properly.");
        return;
    }

    // Initial check to make sure at least one is visible
    let anyVisible = false;
    stages.forEach(stageName => {
        if (document.getElementById(stageName).classList.contains('active')) {
            anyVisible = true;
        }
    });
    
    // If none are visible, make Greninja visible
    if (!anyVisible) {
        document.getElementById('greninja').classList.add('active');
    }
    
    // Force reflow/repaint to ensure visibility
    document.getElementById('greninja').offsetHeight;
    
    // Auto rotate every 5 seconds
    setInterval(() => {
        try {
            // Remove active class from current stage
            const currentElement = document.getElementById(stages[currentIndex]);
            if (currentElement) {
                currentElement.classList.remove('active');
            }
            
            // Update index
            currentIndex = (currentIndex + 1) % stages.length;
            
            // Add active class to new stage
            const nextElement = document.getElementById(stages[currentIndex]);
            if (nextElement) {
                nextElement.classList.add('active');
                // Force repaint to ensure transition
                nextElement.offsetHeight;
            }
        } catch (error) {
            console.error("Error in evolution stages animation:", error);
        }
    }, 5000);
}

// Video player functionality
function initVideoPlayer() {
    const videoContainer = document.querySelector('.video-wrapper');
    const video = document.getElementById('evolution-video');
    
    if (videoContainer && video) {
        // Try to autoplay the video when it becomes visible in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Try to play the video when it's in view
                    const playPromise = video.play();
                    if (playPromise !== undefined) {
                        playPromise.catch(error => {
                            console.log('Autoplay prevented. User interaction required.', error);
                        });
                    }
                } else {
                    // Pause video when not in viewport to save resources
                    video.pause();
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(videoContainer);
    }
}

// GSAP animations
function initAnimations() {
    // Hero section animations
    gsap.from('.hero-content h1', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.2
    });
    
    // Typing animation for subtitle
    const subtitle = document.querySelector('.hero-content h2');
    if (subtitle) {
        const originalText = subtitle.textContent;
        subtitle.textContent = '';
        subtitle.style.opacity = 1;
        
        // Create typing animation
        let tl = gsap.timeline({delay: 0.6});
        tl.to(subtitle, {
            duration: 0.1,
            opacity: 1,
            onComplete: () => {
                let index = 0;
                const typingInterval = setInterval(() => {
                    subtitle.textContent = originalText.substring(0, index) + (index % 2 === 0 ? '|' : '');
                    index++;
                    if (index > originalText.length) {
                        subtitle.textContent = originalText;
                        clearInterval(typingInterval);
                        
                        // Add blinking cursor animation
                        const cursor = document.createElement('span');
                        cursor.className = 'typing-cursor';
                        cursor.textContent = '|';
                        subtitle.appendChild(cursor);
                        
                        gsap.to(cursor, {
                            opacity: 0,
                            duration: 0.8,
                            repeat: -1,
                            yoyo: true
                        });
                    }
                }, 100);
            }
        });
    }
    
    gsap.from('.hero-content p', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 1.5
    });
    
    gsap.from('.token-badge', {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        delay: 0.8,
        ease: 'back.out(1.7)'
    });
    
    gsap.from('.hero-buttons .btn', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 1,
        stagger: 0.2,
        onComplete: function() {
            // Ensure buttons stay visible after animation completes
            gsap.set('.hero-buttons .btn', { clearProps: "all" });
        }
    });
    
    // Scroll-triggered animations
    
    // About section
    gsap.from('.about-text', {
        x: -100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: '.about',
            start: 'top 80%',
            end: 'top 50%',
            toggleActions: 'play none none none'
        }
    });
    
    gsap.from('.about-image', {
        x: 100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: '.about',
            start: 'top 80%',
            end: 'top 50%',
            toggleActions: 'play none none none'
        }
    });
    
    // Timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        const direction = index % 2 === 0 ? -50 : 50;
        
        gsap.from(item, {
            x: direction,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                end: 'top 60%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    // Video section
    gsap.from('.video-wrapper', {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: '.video-section',
            start: 'top 80%',
            end: 'top 60%',
            toggleActions: 'play none none none'
        }
    });
    
    // Tokenomics section
    gsap.from('.token-card', {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: '.tokenomics',
            start: 'top 80%',
            end: 'top 60%',
            toggleActions: 'play none none none'
        }
    });
    
    // Community section
    gsap.from('.social-link', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
            trigger: '.community',
            start: 'top 80%',
            end: 'top 60%',
            toggleActions: 'play complete complete none'
        }
    });
    
    // Parallax effect for community section
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    
    if (parallaxLayers.length > 0) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const communitySection = document.querySelector('.community');
            
            if (communitySection) {
                const sectionTop = communitySection.offsetTop;
                const sectionHeight = communitySection.offsetHeight;
                
                if (scrollY > sectionTop - window.innerHeight && scrollY < sectionTop + sectionHeight) {
                    const yPos = (scrollY - sectionTop) * 0.1;
                    
                    gsap.to('.layer-1', {
                        y: yPos * 0.5,
                        duration: 0.5
                    });
                    
                    gsap.to('.layer-2', {
                        y: yPos * 0.3,
                        duration: 0.5
                    });
                    
                    gsap.to('.layer-3', {
                        y: yPos * 0.1,
                        duration: 0.5
                    });
                }
            }
        });
    }
    
    // Add rotating 3D effect to evolution cards on scroll
    gsap.utils.toArray('.timeline-image').forEach((image) => {
        gsap.to(image, {
            rotationY: 15,
            rotationX: 15,
            scale: 1.1,
            ease: 'power1.inOut',
            scrollTrigger: {
                trigger: image,
                start: 'top 70%',
                end: 'bottom 30%',
                scrub: 2,
                toggleActions: 'play complete reverse reset'
            }
        });
    });
}

// Add floating animations to various elements
function initFloatingElements() {
    // Gentle floating animation for token symbol
    gsap.to('.token-symbol', {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
    });
    
    // Floating animation for stat items with different timing
    gsap.utils.toArray('.stat-item').forEach((item, i) => {
        gsap.to(item, {
            y: -8,
            rotation: i % 2 === 0 ? 1 : -1,
            duration: 2 + (i * 0.2),
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.3
        });
    });
    
    // Add pulse effect to social links
    gsap.utils.toArray('.social-link').forEach((link, i) => {
        gsap.to(link, {
            scale: 1.05,
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.5
        });
    });
    
    // Add floating animation to footer logo
    gsap.to('.footer-logo', {
        y: -5,
        rotation: 2,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
    });
}

// Add parallax scrolling effects
function initParallaxScrolling() {
    // Parallax effect for hero background
    gsap.to('#hero-with-background:before', {
        backgroundPosition: '50% 30%',
        ease: 'none',
        scrollTrigger: {
            trigger: '#hero-with-background',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });
    
    // Parallax for about section image
    gsap.to('.about-image img', {
        y: -50,
        ease: 'none',
        scrollTrigger: {
            trigger: '.about',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });
    
    // Add zoom effect to evolution timeline on scroll
    gsap.to('.evolution-timeline', {
        scale: 1.05,
        ease: 'none',
        scrollTrigger: {
            trigger: '.evolution',
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: true
        }
    });
}

// Enhanced background effects
function initBackgroundEffects() {
    // Create and animate water ripples
    const rippleCount = 8;
    const tokenomicsSection = document.querySelector('.tokenomics');
    
    if (tokenomicsSection) {
        for (let i = 0; i < rippleCount; i++) {
            const ripple = document.createElement('div');
            ripple.classList.add('water-ripple');
            tokenomicsSection.appendChild(ripple);
            
            const size = Math.random() * 100 + 50;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const delay = Math.random() * 5;
            
            gsap.set(ripple, {
                width: size + 'px',
                height: size + 'px',
                left: x + '%',
                top: y + '%',
                opacity: 0,
                scale: 0
            });
            
            gsap.to(ripple, {
                opacity: 0.3,
                scale: 1,
                duration: 2,
                delay: delay,
                repeat: -1,
                onRepeat: () => {
                    gsap.set(ripple, {
                        left: Math.random() * 100 + '%',
                        top: Math.random() * 100 + '%'
                    });
                }
            });
            
            gsap.to(ripple, {
                opacity: 0,
                duration: 1,
                delay: delay + 1,
                repeat: -1
            });
        }
    }
    
    // Add shooting stars to the evolution section
    const evolutionSection = document.querySelector('.evolution');
    
    if (evolutionSection) {
        for (let i = 0; i < 5; i++) {
            const star = document.createElement('div');
            star.classList.add('shooting-star');
            evolutionSection.appendChild(star);
            
            // Random position and timing
            gsap.set(star, {
                left: -100,
                top: Math.random() * 80 + '%',
                opacity: 0
            });
            
            // Animation
            gsap.to(star, {
                left: '120%',
                opacity: 0.7,
                duration: Math.random() * 2 + 1,
                delay: Math.random() * 10,
                repeat: -1,
                repeatDelay: Math.random() * 7 + 3,
                ease: 'power1.in',
                onRepeat: () => {
                    gsap.set(star, {
                        top: Math.random() * 80 + '%'
                    });
                }
            });
        }
    }
}

// Loading animation
window.addEventListener('load', function() {
    // Add class to body to indicate loaded state
    document.body.classList.add('loaded');
    
    // Other load animations could be triggered here
}); 