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

function loadCart() {
    const raw = JSON.parse(localStorage.getItem('cart')) || [];
    return raw.map(item => Object.assign(new Produkt(), item));
}

const koszykDiv = document.getElementsByClassName('koszyk')[0];

function renderCart() {
    const cart = loadCart();
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
            const itemTotal = item.itemTotal();
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
    const cart = loadCart();
    cart[index].quantity += delta;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function removeItem(index) {
    const cart = loadCart();
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

renderCart();