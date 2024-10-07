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
        'bio-content': 'We obtained a Ph.D. in Science at Tohoku University and have primarily been engaged in the development of mathematical models and simulations based on the principles of physics...',
        'vision': 'Vision',
        'vision-content': 'As participants in shaping the future, we contemplate what happiness truly means for humanity...',
        'policy': 'Policy',
        'policy-content': 'We humbly contribute to society, starting with small steps within our capabilities...',
        'proper-use': 'Proper Use of Science',
        'proper-use-content': 'Recognizing that reproducibility is a hallmark of science, we provide reproducible information.',
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
        'bio-content': '私たちは東北大学で理学博士号を取得し、主に物理学の原理に基づいた数理モデルとシミュレーションの開発に従事してきました...',
        'vision': 'ビジョン',
        'vision-content': '未来を形作る一員として、私たちは人類にとって本当の幸せとは何かを考えています...',
        'policy': '方針',
        'policy-content': '私たちは、自分たちのできる範囲で小さな一歩から社会に貢献します...',
        'proper-use': '科学の適正利用',
        'proper-use-content': '再現性は科学の特徴であることを認識し、再現可能な情報を提供します。',
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
