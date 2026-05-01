document.addEventListener('DOMContentLoaded', function () {

    // =========================
    // PRODUTOS
    // =========================
    const container = document.querySelector('.container_items_panel');
    const buttons = document.querySelectorAll('.btn_nav_menu');
    const numbersContainer = document.getElementById('numbers');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const cartContainer = document.querySelector('.cart_item_container');
    const btnShowCart = document.querySelector('.btn_cart');
    const totalCartItem = document.querySelector('.total_item span');

    const itensCont = document.querySelector('.items_in_cart');

    let filteredProducts = [...data_products];
    let currentPage = 1;
    const itemsPerPage = 12;


    // ====================================
    // CONTAGEM DE ITENS DO CARRINHO NO BTN
    // ====================================

    function updateItemsCount() {
        let product = getCart();

        const totalItems = product.reduce((total, item) => {
            return total + item.quantity;
        }, 0);

        itensCont.textContent = totalItems;

        if (totalItems > 0) {
            itensCont.style.display = 'table';
        } else {
             itensCont.style.display = 'none';
        }
    }


    // =========================
    // CARRINHO
    // =========================

    function getCart() {
        return JSON.parse(localStorage.getItem("@item")) || [];
    }

    function setCart(cart) {
        localStorage.setItem("@item", JSON.stringify(cart));
    }

    // 🔥 MERGE CORRIGIDO (USA ID)
    function mergeCartItems(product) {

        const merged = [];

        product.forEach(function (item) {

            const existing = merged.find(p => p.id === item.id);

            if (existing) {
                existing.quantity += item.quantity || 1;
            } else {
                merged.push({
                    ...item,
                    quantity: item.quantity || 1
                });
            }

        });

        return merged;
    }

    // =========================
    // RENDER PRODUTOS
    // =========================
    function renderProducts() {

        container.innerHTML = "";

        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        const paginatedItems = filteredProducts.slice(start, end);

        paginatedItems.forEach(item => {


            const element = document.createElement('div');
            element.classList.add('item_panel');

            element.dataset.id = item.id;

            element.innerHTML = `
                <div class="img_panel">
                    <img src="${item.image}" alt="">
                    <div class="price_item_panel">
                        <span>R$ ${item.price}</span>
                    </div>
                </div>
                <div class="desc_item_panel">
                    <h3>${item.name}</h3>
                    <span>${item.description}</span>
                    <button class="btn_add_item">
                        <i class="fa-solid fa-cart-shopping"></i>
                        Adicionar
                    </button>
                </div>
            `;

            container.appendChild(element);
        });

        renderPagination();
    }

    // =========================
    // PAGINAÇÃO
    // =========================
    function renderPagination() {

        const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

        numbersContainer.innerHTML = "";

        for (let i = 1; i <= totalPages; i++) {

            const btn = document.createElement('button');
            btn.innerText = i;

            if (i === currentPage) btn.classList.add('active');

            btn.addEventListener('click', () => {
                currentPage = i;
                renderProducts();
            });

            numbersContainer.appendChild(btn);
        }

        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages;
    }

    // =========================
    // FILTRO
    // =========================
    buttons.forEach(button => {

        button.addEventListener('click', () => {

            const category = button.dataset.category;

            if (category === "todos") {
                filteredProducts = [...data_products];
            } else {
                filteredProducts = data_products.filter(p => p.category === category);
            }

            currentPage = 1;
            renderProducts();

            // remove active + focus
            buttons.forEach(btn => {
                btn.classList.remove("active");
                btn.blur(); // remove foco antigo
            });

            // adiciona active + focus
            button.classList.add("active");
            button.focus(); // 🔥 AQUI É O FOCUS VIA JS
        });
    });

    // =========================
    // PAGINAÇÃO BTN
    // =========================
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderProducts();
        }
    });

    nextBtn.addEventListener('click', () => {

        const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

        if (currentPage < totalPages) {
            currentPage++;
            renderProducts();
        }
    });

    // =========================
    // ADD PRODUTO
    // =========================
    container.addEventListener('click', function (e) {

        const btn = e.target.closest('.btn_add_item');
        if (!btn) return;

        const itemElement = e.target.closest('.item_panel');
        const id = itemElement.dataset.id;

        const product = data_products.find(p => p.id == id);

        let cart = getCart();

        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });

        setCart(cart);

        renderCart(); // 🔥 atualiza na hora
    });

    // =========================
    // RENDER CARRINHO
    // =========================
    function renderCart() {

        cartContainer.innerHTML = "";

        let product = getCart();

        product = mergeCartItems(product);

        setCart(product);

        product.forEach(function (item, index) {

            const totalPrice = item.price * item.quantity;

            const element = document.createElement('div');
            element.classList.add('item_cart');
            element.dataset.index = index;

            element.innerHTML = `
                <div class="desc_item">
                    <div class="image_cart">
                        <img src="${item.image}" alt="${item.name}">
                    </div>

                    <div class="title_item_cart">
                        <div class="desc_item_cart">
                            <h4>${item.name}</h4>

                            <span class="price_item_cart" data-price="${item.price}">
                                R$${totalPrice.toFixed(2)}
                            </span>

                            <div class="btn_amout">
                                <button class="btn_down_amout">-</button>
                                <span class="amout_item_cart">${item.quantity}</span>
                                <button class="btn_up_amout">+</button>
                            </div>
                        </div>

                        <div class="btn_delete_item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M3 6h18"></path>
                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                <path d="M8 6V4c0-1 1-1 2-1h4c1 0 2 0 2 1v2"></path>
                                <line x1="10" x2="10" y1="11" y2="17"></line>
                                <line x1="14" x2="14" y1="11" y2="17"></line>
                            </svg>
                        </div>
                    </div>
                </div>
            `;

            cartContainer.appendChild(element);

        });

        updateTotalCart();
        updateItemsCount();
    }

    // =========================
    // EVENTOS CARRINHO (ISOLADO)
    // =========================
    document.addEventListener('click', function (e) {

        if (!e.target.closest('.cart_item_container')) return;

        // DELETE
        if (e.target.closest('.btn_delete_item')) {

            const itemCart = e.target.closest('.item_cart');
            const index = itemCart.dataset.index;

            let product = getCart();

            product.splice(index, 1);

            setCart(product);

            renderCart();
        }

        // QUANTIDADE
        const itemCart = e.target.closest('.item_cart');
        if (!itemCart) return;

        const index = itemCart.dataset.index;

        let product = getCart();

        if (e.target.classList.contains('btn_up_amout')) {

            product[index].quantity += 1;
            setCart(product);
            renderCart();
        }

        if (e.target.classList.contains('btn_down_amout')) {

            if (product[index].quantity > 1) {

                product[index].quantity -= 1;
                setCart(product);
                renderCart();
            }
        }
    });

    function updateTotalCart() {

        let product = getCart();

        let total = 0;

        product.forEach(function (item) {
            total += item.price * (item.quantity || 1);
        });

        totalCartItem.textContent = `R$ ${total.toFixed(2)}`;
    }

    // =========================
    // INIT
    // =========================
    renderProducts();
    renderCart();


});