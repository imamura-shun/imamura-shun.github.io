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

sections.forEach(section => {
    observer.observe(section);
});

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, options);


// Extend the translations
translations.en['cv-name'] = "Name: Shun Imamura";
translations.en['cv-contact'] = "Contact";
translations.en['cv-education'] = "Education";
translations.en['cv-employment'] = "Employment";
translations.en['cv-publications'] = "Publications";
translations.en['cv-presentations'] = "Presentations";
translations.en['cv-skills'] = "Skills";
translations.en['cv-languages'] = "Language Skills";
translations.en['cv-memberships'] = "Memberships";
translations.en['cv-hobbies'] = "Hobbies";

// Add Japanese translations
translations.ja['cv-name'] = "氏名: 今村 舜";
translations.ja['cv-contact'] = "連絡先";
translations.ja['cv-education'] = "学歴";
translations.ja['cv-employment'] = "職歴";
translations.ja['cv-publications'] = "出版物";
translations.ja['cv-presentations'] = "発表";
translations.ja['cv-skills'] = "スキル";
translations.ja['cv-languages'] = "言語スキル";
translations.ja['cv-memberships'] = "会員";
translations.ja['cv-hobbies'] = "趣味";


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
