document.addEventListener("DOMContentLoaded", function () {
    // Select all "Add to Cart" buttons
    const cartButtons = document.querySelectorAll(".cart-btn");

    cartButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent page reload

            // Get product details from data attributes
            const productName = this.getAttribute("data-name");
            const productPrice = this.getAttribute("data-price");
            const productImage = this.getAttribute("data-image");

            // Create product object
            const product = {
                name: productName,
                price: productPrice,
                image: productImage
            };

            // Get existing cart from localStorage
            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            // Add new product to cart
            cart.push(product);

            // Save back to localStorage
            localStorage.setItem("cart", JSON.stringify(cart));

            alert("Product added to cart!");
        });
    });
});
