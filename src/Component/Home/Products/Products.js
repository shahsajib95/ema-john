import React, { useContext, useState } from 'react';
import './Products.css'
import { ProductsData } from '../../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import Rating from 'react-rating';
import Pagination from './Pagination/Pagination';

const Products = ({ handleProduct }) => {
    const [products, setProducts] = useContext(ProductsData)
    const [postPerPage, setPostPerPage] = useState(10)
    const [currentPage, setCurrentpage] = useState(1)
    const indexOfLastPost = currentPage * postPerPage;
    const indexofFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = products.slice(indexofFirstPost, indexOfLastPost)

    const paginate = pageNumber => setCurrentpage(pageNumber)
    return (
        <div>
            {currentPosts.map(products =>
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
                        <button className="btn btn-warning w-25 mt-5" onClick={() => handleProduct(products)}>Buy Now</button>
                    </div>
                </div>
            )}
            <Pagination postPerPage={postPerPage} totalPosts={products.length} paginate={paginate} />
        </div>
    );
};

export default Products;