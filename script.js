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
            cart.push({ name, price, quantity: 1, img });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${name} dodano do koszyka!`);
    });
});
