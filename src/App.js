import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Home from "./component/Home"
import About from "./component/About"
import Gallery from "./component/gallery"
import Navbar from "./component/Navbar"
import Register from "./component/Register"
import Login from "./component/Login"
import Products from "./component/Products"
import SingleProduct from "./component/SingleProduct"
import { useState } from "react"
import Cart from "./component/Cart"
import Wishlist from "./component/Wishlist"
import Checkout from "./component/Checkout"
import Orders from "./component/Orders"
import ProtectedRoute from "./component/ProtectedRoute"





const App = () => {

  const [loginUser,setLoginUser] = useState(JSON.parse(localStorage.getItem("user")) || null)



  return (
    <Router>
      <Navbar  displayUser = {loginUser}/>
    

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>}/>
        <Route path="/gallery" element={<ProtectedRoute><Gallery /></ProtectedRoute>} />
        <Route path = "/register" element = {<Register/>}/>
        <Route path = "/login" element = {<Login updatedUser = {setLoginUser}/>} />
        <Route path = "/product" element = {<ProtectedRoute><Products/></ProtectedRoute>} />
        <Route path = "/product/:id" element = {<ProtectedRoute><SingleProduct/></ProtectedRoute>} />
        <Route path = "/cart" element = {<ProtectedRoute><Cart/></ProtectedRoute>}/>
         <Route path = "/wishlist" element = {<ProtectedRoute><Wishlist/></ProtectedRoute>}/>
         <Route path = "/checkout" element = {<ProtectedRoute><Checkout/></ProtectedRoute>}/>
         <Route path = "/orders" element = {<ProtectedRoute><Orders/></ProtectedRoute>}/>
        
        
      </Routes>

    </Router>

  )

}

export default App