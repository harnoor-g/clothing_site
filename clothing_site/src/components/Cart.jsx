/* eslint-disable react/prop-types */

/**
 * Cart Component
 * 
 * This component displays the items in the cart.
 * 
 * @param {array} cartItems - An array containing the items in the cart.
 * @param {boolean} isCartHidden - A boolean indicating whether the cart is hidden.
 * @param {object} productData - An object containing data about the product.
 * 
 * @returns {JSX.Element} JSX element representing the cart.
 */


function Cart({ cartItems, isCartHidden, productData }) {
    if (cartItems === []) {
        return (
            <div>No items in cart</div>
        );
    } else if (productData === null) {
        return (
            <div>Loading...</div>
        );
    }

    return (
        <div className="cart-items" hidden={isCartHidden}>
            {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                    <div  >
                        <img src={productData.imageURL} className="cart-item-img" alt="Classic Tee" />
                    </div>
                    <div className="product-info-container">
                        <div>{productData.title}</div>
                        <div>
                            <span>{item.quantity}x</span>
                            <span>${productData.price.toFixed(2)}</span>

                        </div>
                        <div>Size: {item.size}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Cart;