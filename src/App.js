import React, { createContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Cart from "./Component/Home/Cart/Cart";
import Navbar from "./Component/Home/Navbar/Navbar";
import ProductDetails from "./Component/Home/ProductDetails/ProductDetails";
import Products from "./Component/Home/Products/Products";
import Login from "./Component/Login/Login";
import PrivateRoute from "./Component/PrivateRoute/PrivateRoute";

export const ProductsData = createContext()
export const CartsData = createContext()
export const CartInfo = createContext()
export const UserData = createContext()

const App = () => {

  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [finalCart, setFinalCart] = useState([])
  const [userData, setUserData] = useState({
    name: '',
    email: '',
  })

  useEffect(() => {
    fetch('http://localhost:5000/allproducts')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
      })
  }, [])

  useEffect(() => {
    fetch('http://localhost:5000/cartproduct')
      .then(res => res.json())
      .then(data => {
        setCart(data)
      })
  }, [])



  useEffect(() => {
    if (products.length) {
      const cartPd = cart.map(id => {
        const product = products.find(pd => pd._id === id._id)
        product.quantity = id.count
        return product;
      })
      setFinalCart(cartPd)
    }
  }, [products])


  const handleProduct = prod => {

    const alreadyAdded = cart.find(crt => crt._id === prod._id);
    const newCart = [...cart, prod]
    setCart(newCart);
    if (alreadyAdded) {
      const reamingCarts = cart.filter(crt => cart._id !== prod);
      setCart(reamingCarts);
    } else {
      const newCart = [...cart, prod]
      setCart(newCart);
    }

    const quantity = 1
    const _id = prod._id

    if (cart.find(pd => pd._id === _id)) {
      console.log('upated')
      fetch(`http://localhost:5000/updateCart`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ _id })
      })
      console.log({ _id, count: quantity })
    } else {
      console.log('add')
      fetch(`http://localhost:5000/addtocart`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ _id, count: 1 })
      })
      console.log({ _id, count: quantity })

    }

  }

  return (
    <div>
      <ProductsData.Provider value={[products, setProducts]}>
        <UserData.Provider value={[userData, setUserData]}>
          <CartsData.Provider value={[finalCart, setFinalCart]}>
            <CartInfo.Provider value={[cart, setCart]}>
              <Router>
                <Switch>
                  <Route exact path="/">
                    <div className="container">
                      <Navbar />
                      <Products handleProduct={handleProduct} />
                    </div>
                  </Route>
                  <Route path="/product/:productKey">
                    <div className="container">
                      <Navbar />
                      <ProductDetails handleProduct={handleProduct} />
                    </div>
                  </Route>
                  <Route path="/cart">
                    <div className="container">
                      <Navbar />
                      <Cart />
                    </div>
                  </Route>
                  <Route path="/login">
                    <Login/>
                  </Route>
                </Switch>
              </Router>
            </CartInfo.Provider >
          </CartsData.Provider>
        </UserData.Provider>
      </ProductsData.Provider>
    </div>
  );
};

export default App;