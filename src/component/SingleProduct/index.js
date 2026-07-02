
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const SingleProduct = () => {

    const { id } = useParams()

    const [singleProduct, setSingleProduct] = useState(null)

    useEffect(() => {

        const handleSingleProduct = async () => {
            try {

                const res = await axios.get(`https://wqjaxtdxzjmlsaeoxyhq.supabase.co/rest/v1/products?id=eq.${id}`, {
                    headers: {
                        apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA",
                        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA"
                    }

                    
                })
                console.log(res.data)
                setSingleProduct(res.data[0])

            }
            catch (err) {
                console.log("Something went to wrong", err)
            }
        }
        handleSingleProduct()

    },[id])

    return (

        <div>
            <h1>Single Product</h1>
            
        </div>
    )
}

export default SingleProduct