const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/reviewsDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Review Schema
const reviewSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    review: String,
});

const Review = mongoose.model("Review", reviewSchema);

// API to Get All Reviews
app.get("/reviews", async (req, res) => {
    const reviews = await Review.find();
    res.json(reviews);
});

// API to Submit a Review
app.post("/reviews", async (req, res) => {
    const { name, rating, review } = req.body;
    const newReview = new Review({ name, rating, review });
    await newReview.save();
    res.json({ message: "Review added!" });
});

// Start Server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
