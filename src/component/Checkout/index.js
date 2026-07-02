import axios from "axios"
import { useEffect, useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import "./checkout.css"


  // ✅ move headers OUTSIDE render dependency issues
    const headers = {
        apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA",
        "Content-Type": "application/json",
        Prefer: "return=representation",
    }

    
const Checkout = () => {
    const [cart, setCart] = useState([])
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const user = JSON.parse(localStorage.getItem("user")) || {}

    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [pincode, setPincode] = useState("")

  

    // ✅ FIXED: fetchCart stable + correct dependencies
    const fetchCart = useCallback(async () => {
        if (!user?.id) return

        try {
            const res = await axios.get(
                `https://wqjaxtdxzjmlsaeoxyhq.supabase.co/rest/v1/cart?user_id=eq.${user.id}&select=*,products(*)`,
                { headers }
            )

            const grouped = {}

            res.data.forEach((item) => {
                if (grouped[item.product_id]) {
                    grouped[item.product_id].quantity += item.quantity || 1
                } else {
                    grouped[item.product_id] = {
                        ...item,
                        quantity: item.quantity || 1,
                    }
                }
            })

            setCart(Object.values(grouped))
        } catch (err) {
            console.log(err.response?.data || err.message)
        }
    }, [user?.id])

    // ✅ FIXED useEffect
    useEffect(() => {
        if (user?.id) {
            fetchCart()
        }
    }, [user?.id, fetchCart])

    const totalPrice = cart.reduce((total, item) => {
        return total + (item.products?.price || 0) * item.quantity
    }, 0)

    const placeOrder = async () => {
        if (!address || !city || !pincode) {
            alert("Please fill all address fields")
            return
        }

        setLoading(true)

        const order = {
            user_id: user.id,
            name: user.username,
            phone_no: user.phone,
            address,
            city,
            state: "AP",
            pincode,
            total_price: totalPrice,
            status: "pending",
        }

        try {
            await axios.post(
                "https://wqjaxtdxzjmlsaeoxyhq.supabase.co/rest/v1/orders",
                order,
                { headers }
            )

            await axios.delete(
                `https://wqjaxtdxzjmlsaeoxyhq.supabase.co/rest/v1/cart?user_id=eq.${user.id}`,
                { headers }
            )

            setCart([])
            alert("Order Placed Successfully")
            navigate("/orders")

        } catch (err) {
            console.log("Error:", err.response?.data || err.message)
            alert("Order failed")
        }

        setLoading(false)
    }

    return (
        <div className="checkout-container">

            <h2>Checkout</h2>

            <div className="checkout-form">
                <input type="text" value={user.username || ""} readOnly />
                <input type="email" value={user.email || ""} readOnly />
                <input type="tel" value={user.phone || ""} readOnly />

                <textarea
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                />
            </div>

            <h3>Products</h3>

            {cart.map((item) => (
                <div className="product-card" key={item.id}>
                    <img src={item.products?.image} alt="" />

                    <div className="product-info">
                        <h4>{item.products?.title}</h4>
                        <p>Price: ₹{item.products?.price}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Total: ₹{(item.products?.price || 0) * item.quantity}</p>
                    </div>
                </div>
            ))}

            <div className="total-box">
                Total Amount: ₹{totalPrice}
            </div>

            <button
                className="checkout-btn"
                onClick={placeOrder}
                disabled={loading}
            >
                {loading ? "Placing Order..." : "Place Order"}
            </button>

        </div>
    )
}

export default Checkout