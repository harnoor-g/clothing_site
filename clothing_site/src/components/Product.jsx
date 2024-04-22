/* eslint-disable react/prop-types */

/**
 * Product Component
 * 
 * This component displays product information and allows users to select a size and add the product to the cart.
 * 
 * @param {Function} handleAddToCart - A function to handle adding the product to the cart.
 * @param {Function} handleSizeSelection - A function to handle selecting a size for the product.
 * @param {string} errorMessage - An error message to display, if any.
 * @param {object} productData - An object containing data about the product.
 * @param {number} selectedSizeId - The ID of the selected size.
 * @param {string} selectedSizeLabel - The label of the selected size.
 * @param {Array<object>} sizeOptions - An array of objects representing available size options for the product.
 * 
 * @returns {JSX.Element} JSX element representing the product or a loading indicator.
 */

function Product({ handleAddToCart, handleSizeSelection, errorMessage, productData, selectedSizeId, selectedSizeLabel, sizeOptions }) {

    if (productData === null) {
        return (
            <div>Loading...</div>
        );
    }

    return (
        <div className="product-container">
            <div className="product-img-container">

                <img src={productData.imageURL} alt="Classic Tee" />
            </div>
            <div className="product-info-container">
                <h3>{productData.title}</h3>
                <div className="divider"></div>
                <p className="price">${productData.price.toFixed(2)}</p>
                <div className="divider"></div>
                <p className="description">{productData.description}</p>
                <div className="size-selection">
                    <label htmlFor="size">SIZE<span className="asterisk">*</span><span>{selectedSizeLabel}</span></label>
                    <div className="sizes">
                        {sizeOptions.map((sizeOption) => (
                            <div
                                key={sizeOption.id}
                                className={`size-option ${selectedSizeId === sizeOption.id ? 'selected' : ''}`}
                                onClick={() => handleSizeSelection(sizeOption.id)}
                            >
                                {sizeOption.label}
                            </div>
                        ))}
                    </div>
                </div>
                <button className="add-to-cart" onClick={handleAddToCart}>ADD TO CART</button>
                <div>{errorMessage}</div>
            </div>
        </div>
    );
}

export default Product;