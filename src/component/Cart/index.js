import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);

    // FIX: avoid array fallback (should be object)
    const user = JSON.parse(localStorage.getItem("user")) ?? {};
    const userId = user?.id;

    // ✅ stable fetchCart function
    const fetchCart = useCallback(async () => {
        if (!userId) return;

        try {
            const res = await axios.get(
                `https://wqjaxtdxzjmlsaeoxyhq.supabase.co/rest/v1/cart?user_id=eq.${userId}&select=*,products(*)`,
                {
                    headers: {
                        apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA",
                        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA",
                    }
                }
            );

            const grouped = {};

            for (let item of res.data) {
                if (grouped[item.product_id]) {
                    grouped[item.product_id].quantity += item.quantity || 1;
                } else {
                    grouped[item.product_id] = {
                        ...item,
                        quantity: item.quantity || 1,
                    };
                }
            }

            setCart(Object.values(grouped));
        } catch (err) {
            console.log("Error fetching cart:", err);
        }
    }, [userId]);

    // ✅ clean useEffect
    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    // increment quantity
    const cartIncrement = async (items) => {
        try {
            await axios.patch(
                `https://wqjaxtdxzjmlsaeoxyhq.supabase.co/rest/v1/cart?id=eq.${items.id}`,
                {
                    quantity: items.quantity + 1,
                },
                {
                    headers: {
                        apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA",
                        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA",
                        "Content-Type": "application/json",
                    },
                }
            );

            fetchCart(); // refresh cart
        } catch (err) {
            console.log("Something went wrong:", err);
        }
    };

    return (
        <div>
            <div>
                {cart.map((items) => (
                    <div key={items.id}>
                        <img
                            src={items.products?.image}
                            alt=""
                            className="w-40"
                        />

                        <button onClick={() => cartIncrement(items)}>
                            +
                        </button>

                        <span> Quantity: {items.quantity}</span>
                    </div>
                ))}
            </div>

            <button onClick={() => navigate("/checkout")}>
                Check out
            </button>
        </div>
    );
};

export default Cart;