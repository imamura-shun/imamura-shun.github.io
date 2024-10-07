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
        'about-us': 'About Us',
        'biography': 'Biography',
        'bio-content': 'We obtained a Ph.D. in Science at Tohoku University and have primarily been engaged in the development of mathematical models and simulations based on the principles of physics. We developed an interest in programming through games and entered a National College of Technology. For our graduation research, we conducted simulations of passive walking models. We developed a keen interest in the phenomena of nonlinear and non-equilibrium systems, as well as the fundamental principles of physics such as variational principles, conservation laws, and symmetry. At university, we majored in physics and learned the basics of mathematical modeling to describe complex phenomena using symmetry and conservation laws. Our recent research has mainly focused on active matter (objects with self-propulsion mechanisms), from modeling their motion mechanisms to simulating their collective systems.',
        'menu-top': "Top",
        'menu-about-us': "About us",
        'menu-cv': "CV",
        'menu-simulation': "Simulation",
        'menu-notebook': "Notebook",
        'menu-privacy-policy': "Privacy Policy",
    },
    ja: {
        'page-title': 'Imamuraのプロフィール',
        'page-subtitle': 'ようこそ Shun Imamura のウェブページへ',
        'about-us': '私たちについて',
        'biography': '経歴',
        'bio-content': '東北大学で博士号(理学)を取得し，主に物理学の原理に基づいた数理モデルとシミュレーションの開発に従事してきました．ゲームを通じてプログラミングに興味を持ち，高専に進学しました．卒業研究では，受動歩行モデルのシミュレーションを行いました．非線形・非平衡系の現象や，変分原理，保存則，対称性といった物理学の基本原理に強い興味を持ちました．大学では物理学を専攻し，対称性と保存則を用いて複雑な現象を記述する数理モデリングの基礎を学びました．最近では，主にアクティブマター（自己推進機構を持つ物体）を対象に，その運動機構のモデル化から集団シミュレーションから創出される普遍性などを研究しています．',
        'menu-top': "Top",
        'menu-about-us': "About us",
        'menu-cv': "CV",
        'menu-simulation': "Simulation",
        'menu-notebook': "Notebook",
        'menu-privacy-policy': "Privacy Policy",
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
