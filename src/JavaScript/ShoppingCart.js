document.addEventListener('DOMContentLoaded', function() {

    const cart = document.querySelector('.shopping_cart');
    const btnShowCart = document.querySelector('.btn_cart');
    const btnCloseCart = document.querySelector('.close_cart');

    function showCart() {

        if (btnShowCart) {
            btnShowCart.addEventListener('click', function() {
                cart.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }

        if (btnCloseCart) {
            btnCloseCart.addEventListener('click', function() {
                cart.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }

        // fechar clicando fora
        cart.addEventListener('click', function(e) {
            if (e.target === cart) {
                cart.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    showCart();

});