import axios from "axios"
import { useEffect, useState } from "react"
import "./orders.css"

const Orders = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)

    const user = JSON.parse(localStorage.getItem("user")) || {}

    const headers = {
        apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA",
    }

    useEffect(() => {
        if (user?.id) {
            fetchOrders()
        }
    }, [user?.id])

    const fetchOrders = async () => {
        setLoading(true)

        try {
            const res = await axios.get(
                `https://wqjaxtdxzjmlsaeoxyhq.supabase.co/rest/v1/orders?user_id=eq.${user.id}&select=*`,
                { headers }
            )

            setOrders(res.data)
        } catch (err) {
            console.log("Error fetching orders:", err.response?.data || err.message)
        }

        setLoading(false)
    }

    return (
        <div className="orders-container">

            <h2>My Orders</h2>

            {loading && <p>Loading orders...</p>}

            {!loading && orders.length === 0 && (
                <p>No orders found.</p>
            )}

            {orders.map((order) => (
                <div className="order-card" key={order.id}>

                    <div className="order-header">
                        <h3>Order #{order.id}</h3>
                        <span className={`status ${order.status}`}>
                            {order.status}
                        </span>
                    </div>

                    <div className="order-body">
                        <p><b>Name:</b> {order.name}</p>
                        <p><b>Phone:</b> {order.phone_no}</p>
                        <p><b>Address:</b> {order.address}</p>
                        <p><b>City:</b> {order.city}</p>
                        <p><b>Pincode:</b> {order.pincode}</p>

                        {/* ITEMS */}
                        <div className="items-container">
                            {order.items?.map((item, index) => (
                                <div className="item-card" key={index}>
                                    <img
                                        src={item.products?.image}
                                        alt={item.products?.title}
                                    />

                                    <div>
                                        <p><b>{item.products?.title}</b></p>
                                        <p>Qty: {item.quantity}</p>
                                        <p>Price: ₹{item.products?.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="order-footer">
                        <h4>Total: ₹{order.total_price}</h4>
                    </div>

                </div>
            ))}

        </div>
    )
}

export default Orders