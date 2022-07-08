import React from 'react';
import { Link } from 'react-router-dom';
import "./CartItemCard.css";

const CartItemCard = ({item, deleteCartItems}) => {
    return (
        <div className='CartItemCard'>
            <img src={item.image} alt="ssa" />
            <div>
                <Link to={`/product/${item.product}`}>{item.name}</Link>
                <span>{`Cena: ${item.price},00 RSD`}</span> 
                <p onClick={() => deleteCartItems(item.product)}>Obriši</p>
            </div>
        </div>
    ) 
}

export default CartItemCard
