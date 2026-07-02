import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import bcrypt from "bcryptjs"


const Register = () => {

    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")


    const handleRegister = async (event) => {
        event.preventDefault()
        
        const hansedPassword = await bcrypt.hash(password,10)
         const data = { username, password : hansedPassword, email, phone }

        try {
           
            const res = await axios.post("https://wqjaxtdxzjmlsaeoxyhq.supabase.co/rest/v1/register", data, {
                headers: {
                    apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA",
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA",
                    "Content-Type": "application/json",
                    Prefer: "return=representation",
                }

            })
            alert("Register successfully")
            console.log(res.data)
            navigate("/login")

        }
        catch (err) {
            console.log("something went to wrong", err)

        }

    }



    return (
        <div>
            <form onSubmit={handleRegister}>
                <div>
                    <input type="text" placeholder="Enter your Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <input type="password" placeholder="Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <input type="email" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <input type="phone" placeholder="Enter your phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <button type="submit">Register</button>
            </form>

        </div>
    )
}

export default Register