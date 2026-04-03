const koszykDiv = document.querySelector('.koszyk');

function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    koszykDiv.innerHTML = '';

    if (cart.length === 0) {
        koszykDiv.innerHTML = `
            <p style="color: orange; font-family: Impact; text-align: center; 
                      font-size: 30px; letter-spacing: 2px; text-shadow: 0px 0px 10px orange;">
                Koszyk jest pusty
            </p>`;
    } else {
        let total = 0;

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            const colorClass = item.name.toLowerCase().replace(' ', '');

            koszykDiv.innerHTML += `
                <div class="boxKamien koszykItem">
                    <img src="${item.img}" id="zdj">
                    <p class="ruda ${colorClass}">${item.name}</p>

                    <div class="addToCart">
                        <p class="${colorClass}">${itemTotal} zł</p>
                        <button class="koszykBtn" onclick="changeQty(${index}, -1)"> - </button>
                        <p class="${colorClass}">${item.quantity} kg</p>
                        <button class="koszykBtn" onclick="changeQty(${index}, +1)"> + </button>
                        <button class="koszykBtn usunBtn" onclick="removeItem(${index})">Usuń</button>
                    </div>
                </div>
            `;
        });

        koszykDiv.innerHTML += `
            <p style="color: orange; font-family: Impact; text-align: right; font-size: 30px; 
                      letter-spacing: 2px; margin-right: 70px; text-shadow: 0px 0px 10px orange;">
                Łączna cena: ${total} zł
            </p>
        `;
    }
}

function changeQty(index, delta) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity += delta;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function removeItem(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}


renderCart();