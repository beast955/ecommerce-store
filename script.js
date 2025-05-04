// Add an item to the cart
function addToCart(item) {
    // Retrieve existing cart from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Add the new item
    cart.push(item);

    // Save the updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update cart count in the navbar
    document.getElementById("cart-count").textContent = cart.length;

    // Notify the user
    alert(`${item.name} has been added to the cart!`);
}

// Load cart items and display them
function loadCartItems() {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-items");

    // Clear existing content
    cartContainer.innerHTML = "";

    // If the cart is empty
    if (cartItems.length === 0) {
        cartContainer.innerHTML = `<p class="text-center text-muted">Your cart is empty!</p>`;
        return;
    }

    // Create and display cart items
    cartItems.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("col-md-4");
        itemDiv.innerHTML = `
            <div class="card">
                <img src="${item.image}" class="card-img-top" alt="${item.name}">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">$${item.price}</p>
                    <button class="btn btn-danger" onclick="removeFromCart(${index})">Remove</button>
                </div>
            </div>`;
        cartContainer.appendChild(itemDiv);
    });
}

// Remove an item from the cart by index
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1); // Remove the item
    localStorage.setItem("cart", JSON.stringify(cart)); // Save updated cart
    loadCartItems(); // Refresh the displayed items
    document.getElementById("cart-count").textContent = cart.length; // Update cart count
}

// Clear all items from the cart
function clearCart() {
    localStorage.removeItem("cart");
    loadCartItems(); // Refresh the displayed items
    document.getElementById("cart-count").textContent = 0; // Update cart count
}

// Update the cart count on page load
function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-count").textContent = cartItems.length;
}

// Event listener for page load
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("cart-items")) {
        loadCartItems(); // Load cart items if on the cart page
    }
    updateCartCount(); // Update the cart count in the navbar
});
