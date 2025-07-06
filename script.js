// script.js
// Função para exibir os produtos na página
function displayProducts(products) {
    const productList = document.getElementById('product-list');
    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.innerHTML = `
            <h3>${product.name}</h3>
            <p>Preço: R$ ${product.price.toFixed(2)}</p>
            <button class="add-to-cart" data-name="${product.name}" data-price="${product.price}" onclick="addToCart(this)">Adicionar ao Carrinho</button>
        `;
        productList.appendChild(productItem);
    });

        // Atualiza a lista de itens no carrinho
        updateCartDisplay();

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
    // Função para adicionar produtos ao carrinho
function addToCart(button) {
    const productName = button.getAttribute('data-name');
    const productPrice = parseFloat(button.getAttribute('data-price'));
    
    // Lógica para adicionar o produto ao carrinho
    // Exemplo: Atualizar a lista de itens no carrinho
    const cartItems = document.getElementById('cart-items');
    const newItem = document.createElement('li');
    newItem.textContent = `${productName} - R$ ${productPrice.toFixed(2)}`;
    cartItems.appendChild(newItem);
    
    // Atualizar total
    updateCartTotal(productPrice);
}

// Função para limpar o carrinho
function clearCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = ''; // Limpa a lista de itens
    updateCartTotal(0); // Reseta o total
}

// Função para atualizar o total do carrinho
function updateCartTotal(price) {
    const cartTotal = document.getElementById('cart-total');
    let currentTotal = parseFloat(cartTotal.textContent.replace('Total: R$ ', ''));
    currentTotal += price;
    cartTotal.textContent = `Total: R$ ${currentTotal.toFixed(2)}`;
}

// Função para enviar pedido pelo WhatsApp
function sendToWhatsApp() {
    const cartItems = document.getElementById('cart-items').children;
    let message = 'Meu pedido:\n';
    
    for (let item of cartItems) {
        message += `${item.textContent}\n`;
    }
    
    const total = document.getElementById('cart-total').textContent;
    message += total;
    
    const whatsappUrl = `https://wa.me/5533988825731?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}
}