import React, { useContext, useEffect, useState } from 'react';
import { CartInfo, CartsData, ProductsData } from '../../../App';

const Cart = () => {

    const [products, setProducts] = useContext(ProductsData)
    const [finalCart, setFinalCart] = useContext(CartsData)
    const [cart, setCart] = useContext(CartInfo)
    const [qntity, setQntity] = useState(1)
    const total = finalCart.reduce((total, prod) => total + prod.quantity * prod.price, 0)
    const shipping = total / 20


    const finalCartPlus = (quantity, id) => {
        const product = products.find(prod => prod._id === id)
        const _id = product._id
        quantity = product.quantity
        product.quantity = quantity + 1
        setQntity(product.quantity)
        fetch('http://localhost:5000/updateCart', {
            method: 'PATCH',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ _id })
        })
    }

    const finalCartMinus = (quantity, id) => {
        const product = products.find(prod => prod._id === id)
        const _id = product._id
        quantity = product.quantity
        product.quantity = quantity <= 1 ? 1 : quantity - 1
        setQntity(JSON.parse(product.quantity))
        fetch('http://localhost:5000/decreaseCart', {
            method: 'PATCH',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ _id, count: product.quantity })
        })
    }

    const removeProduct = (id) =>{
        const _id = id;
        const removePd = finalCart.filter(pd=> pd._id !== id)
        setFinalCart(removePd)
        setCart(removePd)
        fetch('http://localhost:5000/deleteProduct',{
            method: 'DELETE',
            headers: { 'content-type' : 'application/json'},
            body: JSON.stringify({_id})
        })
    }

    return (
        <div>
            <h1 className="text-center">Shopping Cart</h1>
            <div className="row">
                <div className="col-md-9">
                    <p>Items</p>
                    {finalCart.map(pd =>

                        <div key={pd._id} className="d-flex display-content-between p-3">
                            <img className="p-2 w-25" src={pd.img} alt="" />
                            <div>
                              
                                <p className="ml-5">{pd.name}</p>
                                <p className="ml-5">{pd.price}</p>
                                <div className="m-3">
                                <button onClick={() => finalCartMinus((qntity), pd._id)}
                                    className="btn">-</button>

                                <button className="btn bg-white rounded">{pd.quantity}</button>


                                <button onClick={() => finalCartPlus((qntity), pd._id)}
                                    className="btn" >+</button>
                                </div>
                                <button onClick={()=> removeProduct(pd._id)} className="btn btn-warning m-3">Remove Item</button>

                            </div>
                        </div>
                    )}
                </div>
                <div className="col-md-3">
                    <div>Order summary</div>
                    <div className="d-flex justify-content-between mt-3"><p>Subtotal:</p> <p>${Math.floor(total)}</p></div>
                    <div className="d-flex justify-content-between"><p>Shipping:</p>  <p>${Math.floor(shipping)}</p></div>
                    <div className="d-flex justify-content-between"><p>Order Total:</p><p>${Math.floor(total + shipping)}</p></div>
                </div>
            </div>

        </div>
    );
};

export default Cart;