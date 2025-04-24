// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default anchor click behavior

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = document.querySelector('.header')?.offsetHeight || 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Close mobile nav if open after clicking a link
                // Ensure nav and navToggle are defined in this scope or globally accessible
                const nav = document.querySelector('.main-nav');
                const navToggle = document.querySelector('.nav-toggle');
                if (nav && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    if (navToggle) {
                        navToggle.setAttribute('aria-expanded', 'false');
                    }
                }
            }
        });
    });

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.main-nav');

    if (navToggle && nav) {
        navToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            // Toggle aria-expanded attribute for accessibility
            const isExpanded = nav.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isExpanded);
        });
    }

    // Simple alert for form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent actual submission for this example
            const message = "Thank you for your message! We'll get back to you soon.";
            displayMessageBox(message);
            // this.reset(); // Uncomment to clear form after submission
        });
    }

    // Function to display a custom message box
    function displayMessageBox(message) {
        const existingBox = document.getElementById('custom-message-box');
        if (existingBox) {
            existingBox.remove();
        }

        const messageBox = document.createElement('div');
        messageBox.id = 'custom-message-box';
        // Basic styling (can be moved to CSS for better separation)
        messageBox.style.position = 'fixed';
        messageBox.style.top = '80px'; // Position below sticky header
        messageBox.style.left = '50%';
        messageBox.style.transform = 'translateX(-50%)';
        messageBox.style.padding = '15px 25px';
        messageBox.style.backgroundColor = '#2ecc71';
        messageBox.style.color = 'white';
        messageBox.style.borderRadius = '5px';
        messageBox.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        messageBox.style.zIndex = '2000';
        messageBox.style.textAlign = 'center';
        messageBox.style.opacity = '0';
        messageBox.style.transition = 'opacity 0.5s ease';

        messageBox.textContent = message;
        document.body.appendChild(messageBox);

        // Fade in
        setTimeout(() => { messageBox.style.opacity = '1'; }, 10); // Small delay for transition

        // Fade out and remove
        setTimeout(() => {
            messageBox.style.opacity = '0';
            setTimeout(() => { messageBox.remove(); }, 500); // Wait for fade-out transition
        }, 4000); // Display for 4 seconds
    }

    console.log("Flooring Guys Website Script Loaded and Initialized.");
}); // End DOMContentLoaded
