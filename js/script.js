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
