document.querySelectorAll(".whatsapp-order").forEach(function (button) {
    button.addEventListener("click", function () {
        const phoneNumber = "8801569124294";
        const message = "Hi, I am interested in your services.";
        const encodedMsg = encodeURIComponent(message);

        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        const url = isMobile
            ? `whatsapp://send?phone=${phoneNumber}&text=${encodedMsg}`
            : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMsg}`;

        window.open(url, "_blank");
    });
});

const form = document.getElementById("contactForm");
const toast = document.getElementById("toast");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    fetch("https://formsubmit.co/scalerverse@gmail.com", {
        method: "POST",
        body: new FormData(form),
    })
        .then(response => {
            if (response.ok) {
                toast.classList.add("show");
                form.reset();

                setTimeout(() => {
                    toast.classList.remove("show");
                }, 3000); // Toast visible for 3 seconds
            } else {
                alert("Oops! Something went wrong.");
            }
        })
        .catch(error => {
            alert("Failed to send message.");
            console.error("Error:", error);
        });
});
document.addEventListener("DOMContentLoaded", function () {
    const categories = document.querySelectorAll('.project-category');
    const projects = document.querySelectorAll('.project-item');

    categories.forEach(category => {
        category.addEventListener('click', () => {
            const selectedCategory = category.getAttribute('data-category');

            // Remove visible class from all projects
            projects.forEach(project => {
                if (project.getAttribute('data-category') === selectedCategory) {
                    project.classList.add('visible');
                } else {
                    project.classList.remove('visible');
                }
            });
        });
    });
});

const tabs = document.querySelectorAll('.tab-btn');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('bg-blue-100', 'text-blue-700'));
        tab.classList.add('bg-blue-100', 'text-blue-700');

        contents.forEach(c => c.classList.add('hidden'));
        document.getElementById(tab.dataset.tab).classList.remove('hidden');
    });
});
document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked (for mobile)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Project filtering functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});