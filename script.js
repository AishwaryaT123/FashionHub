//For cart
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

//For review
const API_URL = "http://localhost:5000/reviews";

async function fetchReviews() {
    let response = await fetch(API_URL);
    let reviews = await response.json();

    let reviewContainer = document.getElementById("reviews");
    let overallRatingContainer = document.getElementById("average-rating");

    if (reviews.length === 0) {
        reviewContainer.innerHTML = "<p>No reviews yet. Be the first to review!</p>";
        overallRatingContainer.innerHTML = "N/A";
        return;
    }

    let ratings = reviews.map(review => review.rating);
    let sum = ratings.reduce((a, b) => a + b, 0);
    let average = (sum / ratings.length).toFixed(1);
    let overallStars = "⭐".repeat(Math.round(average));

    overallRatingContainer.innerHTML = `${overallStars} (${average})`;

    reviewContainer.innerHTML = reviews.map(review => `
        <div class="review-item">
            <h4>${review.name} <span>${"⭐".repeat(review.rating)}</span></h4>
            <p>${review.review}</p>
        </div>
    `).join("");
}

async function submitReview() {
    let name = document.getElementById("name").value;
    let rating = parseInt(document.getElementById("rating").value);
    let review = document.getElementById("review").value;

    if (!name || !review) {
        alert("Please enter your name and review.");
        return;
    }

    let response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, rating, review }),
    });

    let result = await response.json();
    alert(result.message);
    document.getElementById("name").value = "";
    document.getElementById("rating").value = "5";
    document.getElementById("review").value = "";
    fetchReviews();
}

document.addEventListener("DOMContentLoaded", fetchReviews);

//For contact form
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".btn").addEventListener("click", async (event) => {
        event.preventDefault(); // Prevent default form submission

        // Get form values
        const name = document.querySelector('input[placeholder="Your Name"]').value.trim();
        const email = document.querySelector('input[placeholder="E-mail"]').value.trim();
        const subject = document.querySelector('input[placeholder="Subject"]').value.trim();
        const message = document.querySelector('textarea[placeholder="Your Message"]').value.trim();

        // Validate input fields
        if (!name || !email || !subject || !message) {
            alert("Please fill out all fields.");
            return;
        }

        try {
            // Send data to the backend
            const response = await fetch("http://localhost:5000/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, subject, message }),
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message); // Show success message
                // Clear form fields
                document.querySelector('input[placeholder="Your Name"]').value = "";
                document.querySelector('input[placeholder="E-mail"]').value = "";
                document.querySelector('input[placeholder="Subject"]').value = "";
                document.querySelector('textarea[placeholder="Your Message"]').value = "";
            } else {
                alert("Error: " + result.error);
            }
        } catch (error) {
            alert("Failed to send message. Please try again.");
            console.error(error);
        }
    });
});

//for Checkout page
/* script.js */
document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".confirm-order").addEventListener("click", submitOrder);
});

function applyCoupon() {
    let coupon = document.getElementById("coupon").value.trim();
    let totalPriceElement = document.getElementById("total-price");
    let totalPrice = parseFloat(totalPriceElement.textContent);
    
    if (coupon && coupon === "FASHION10") {
        let discount = totalPrice * 0.10;
        totalPrice -= discount;
        alert("Coupon Applied! 10% Discount");
    }
    
    totalPriceElement.textContent = totalPrice.toFixed(2);
}

function submitOrder() {
    let name = document.getElementById("name").value;
    let address = document.getElementById("address").value;
    let city = document.getElementById("city").value;
    let zip = document.getElementById("zip").value;
    let paymentMethod = document.querySelector("input[name='payment']:checked").value;
    let totalPrice = document.getElementById("total-price").textContent;
    
    if (!name || !address || !city || !zip) {
        alert("Please fill in all shipping details.");
        return;
    }

    let orderDetails = {
        name, address, city, zip, paymentMethod, totalPrice
    };

    fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderDetails)
    })
    .then(response => response.json())
    .then(data => {
        alert("Order Placed Successfully!");
    })
    .catch(error => console.error("Error:", error));
}



