const Portfolio = {
    init() {
        document.addEventListener("DOMContentLoaded", () => {
            this.loadSections();
            this.setupNavigation();
            this.setupTalksObserver();
        });
    },

    loadSections() {
        const sections = ['meet', 'faq', 'sponsors', 'tracks', 'talks', 'contact'];
        sections.forEach(section => {
            this.loadSectionContent(section);
            this.setupSectionToggle(section);
        });
    },

    loadSectionContent(section) {
        fetch(`${section}.html`)
            .then(response => response.text())
            .then(data => {
                document.getElementById(section).innerHTML = data;
            })
            .catch(error => {
                console.error(`Error loading ${section}.html:`, error);
                document.getElementById(section).innerHTML = "<p>Error loading content</p>";
            });
    },

    setupNavigation() {
        const navLinks = document.querySelectorAll(".nav-link");
        const sectionElements = document.querySelectorAll(".section");
        const heroSection = document.querySelector(".hero-sec");
        const homeLink = document.getElementById("home-link");

        // Initially hide all sections
        sectionElements.forEach(section => {
            section.style.display = "none";
            section.classList.remove("active");
        });

        // Handle home link click
        homeLink.addEventListener("click", (e) => {
            e.preventDefault();
            this.hideAllSections(sectionElements);
            heroSection.classList.remove("dim");
            navLinks.forEach(link => link.classList.remove("active"));
            homeLink.classList.add("active");
        });

        // Handle other nav links
        navLinks.forEach(link => {
            if (link.id !== "home-link") {
                link.addEventListener("click", e => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const sectionId = link.getAttribute("data-section");
                    
                    navLinks.forEach(l => l.classList.remove("active"));
                    link.classList.add("active");
                    
                    this.showSection(sectionId, sectionElements);
                    heroSection.classList.add("dim"); // Dim hero when showing sections
                });
            }
        });
    },

    hideAllSections(sections) {
        sections.forEach(section => {
            section.classList.remove("active");
            section.style.display = "none";
        });
    },

    showSection(sectionId, sections) {
        this.hideAllSections(sections);
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.style.display = "block";
            // Force a reflow
            targetSection.offsetHeight;
            targetSection.classList.add("active");
        }
    },

    setupSectionToggle(section) {
        document.getElementById(section)?.addEventListener("click", e => {
            if (e.target.tagName === "H2") {
                const content = e.target.parentElement;
                content.classList.toggle("collapsed");
                e.target.classList.toggle("collapsed");
            }
        });
    },

    setupTalksObserver() {
        const talksSection = document.getElementById('talks');
        if (!talksSection) return;

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadTalks(); // Assuming this function is defined in talks.js
                    observer.disconnect();
                }
            });
        });
        observer.observe(talksSection);
    }
};

export default Portfolio;