document.addEventListener('DOMContentLoaded', function () {


    //  FINALIZAR PEDIDO
  
    const btnFinalize = document.querySelector('.btn_finalize');

    if (btnFinalize) {
        btnFinalize.addEventListener('click', function () {

            let product = JSON.parse(localStorage.getItem("@item")) || [];

            const nameInput = document.getElementById('client_name');
            const addressInput = document.getElementById('client_address');
            const paymentSelect = document.getElementById('payment_method');
            const obsInput = document.getElementById('order_obs');

            const name = nameInput ? nameInput.value.trim() : "";
            const address = addressInput ? addressInput.value.trim() : "";
            const payment = paymentSelect ? paymentSelect.value : "";
            const obs = obsInput ? obsInput.value.trim() : "";

            if (product.length === 0) {
                alert("Carrinho vazio!");
                return;
            }

            if (!name || !address || !payment) {
                alert("Preencha nome, endereço e forma de pagamento!");
                return;
            }

            let message = "🛒 *NOVO PEDIDO* \n\n";
            let total = 0;

            product.forEach(item => {
                const subtotal = item.price * (item.quantity || 1);
                total += subtotal;

                message += `📦 *${item.name}*\n`;
                message += `Qtd: ${item.quantity || 1}\n`;
                message += `Subtotal: R$${subtotal.toFixed(2)}\n\n`;
            });

            message += "--------------------------\n";
            message += `💰 *TOTAL: R$${total.toFixed(2)}*\n\n`;
            message += `👤 Nome: ${name}\n`;
            message += `📍 Endereço: ${address}\n`;
            message += `💳 Pagamento: ${payment}\n`;

            if (obs) message += `📝 Obs: ${obs}\n`;

            const url = `https://wa.me/5534996369042?text=${encodeURIComponent(message)}`;
            window.open(url, '_blank');

            localStorage.removeItem("@item");
        });
    }


    // 📩 FORM WHATSAPP

    const btnSend = document.getElementById("sendWhats");

    if (btnSend) {
        btnSend.addEventListener("click", () => {

            const name = document.getElementById("name")?.value.trim();
            const phone = document.getElementById("phone")?.value.trim();
            const email = document.getElementById("email")?.value.trim();
            const message = document.getElementById("message")?.value.trim();

            if (!name || !email || !message) {
                alert("Preencha nome, e-mail e mensagem!");
                return;
            }

            let text = `📩 *NOVO CONTATO*\n\n`;
            text += `👤 Nome: ${name}\n`;
            text += `📞 Telefone: ${phone}\n`;
            text += `📧 Email: ${email}\n\n`;
            text += `📝 Mensagem:\n${message}`;

            const url = `https://wa.me/5534996369042?text=${encodeURIComponent(text)}`;
            window.open(url, "_blank");
        });
    }


    //  NAVEGAÇÃO

    const btnMenuMobile = document.querySelector('.mobile_icon');
    const menuMobile = document.querySelector('.menu_mobile');
    const headerContainer = document.querySelector('header');
    const sections = document.querySelectorAll('section');
    const links = document.querySelectorAll('[data-target]');
    let current = '';

    function navegatePage() {
        links.forEach(el => {
            el.addEventListener('click', function () {
                const id = this.getAttribute('data-target');
                const section = document.querySelector(id);

                if (!section) return;

                const top = section.offsetTop - 60;

                window.scrollTo({
                    top,
                    behavior: 'smooth'
                });

                if (menuMobile.classList.contains('active_menu_mobile')) {
                    menuMobile.classList.remove('active_menu_mobile');
                }
            });
        });
    }

    function menuToggle() {
        menuMobile.classList.toggle('active_menu_mobile');
    }

    function hideMenu() {
        if (window.innerWidth >= 768) {
            menuMobile.classList.remove('active_menu_mobile');
        }
    }

    function headerFixed() {
        window.addEventListener('scroll', function () {
            headerContainer.style.background =
                window.scrollY > 0 ? '#1e1919' : 'transparent';
        });
    }

    function actualPage() {
        sections.forEach(section => {
            const top = section.offsetTop - 80;
            const height = section.clientHeight;

            if (window.scrollY >= top && window.scrollY < top + height) {
                current = '#' + section.id;
            }
        });

        links.forEach(el => {
            el.classList.remove('active');
            if (el.getAttribute('data-target') === current) {
                el.classList.add('active');
            }
        });
    }

    if (btnMenuMobile) btnMenuMobile.addEventListener('click', menuToggle);
    window.addEventListener('resize', hideMenu);
    window.addEventListener('scroll', actualPage);

    headerFixed();
    navegatePage();

});