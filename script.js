let cart = []; // Array para armazenar os itens do carrinho

// Função para adicionar produtos ao carrinho
function addToCart(button) {
    const productName = button.getAttribute('data-name');
    const productPrice = parseFloat(button.getAttribute('data-price'));
    
    // Verifica se o produto já está no carrinho
    const existingProduct = cart.find(item => item.name === productName);
    
    // Se o produto já existe, apenas aumenta a quantidade
    if (existingProduct) {
        existingProduct.quantity += existingProduct.quantity; // Mantém a quantidade atual
    } else {
        // Se não existe, adiciona o produto ao carrinho com a quantidade escolhida
        const quantityDisplay = button.parentElement.querySelector('.quantity-display');
        const quantity = parseInt(quantityDisplay.textContent);
        cart.push({ name: productName, price: productPrice, quantity: quantity });
    }

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
        newItem.textContent = `${item.name} - R$ ${item.price.toFixed(2)} x ${item.quantity}`;
        cartItems.appendChild(newItem);
        total += item.price * item.quantity; // Atualiza o total
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
        message += `${item.name} - R$ ${item.price.toFixed(2)} x ${item.quantity}\n`;
    });

    const total = document.getElementById('cart-total').textContent;
    message += total;

    const whatsappUrl = `https://wa.me/5533988825731?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Função para ajustar a quantidade de produtos
function adjustQuantity(button, change) {
    const quantityDisplay = button.parentElement.querySelector('.quantity-display');
    let currentQuantity = parseInt(quantityDisplay.textContent);

    // Ajusta a quantidade
    currentQuantity += change;

    // Garante que a quantidade não fique negativa
    if (currentQuantity < 0) {
        currentQuantity = 0;
    }

    // Atualiza a exibição da quantidade
    quantityDisplay.textContent = currentQuantity;
}

// Função para inicializar a quantidade ao carregar a página
function initializeQuantityDisplay() {
    const quantityDisplays = document.querySelectorAll('.quantity-display');
    quantityDisplays.forEach(display => {
        display.textContent = '0'; // Inicializa todas as quantidades como 0
    });
}

// Chama a função para inicializar a quantidade ao carregar a página
initializeQuantityDisplay();
