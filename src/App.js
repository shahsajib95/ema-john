import React, { createContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Cart from "./Component/Home/Cart/Cart";
import Navbar from "./Component/Home/Navbar/Navbar";
import Products from "./Component/Home/Products/Products";

export const ProductsData = createContext()
export const CartsData = createContext()

const App = () => {

  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [finalCart, setFinalCart] = useState([])

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
  }, [products, cart])

  const handleProduct = prod => {

  
    const newCart = [...cart, prod]
   setCart(newCart)

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
        <CartsData.Provider value={[finalCart, setFinalCart]}>
          <Router>
            <Switch>
              <Route exact path="/">
                <div className="container">
                  <Navbar />
                  <Products handleProduct={handleProduct} />
                </div>
              </Route>
              <Route path="/cart">
                <div className="container">
                  <Navbar />
                  <Cart />
                </div>
              </Route>
            </Switch>
          </Router>
        </CartsData.Provider>
      </ProductsData.Provider>
    </div>
  );
};

export default App;