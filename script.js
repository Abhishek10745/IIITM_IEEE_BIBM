/**
 * AIPBDA 2026 Academic Workshop Scripts
 * Handles mobile navigation and strict countdown timer.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==================================================
       1. Mobile Navigation Toggle
       ================================================== */
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Close menu when clicking a link (mobile view)
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
            }
        });
    });

    /* ==================================================
       2. Scroll Spy (Active Navigation Highlighting)
       ================================================== */
    const sections = document.querySelectorAll('.content-section, .page-header');
    
    // Create a function to handle scroll checking so it can also be called on load
    const handleScrollSpy = () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Trigger threshold adjusted for sticky header
            if (window.scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        // Default to home if at the very top of the page
        if (window.scrollY < 100) {
            current = 'home';
        }

        navItems.forEach(item => {
            item.classList.remove('active');
            // Strict match check ensures empty string bugs do not highlight all links
            if (current && item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    };

    // Attach event listener and fire it once on load
    window.addEventListener('scroll', handleScrollSpy);
    handleScrollSpy();


    /* ==================================================
       3. Academic Deadline Countdown Widget
       ================================================== */
    // Format: YYYY-MM-DDTHH:MM:SS (Adjusted to BIBM Workshop Deadline)
    const deadlineStr = "2026-09-27T23:59:59";
    const deadline = new Date(deadlineStr).getTime();
    const countdownElement = document.getElementById('sidebar-countdown');

    if (countdownElement) {
        // Wrap the logic in a function so we can call it immediately
        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = deadline - now;

            // If the deadline has passed
            if (distance < 0) {
                clearInterval(timerInterval);
                countdownElement.innerHTML = "Submission Closed";
                countdownElement.style.color = "var(--text-muted)";
                return;
            }

            // Time calculations
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Format strictly, now including seconds so it visually ticks
            countdownElement.innerHTML = `${days}d : ${hours}h : ${minutes}m : ${seconds}s`;
        };

        // Call immediately to prevent the 1-second "Loading..." flash
        updateCountdown();
        
        // Run every second
        const timerInterval = setInterval(updateCountdown, 1000);
    }

});