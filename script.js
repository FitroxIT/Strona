class Produkt {
    constructor(name, price, quantity, img) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.img = img;
    }

    itemTotal() {
        return this.price * this.quantity;
    }
}

document.querySelectorAll('.add').forEach(button => {
    button.addEventListener('click', () => {
        const box = button.closest('.boxKamien');

        const name = box.querySelector('.ruda').textContent;
        const priceText = box.querySelector('[data-price]').getAttribute('data-price');
        const price = parseFloat(priceText);
        const img = box.querySelector('img').getAttribute('src');

        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        const existing = cart.find(item => item.name === name);
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push(new Produkt(name, price, 1, img));
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        const info = document.getElementById('dodanoInfo');
        info.textContent = `${name} dodano do koszyka!`;
        info.style.display = 'block';
        setTimeout(() => { info.style.display = 'none'; }, 2000);
    });
});