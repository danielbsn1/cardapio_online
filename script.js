let cart = []; // Array para armazenar os itens do carrinho

// Função para adicionar produtos ao carrinho
function addToCart(button) {
    const productName = button.getAttribute('data-name');
    const productPrice = parseFloat(button.getAttribute('data-price'));

    // Adiciona o produto ao carrinho
    cart.push({ name: productName, price: productPrice });

    // Atualiza a exibição do carrinho
    updateCartDisplay();
}

// Função para atualizar a exibição do carrinho
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = ''; // Limpa a lista atual

    let total = 0; // Inicializa o total
    cart.forEach(item => {
        const newItem = document.createElement('li');
        newItem.textContent = `${item.name} - R$ ${item.price.toFixed(2)}`;
        cartItems.appendChild(newItem);
        total += item.price; // Atualiza o total
    });

    // Atualiza o total no display
    document.getElementById('cart-total').textContent = `Total: R$ ${total.toFixed(2)}`;
}

// Função para limpar o carrinho
function clearCart() {
    cart = []; // Limpa o array do carrinho
    updateCartDisplay(); // Atualiza a exibição do carrinho
}

// Função para enviar pedido pelo WhatsApp
function sendToWhatsApp() {
    if (cart.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let message = 'Meu pedido:\n';
    cart.forEach(item => {
        message += `${item.name} - R$ ${item.price.toFixed(2)}\n`;
    });

    const total = document.getElementById('cart-total').textContent;
    message += total;

    const whatsappUrl = `https://wa.me/5533988825731?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}
