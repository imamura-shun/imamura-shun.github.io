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
        'bio-content': 'We obtained a Ph.D. in Science at Tohoku university and have primarily been engaged in the development of mathematical models and simulations based on the principles of physics. We developed an interest in programming through games and entered a National College of Technology. For our graduation research, we conducted simulations of passive walking models. We developed a keen interest in the phenomena of nonlinear and non-equilibrium systems, as well as the fundamental principles of physics such as variational principles, conservation laws, and symmetry. At university, we majored in physics and learned the basics of mathematical modeling to describe complex phenomena using symmetry and conservation laws. Our recent research has mainly focused on active matter (objects with self-propulsion mechanisms), from modeling their motion mechanisms to simulating their collective systems.',
        'vision': 'Vision',
        'vision-content': 'As participants in shaping the future, we contemplate what happiness truly means for humanity. In the current era marked by the 4th Industrial Revolution (rapid advancements in AI, cryptocurrencies, etc.), we earnestly confront energy and environmental challenges. In this VUCA (Volatile, Uncertain, Complex, Ambiguous) era, we strive to rectify issues such as poverty and inequality.',
        'policy': 'Policy',
        'policy-content': 'We humbly contribute to society, starting with small steps within our capabilities. Throughout our lives, we commit to continuous learning and creation.',
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
        'bio-content': '博士（理学）を取得．主に物理学の原理に基づいた数理モデルやシミュレーションの開発に従事．ゲームを通して，プログラミングに興味を持ち，高専に進学．卒業研究では受動歩行モデルのシミュレーションを行う．非線形・非平衡系の現象，物理学の変分原理や保存則，対称性といった原理的な思考に興味を抱く．大学では，物理学を専攻し，対称性や保存則を用いて複雑な現象を記述するための数理モデリングの基礎を学ぶ．これまでの研究では，アクティブマター（自己駆動機構を持つ物体）に関して，その運動機構のモデリングからその集団系のシミュレーションを主に行っている．',
        'vision': 'ビジョン',
        'vision-content': '未来を創る当事者として，人類にとっての幸せとは何かを考える．第４次産業革命（AI, 暗号通貨等の急速な発展）が起こっている現代において，エネルギー・環境問題に真摯に向き合う．VUCA時代に生じる貧困や，格差などの問題に対して，それらを是正を目指す．',
        'policy': 'ポリシー',
        'policy-content': 'できることから少しずつ，謙虚に社会への貢献を行う．生きている間，生涯を通して，学び続ける，創り続ける．',
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
