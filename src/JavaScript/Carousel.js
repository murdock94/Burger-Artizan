document.addEventListener('DOMContentLoaded', function () {

    const container = document.getElementById('emblaContainer')

    //  CRIA OS SLIDES DINAMICAMENTE
function createSlides() {
    container.innerHTML = data_products
        .slice(0, 10) 
        .map(product => `
            <div class="embla__slide">
                <div class="slide_item">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                </div>
            </div>
    `).join('')
}

    createSlides()

    //  INICIA O EMBLA
    const emblaNode = document.querySelector('.embla__viewport')

    const embla = EmblaCarousel(emblaNode, {
        loop: true,
        align: 'start',
        slidesToScroll: 1
    })

    // BOTÕES
    document.querySelector('.embla__prev')
        .addEventListener('click', () => embla.scrollPrev())

    document.querySelector('.embla__next')
        .addEventListener('click', () => embla.scrollNext())

    // DOTS
    const dotsContainer = document.querySelector('.embla__dots')

    function createDots() {
        const snaps = embla.scrollSnapList()

        dotsContainer.innerHTML = snaps
            .map((_, i) => `<button class="embla__dot" data-index="${i}"></button>`)
            .join('')
    }

    function setActiveDot() {
        const dots = document.querySelectorAll('.embla__dot')
        const index = embla.selectedScrollSnap()

        dots.forEach(dot => dot.classList.remove('active'))

        if (dots[index]) {
            dots[index].classList.add('active')
        }
    }

    function addDotClick() {
        document.querySelectorAll('.embla__dot').forEach(dot => {
            dot.addEventListener('click', () => {
                embla.scrollTo(Number(dot.dataset.index))
            })
        })
    }

    function initDots() {
        createDots()
        addDotClick()
        setActiveDot()
    }

    initDots()

    embla.on('select', setActiveDot)
    embla.on('reInit', initDots)
})