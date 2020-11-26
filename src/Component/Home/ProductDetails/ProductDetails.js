import React, { useContext, useEffect, useState } from 'react';
import { CartsData, ProductsData, CartInfo } from '../../../App';
import { Link, useParams } from 'react-router-dom';
import Rating from 'react-rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const ProductDetails = () => {
    const [products] = useContext(ProductsData)
    const [finalCart, setFinalCart] = useContext(CartsData)
    const [cart, setCart] = useContext(CartInfo)
    const { productKey } = useParams()
    const [qntity, setQntity] = useState(1);
    const pdDetails = products.filter(pd => pd.key === productKey)

    useEffect(() => {
        if (finalCart.find(pd => pd.key === productKey)) {
            const isQuantity = finalCart.find(pd => pd.key === productKey)
            setQntity(isQuantity.quantity)
        }
        else if (products.length){
            const pd = products.find(pd=> pd.key === productKey)  
            pd.quantity = qntity;
            setQntity(pd.quantity)
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
    
        const _id = prod._id
    
          fetch(`http://localhost:5000/addtocart`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ _id, count: qntity })
          })
          console.log({ _id, count: qntity })
    
    }

    const handlePlus = (quantity, id) => {
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
    const handleMinus =  (quantity, id) => {
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





    return (
        <div>
            {products.length &&
                pdDetails.map(products =>
                    <div key={products._id} className="products d-flex display-content-between p-3 mt-3">
                        <div>
                            <img style={{ height: '200px' }} src={products.img} alt="" />
                        </div>
                        <div className="ml-4">
                            <h5>{products.name}</h5>
                            <div className="d-flex display-content-around">
                                <p className="text-warning">{products.seller}</p>
                                <p className="ml-3">Categoty: {products.category}</p>
                            </div>
                            <Rating
                                emptySymbol={<FontAwesomeIcon color={"#e4e5e9"} className="star" icon={faStar} />}
                                fullSymbol={<FontAwesomeIcon color={"#ffc107"} className="star" icon={faStar} />}
                                readonly
                                initialRating={products.star}
                            />
                            <h6 className="mt-3">Price: <strong>${products.price}</strong></h6>
                            <h6 className="mt-3">Stock: <strong>{products.stock}</strong></h6>
                            <div className="mt-3">
                                <button className="btn" onClick={() => handleMinus(qntity, products._id)}>-</button>
                                <input value={qntity} />
                                <button className="btn" onClick={() => handlePlus(qntity, products._id)}>+</button>
                            </div>
                            <button className="btn btn-warning w-25 mt-5" onClick={() => handleProduct(products)}>Buy Now</button>
                        </div>
                    </div>
                )}
        </div>
    );
};

export default ProductDetails;