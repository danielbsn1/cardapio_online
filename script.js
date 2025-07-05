const cart = [];
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const whatsappLink = document.getElementById('whatsapp-link');
const vendedoraPhone = '5533988825731'; // Coloque o número da vendedora aqui, com DDD e sem espaços

function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - R$ ${item.price.toFixed(2)} (x${item.qty})`;
        cartItems.appendChild(li);
        total += item.price * item.qty;
    });
    cartTotal.textContent = total > 0 ? `Total: R$ ${total.toFixed(2)}` : '';
    whatsappLink.style.display = total > 0 ? 'inline-block' : 'none';

    // Monta a mensagem para o WhatsApp
    let message ="Para concluir seu pedido, envie as seguintes informaçõesEntrega/Retirada: Nome: Forma de pagamento (pix ou dinheiro):Endereço:Assim que recebermos os dados, seu pedido será confirmado e entraremos em contato!"

    message += 'Cardápio:\n';
    cart.forEach(item => {
        message += `- ${item.name} (x${item.qty}) - R$ ${item.price.toFixed(2)}\n`;
    });
    message += `Total: R$ ${total.toFixed(2)}`;
    whatsappLink.href = `https://wa.me/${vendedoraPhone}?text=${encodeURIComponent(message)}`;
}

document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
        const name = btn.getAttribute('data-name');
        const price = parseFloat(btn.getAttribute('data-price'));
        const existing = cart.find(item => item.name === name);
        if (existing) {
            existing.qty += 1;
        } else {
            cart.push({ name, price, qty: 1 });
        }
        updateCart();
    });
});