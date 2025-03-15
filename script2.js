document.addEventListener("DOMContentLoaded", () => {
    const cartButtons = document.querySelectorAll(".btn");

    cartButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent default anchor behavior

            let name = button.getAttribute("data-name");
            let price = button.getAttribute("data-price");
            let image = button.getAttribute("data-image");

            let product = { name, price, image, quantity: 1 };

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            // Check if product already exists
            let existingProduct = cart.find(item => item.name === name);
            if (existingProduct) {
                existingProduct.quantity += 1; // Increase quantity
            } else {
                cart.push(product); // Add new product
            }

            localStorage.setItem("cart", JSON.stringify(cart));

            alert(`${name} added to cart!`);
        });
    });
});

