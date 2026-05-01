const buttons = document.querySelectorAll(".btn_nav_menu");
const container = document.getElementById("products_container");

function renderProducts(products) {
    container.innerHTML = "";

    products.forEach(product => {
        container.innerHTML += `
            <div class="product">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <span>R$ ${product.price}</span>
            </div>
        `;
    });
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const category = button.dataset.category;

        let filtered;

        if (category === "todos") {
            filtered = data_products;
        } else {
            filtered = data_products.filter(p => p.category === category);
        }

        renderProducts(filtered);

        // ativa botão clicado
        buttons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
    });
});

// inicial
renderProducts(data_products);