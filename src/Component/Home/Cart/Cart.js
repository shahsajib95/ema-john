import { counter } from '@fortawesome/fontawesome-svg-core';
import React, { useContext, useState } from 'react';
import { CartsData } from '../../../App';

const Cart = () => {
    const [finalCart, setFinalCart] = useContext(CartsData)
    const [quantity, setQuantity] = useState(1)
    console.log(finalCart)

    const hanldeChange = (pd)=>{
        console.log(pd)
    }
    const hanldeQuanityPlus = (pd)=>{
        const pdQuantity = pd.quantity
        console.log(pdQuantity + 1)
    }
    const hanldeQuanityMinus = (pd)=>{
        console.log(pd)
    }
    return (
        <div>
            <h1 className="text-center">Shopping Cart</h1>
            <p>Items</p>
            {finalCart.map(pd =>

                <div key={pd._id} className="d-flex display-content-between">
                    <img className="p-2 w-25" src={pd.img} alt="" />
                    <div>
                        <p className="ml-5">{pd.name}</p>
                        <p className="ml-5">{pd.price}</p>

                        <button  onClick={() => hanldeQuanityMinus(pd)}
                            className="btn">-</button>

                        <input className="w-25" onChange={()=> hanldeChange(pd) } value={quantity} type="number" />


                        <button onClick={() => hanldeQuanityPlus(pd)}
                            className="btn" >+</button>

                    </div>
                </div>
            )}

        </div>
    );
};

export default Cart;