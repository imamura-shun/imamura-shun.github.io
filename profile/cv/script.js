// Smooth scroll implementation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Add class when section is in the viewport
const sections = document.querySelectorAll("section");
const options = {
    root: null,
    threshold: 0.1,
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, options);

sections.forEach(section => {
    observer.observe(section);
});

// Text content for English and Japanese
const translations = {
    en: {
        'page-title': "Imamura's profile",
        'page-subtitle': "Welcome to Shun Imamura's webpage",
        'menu-top': "Top",
        'menu-about-us': "About us",
        'menu-cv': "CV",
        'menu-simulation': "Simulation",
        'menu-notebook': "Notebook",
        'menu-privacy-policy': "Privacy Policy",
        'cv-title': "CV",
        'cv-name': "Name: Shun Imamura",
        'cv-contact': "Contact:",
        'cv-education': "Education",
        'cv-employment': "Employment",
        'cv-publications': "Publications",
        'cv-presentations': "Presentations",
        'cv-skills': "Skills",
        'cv-languages': "Language Skills",
        'cv-memberships': "Memberships",
        'cv-society-activities': "Society Activities",
        'cv-hobbies': "Hobbies"
    },
    ja: {
        'page-title': 'Imamuraのプロフィール',
        'page-subtitle': 'ようこそ Shun Imamura のウェブページへ',
        'menu-top': "Top",
        'menu-about-us': "About us",
        'menu-cv': "CV",
        'menu-simulation': "Simulation",
        'menu-notebook': "Notebook",
        'menu-privacy-policy': "Privacy Policy",
        'cv-title': "CV",
        'cv-name': "氏名: 今村 舜",
        'cv-contact': "連絡先:",
        'cv-education': "学歴",
        'cv-employment': "職歴",
        'cv-publications': "出版物",
        'cv-presentations': "プレゼンテーション",
        'cv-skills': "スキル",
        'cv-languages': "言語スキル",
        'cv-memberships': "所属学会",
        'cv-society-activities': "学会活動",
        'cv-hobbies': "趣味"
    }
};

// Function to switch languages
function switchLanguage(lang) {
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        el.textContent = translations[lang][key];
    });
}

// Event listeners for language buttons
document.getElementById('en-btn').addEventListener('click', () => switchLanguage('en'));
document.getElementById('ja-btn').addEventListener('click', () => switchLanguage('ja'));

// Add functionality for the collapsible menu
document.getElementById('toggle-menu').addEventListener('click', function() {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('expanded'); // Toggle between collapsed and expanded state
});
