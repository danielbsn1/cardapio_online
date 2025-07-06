let cart = []; // Array para armazenar os itens do carrinho

// Função para adicionar produtos ao carrinho
function addToCart(button) {
    const productName = button.getAttribute('data-name');
    const productPrice = parseFloat(button.getAttribute('data-price'));
    
    // Verifica se o produto já está no carrinho
    const existingProduct = cart.find(item => item.name === productName);
    
    if (existingProduct) {
        // Se o produto já existe, apenas aumenta a quantidade
        existingProduct.quantity += 1;
    } else {
        // Se não existe, adiciona o produto ao carrinho com quantidade 1
        cart.push({ name: productName, price: productPrice, quantity: 1 });
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
    const productName = button.parentElement.nextElementSibling.getAttribute('data-name');
    const existingProduct = cart.find(item => item.name === productName);

    if (existingProduct) {
        existingProduct.quantity += change;

        // Remove o produto se a quantidade for menor que 1
        if (existingProduct.quantity < 1) {
            cart = cart.filter(item => item.name !== productName);
        }
    } else {
        // Se o produto não existe no carrinho, adiciona com quantidade 1
        if (change > 0) {
            cart.push({ name: productName, price: parseFloat(button.parentElement.previousElementSibling.textContent.replace('R$ ', '').replace(',', '.')), quantity: 1 });
        }
    }

    // Atualiza a exibição do carrinho
    updateCartDisplay();

    // Atualiza a exibição da quantidade no elemento correspondente
    const quantityDisplay = button.parentElement.querySelector('.quantity-display');
    quantityDisplay.textContent = existingProduct ? existingProduct.quantity : (change > 0 ? 0 : 0);
}
