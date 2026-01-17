document.addEventListener("DOMContentLoaded", function () {

    // 1. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close menu when link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger) hamburger.classList.remove('active');
            if (navLinks) navLinks.classList.remove('active');
        });
    });

    // 2. UPDATED: Smooth Scrolling & Hash Removal
    // এখন আমরা সব লিংক ধরছি যেগুলোতে # আছে
    document.querySelectorAll('a[href*="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // লিংকটি ভেঙে চেক করছি এটা একই পেজের সেকশন কি না
            // উদাহরণ: "/#about" কে ভেঙে path="/" আর hash="about" পাবো
            const parts = href.split('#');
            const path = parts[0];
            const hash = parts[1];

            // যদি লিংকটি বর্তমান পেজের হয় এবং হ্যাশ থাকে
            if ((path === '' || path === '/' || path === window.location.pathname) && hash) {
                const target = document.getElementById(hash);

                if (target) {
                    e.preventDefault(); // ডিফল্ট জাম্প বন্ধ করছি

                    // স্মুথ স্ক্রল
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });

                    // URL বার থেকে # সরিয়ে দিচ্ছি
                    history.pushState(null, null, ' ');

                    // মোবাইলে মেনু বন্ধ করার জন্য
                    if (hamburger) hamburger.classList.remove('active');
                    if (navLinks) navLinks.classList.remove('active');
                }
            }
        });
    });

    // 3. Project Filtering Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const projectItems = document.querySelectorAll('.project-box');

    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
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
    }

    // 4. Scroll Reveal Animation
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

    // 5. WhatsApp Integration
    document.querySelectorAll(".whatsapp-order").forEach(function (button) {
        button.addEventListener("click", function () {
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

    // 6. Contact Form Handling
    const form = document.getElementById("contactForm");
    const toast = document.getElementById("toast");

    if (form) {
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
        if (toast) {
            toast.classList.add("show");
            setTimeout(() => {
                toast.classList.remove("show");
            }, 3000);
        }
    }
});