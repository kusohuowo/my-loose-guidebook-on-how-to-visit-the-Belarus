let regionDatabase = {
    minsk: {
        index: "01",
        title: "Минская область",
        text: "Центральный узел и сердце страны. Регион объединяет развитую инфраструктуру мегаполиса с аутентичным наследием древнего Заславля и замковой архитектуры Несвижа, охраняемой ЮНЕСКО."
    },
    brest: {
        index: "02",
        title: "Брестская область",
        text: "Западные рубежи и ключевой транспортный коридор. Земля монументальной памяти Брестской крепости и первозданной природы Национального парка «Беловежская пуща»."
    },
    vitebsk: {
        index: "03",
        title: "Витебская область",
        text: "Озерный край с глубоким культурным кодом. Колыбель белорусской государственности в Полоцке и родина мирового авангарда, вдохновившая Марка Шагала."
    },
    gomel: {
        index: "04",
        title: "Гомельская область",
        text: "Южный Полесский ландшафт и индустриальный базис. Крупнейший по площади регион, выделяющийся живописной экосистемой реки Припять и дворцово-парковыми ансамблями."
    },
    grodno: {
        index: "05",
        title: "Гродненская область",
        text: "Исторический центр замковой культуры. Край с уникальной концентрацией готической и барочной архитектуры, включая королевские резиденции в Гродно и Мирский замок."
    },
    mogilev: {
        index: "06",
        title: "Могилевская область",
        text: "Восточный вектор развития вдоль русла Днепра. Исторический узел торговых путей, известный своей ратушной архитектурой и мемориальными комплексами."
    }
};
let map = document.querySelector('.region-map')
let cards = document.querySelectorAll('.region-card');
let panel = document.querySelector('#detailsPanel');
let detailsIndex = document.querySelector('#detailsIndex');
let detailsTitle = document.querySelector('#detailsTitle');
let detailsText = document.querySelector('#detailsText');

// map.addEventListener('click', function(){
//     map.forEach(part => {
//     part.addEventListener('click', () => {
//         let regkey = part.getAttribute('map-region')
//         let bimbim = regionDatabase[regkey]

//         map.forEach(m => m.classList.remove('active'))
//         part.classList.add('active')

//         panel.classList.remove('updated');
//         void panel.offsetWidth; 
//         panel.classList.add('updated');

//         detailsIndex.innerText = data.index;
//         detailsTitle.innerText = data.title;
//         detailsText.innerText = data.text;
//     })
// })
// })

cards.forEach(card => {
    card.addEventListener('click', () => {
        let key = card.getAttribute('data-region');
        let data = regionDatabase[key];

        cards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');

        panel.classList.remove('updated');
        void panel.offsetWidth; 
        panel.classList.add('updated');

        detailsIndex.innerText = data.index;
        detailsTitle.innerText = data.title;
        detailsText.innerText = data.text;
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});

document.addEventListener('click', () => {
    let iframe = document.querySelector('#video');
    if (iframe) {
        iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    }
}, { once: true });

function animateCounter(el) {
    const target = parseFloat(el.getAttribute('data-target'));
    const duration = 2000;
    const start = performance.now();
    const prefix = el.getAttribute('data-prefix') || '';

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = progress * (2 - progress);
        const current = eased * target;

        if (Number.isInteger(target)) {
            el.textContent = prefix + Math.round(current);
        } else {
            const decimals = (target.toString().split('.')[1] || '').length;
            el.textContent = prefix + current.toFixed(decimals);
        }

        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

const factsSection = document.querySelector('.facts');
if (factsSection) {
    new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.fact-value[data-target]').forEach(el => {
                    if (!el.classList.contains('counted')) {
                        el.classList.add('counted');
                        animateCounter(el);
                    }
                });
            }
        });
    }, { threshold: 0.3 }).observe(factsSection);
}

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.header-nav-links');
if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navLinks.classList.toggle('open');
    });
}

const toggle = document.querySelector('.theme-toggle');
const html = document.documentElement;
const saved = localStorage.getItem('theme');
if (saved) html.setAttribute('data-theme', saved);
if (toggle) {
    toggle.addEventListener('click', () => {
        const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });
}
