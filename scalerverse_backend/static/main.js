document.addEventListener("DOMContentLoaded", function () {
    // 1. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // 2. Project Filtering Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const projectItems = document.querySelectorAll('.project-box');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const category = btn.getAttribute('data-category');

            projectItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // 3. Scroll Reveal Animation
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });

    // 4. WhatsApp Integration (Updated)
    document.querySelectorAll(".whatsapp-order").forEach(function (button) {
        button.addEventListener("click", function () {
            // UPDATED Number
            const phoneNumber = "8801949059596";
            const message = "Hi, I am interested in your services.";
            const encodedMsg = encodeURIComponent(message);
    
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
            const url = isMobile
                ? `whatsapp://send?phone=${phoneNumber}&text=${encodedMsg}`
                : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMsg}`;
    
            window.open(url, "_blank");
        });
    });

    // 5. Contact Form Handling
    const form = document.getElementById("contactForm");
    const toast = document.getElementById("toast");

    if(form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            
            fetch("https://formsubmit.co/scalerverse@gmail.com", {
                method: "POST",
                body: new FormData(form),
            })
            .then(response => {
                showToast();
                form.reset();
            })
            .catch(error => {
                console.error("Error:", error);
                showToast(); 
                form.reset();
            });
        });
    }

    function showToast() {
        toast.classList.add("show");
        setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    }
});