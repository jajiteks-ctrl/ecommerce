import axios from "axios"
import { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"

const Cart = () => {
    const navigate = useNavigate()
    const [cart, setCart] = useState([])
    const user = JSON.parse(localStorage.getItem("user")) || []

    const fecthCart = useCallback(async () => {

        try {
            const res = await axios.get(`https://wqjaxtdxzjmlsaeoxyhq.supabase.co/rest/v1/cart?user_id=eq.${user.id}&select=*,products(*)`, {
                headers: {
                    apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA",
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA",
                }


            })
            console.log(res.data)

            const grouped = {}

            for (let item of res.data) {
                if (grouped[item.product_id]) {

                    grouped[item.product_id].quantity++
                }
                else {
                    grouped[item.product_id] = item
                }
            }

            setCart(Object.values(grouped))



        }
        catch (err) {
            console.log("something went to wrong", err)

        }


    } ,[user?.id]
    )


    useEffect(() => {
        if (user?.id) {
            fecthCart();
        }
    }, [user?.id, fecthCart]);

    const cartIncrement = async (items) => {

        try {
            const res = await axios.patch(`https://wqjaxtdxzjmlsaeoxyhq.supabase.co/rest/v1/cart?id=eq.${items.id}`, {
                quantity: items.quantity + 1
            }, {
                headers: {
                    apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA",
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA",
                    "Content-Type": "application/json",
                }
            })

            console.log(res.data)
            fecthCart()

        }
        catch (err) {
            console.log("somethign went to wrong", err)
        }

    }


    return (
        <div>

            <div>

                {cart.map((items) => (
                    <div>
                        <img src={items.products?.image} alt="" className="w-40" />

                        <button onClick={() => cartIncrement(items)}>+</button> <span>Quantity : {items.quantity}</span>
                    </div>
                ))}

            </div>

            <button onClick={() => navigate("/checkout")}>Check out</button>
        </div>
    )

}

export default Cart