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


document.addEventListener("DOMContentLoaded", function () {
    const addToCartButtons = document.querySelectorAll(".cart-btn1");

    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            let name = this.getAttribute("data-name");
            let price = this.getAttribute("data-price").replace("$", ""); 
            let image = this.getAttribute("data-image");

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            // Add new product to cart
            cart.push({ name, price, image });

            localStorage.setItem("cart", JSON.stringify(cart));
            alert("Product added to cart!");
        });
    });
});

function submitReview() {
    let name = document.getElementById("name").value;
    let rating = document.getElementById("rating").value;
    let review = document.getElementById("review").value;
    let reviewContainer = document.getElementById("reviews");

    if (name === "" || review === "") {
        alert("Please fill in all fields.");
        return;
    }

    let stars = "⭐".repeat(rating);

    let reviewHTML = `
        <div class="review-item">
            <h4>${name} <span>${stars}</span></h4>
            <p>${review}</p>
        </div>
    `;

    // If it's the first review, remove default text
    if (reviewContainer.innerHTML.includes("No reviews yet")) {
        reviewContainer.innerHTML = "";
    }

    reviewContainer.innerHTML += reviewHTML;

    // Clear input fields after submission
    document.getElementById("name").value = "";
    document.getElementById("rating").value = "5";
    document.getElementById("review").value = "";
}
