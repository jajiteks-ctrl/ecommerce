import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import "./Wishlist.css"



const Wishlist = () => {
    const [wishlist, setWishlist] = useState([])

    const user = JSON.parse(localStorage.getItem("user")) || []
    const userId = user?.id

  


    const getAllWishlist = useCallback(async  () => {

        try {

            const res = await axios.get(`https://wqjaxtdxzjmlsaeoxyhq.supabase.co/rest/v1/wishlist?user_id=eq.${userId}&select=id,products(title,image,price)`, {
                headers: {
                    apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA",
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA",
                }

            })

            console.log(res.data)
            setWishlist(res.data)

        }
        catch (err) {
            console.log("something went to wrong", err)
        }

    },[userId])

      useEffect(() => {
        if (userId) {
            getAllWishlist()

        }

    }, [getAllWishlist,userId])
    return (
        <div className="wishlist-container">
            {wishlist.map((items) => (
                <div >
                    <img src={items.products?.image} alt="" className="wishlist-img" />
                </div>
            ))}
        </div>

    )
}

export default Wishlist