import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import "./Products.css"
import { FaHeart, FaShoppingCart } from "react-icons/fa";

const Products = () => {

    const [product, setProduct] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {

            try {
                const res = await axios.get("https://wqjaxtdxzjmlsaeoxyhq.supabase.co/rest/v1/products", {
                    headers: {
                        apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA",
                        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA"
                    }


                })
                setProduct(res.data)
                console.log(res.data)


            }
            catch (err) {
                console.log("something went to wrong", err)
            }

        }
        fetchProducts()
    }, [])


    const addToCart = async (product) => {

        try {

            const user = JSON.parse(localStorage.getItem("user"))

            if (!user) {
                alert("Please Login First")
            }

            const res = await axios.post("https://wqjaxtdxzjmlsaeoxyhq.supabase.co/rest/v1/cart", {
                user_id: user.id,
                product_id: product.id,
                quantity: 1,
            }, {
                headers: {
                    apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA",
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA",
                    "Content-Type": "application/json",
                    Prefer: "return=representation",
                }

            })

            console.log(res.data)
            alert("items added to cart")

        }
        catch (err) {
            console.log("Something went ot wrong", err)

        }



    }

    const addTowishlist = async (product) => {

        try {
            const user = JSON.parse(localStorage.getItem("user"))

            if (!user) {
                alert("Please Login first")
            }

            const res = await axios.post("https://wqjaxtdxzjmlsaeoxyhq.supabase.co/rest/v1/wishlist", {
                user_id: user.id,
                product_id: product.id
            }, {
                headers: {
                    apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA",
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA",
                    "Content-Type": "application/json",
                    Prefer: "return=representation",
                }
            })

            console.log(res.data)
            alert("Product added in wishlist")

        }
        catch (err) {

            if (err.response?.status === 409) {
                alert("Product already added in our wishlist")
            }
            else {
                console.log("something went to wrong", err)
            }
        }


    }



    return (
        <>
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1>Discover Your Next Favorite Product</h1>

                    <p>
                        Shop premium quality products at unbeatable prices.
                        Fast delivery, secure payments, and amazing deals every day.
                    </p>

                    <div className="hero-buttons">
                        <a href="#products" className="shop-btn">
                            Shop Now
                        </a>

                        <button className="explore-btn">
                            Explore Collection
                        </button>
                    </div>
                </div>

                <div className="hero-image">
                    <img
                        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900"
                        alt="Shopping"
                    />
                </div>
            </section>

            {/* Products */}
            <div id="products" className="prod-container">
                {product.map((items) => (
                    <div className="prd-card" key={items.id}>

                        <button
                            className="wishlist-btn"
                            onClick={() => addTowishlist(items)}
                        >
                            <FaHeart />
                        </button>

                        <Link to={`/product/${items.id}`}>
                            <img
                                src={items.image}
                                alt={items.title}
                                className="prod-img"
                            />
                        </Link>

                        <div className="product-info">
                            <h3>{items.title}</h3>

                            <p className="description">
                                {items.description}
                            </p>

                            <div className="price-stock">
                                <span className="price">₹{items.price}</span>
                                <span className="stock">
                                    {items.stock} in stock
                                </span>
                            </div>

                            <button
                                className="cart-btn"
                                onClick={() => addToCart(items)}
                            >
                                <FaShoppingCart />
                                <span>Add to Cart</span>
                            </button>
                        </div>

                    </div>
                ))}
            </div>
        </>
    )
}

export default Products