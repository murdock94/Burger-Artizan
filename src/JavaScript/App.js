document.addEventListener('DOMContentLoaded', function () {

    const btnMenuMobile = document.querySelector('.mobile_icon');
    const menuMobile = document.querySelector('.menu_mobile');
    const headerContainer = document.querySelector('header');
    const sections = document.querySelectorAll('section');
    const links = document.querySelectorAll('[data-target]');
    const quantityItem = document.querySelector('.items_in_cart');
    let current = '';



    // QUANTIDADES DE ITEMS DO CARRINHO NO BOTAO 


    //  NAVEGAÇÃO ÚNICA
    function navegatePage() {
        links.forEach(el => {
            el.addEventListener('click', function () {

                const id = this.getAttribute('data-target');
                const section = document.querySelector(id);

                if (!section) return;

                const offset = 60;
                const top = section.offsetTop - offset;

                window.scrollTo({
                    top: top,
                    behavior: 'smooth'
                });

                // fecha menu mobile ao clicar
                if (menuMobile.classList.contains('active_menu_mobile')) {
                    menuMobile.classList.remove('active_menu_mobile');
                }
            });
        });
    }

    // 📱 MENU MOBILE
    function menuToggle() {
        menuMobile.style.transition = '0.5s';
    }

    function hideMenu() {
        if (window.innerWidth >= 768) {
            menuMobile.classList.remove('active_menu_mobile');
        }
    }

    //  HEADER FIXO COM BACKGROUND
    function headerFixed() {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 0) {
                headerContainer.style.background = '#1e1919';
            } else {
                headerContainer.style.background = 'transparent';
            }
            headerContainer.style.transition = '0.5s';
        });
    }

    //  MENU ATIVO CONFORME SCROLL
    function actualPage() {
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 80;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = '#' + section.getAttribute('id');
            }
        });

        links.forEach(el => {
            el.classList.remove('active');

            if (el.getAttribute('data-target') === current) {
                el.classList.add('active');
            }
        });
    }

    //  EVENTOS
    function eventListeners() {
        if (btnMenuMobile) btnMenuMobile.addEventListener('click', menuToggle);
        window.addEventListener('resize', hideMenu);
        window.addEventListener('scroll', actualPage);
    }

    //  INIT
    eventListeners();
    headerFixed();
    navegatePage();

});
