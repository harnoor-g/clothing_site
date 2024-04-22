import { useEffect, useState } from 'react';
import './App.css';
import { fetchProduct } from './services/productService';
import Cart from './components/Cart';
import Product from './components/Product';


function App() {
    const [cartItems, setCartItems] = useState([]);
    const [isCartHidden, setCartHidden] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [itemsCount, setItemsCount] = useState(0);
    const [productData, setProductData] = useState(null);
    const [selectedSizeId, setSelectedSizeId] = useState(-1);
    const [selectedSizeLabel, setSelectedSizeLabel] = useState('');
    const [sizeOptions, setSizeOptions] = useState(null);

    const handleSizeSelection = (sizeOptionId) => {
        if (selectedSizeId !== sizeOptionId) {
            setSelectedSizeId(sizeOptionId);
            setSelectedSizeLabel(sizeOptions[sizeOptionId - 1].label);
        } else {
            setSelectedSizeId(-1);
            setSelectedSizeLabel('');
        }
        setErrorMessage('');
    }

    const handleCartVisibility = () => {
        setCartHidden(visible => !visible)
    }

    const handleAddToCart = () => {
        if (selectedSizeId !== -1) {
            const existingItemIdx = cartItems.findIndex(item => item.id === selectedSizeId);

            if (existingItemIdx !== -1) {
                const updateCartItems = [...cartItems];
                updateCartItems[existingItemIdx].quantity++;
                setCartItems(updateCartItems);
            } else {
                setCartItems(prevItems => [
                    ...prevItems,
                    {
                        id: selectedSizeId,
                        size: selectedSizeLabel,
                        quantity: 1
                    }
                ]);
            }
            setItemsCount(count => ++count);
        } else {
            setErrorMessage('Please select a size.')
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchProduct();
            if (data !== null) {
                setProductData(data);
                setSizeOptions(data.sizeOptions);
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            <nav className="navbar">
                <div className="content-container">
                    <button className="cart-link" onClick={handleCartVisibility}>My Cart ({itemsCount})</button>
                    <Cart cartItems={cartItems} isCartHidden={isCartHidden} productData={productData} />
                </div>
            </nav>

            <main>
                <div className="content-container">
                    <Product
                        handleAddToCart={handleAddToCart}
                        handleSizeSelection={handleSizeSelection}
                        errorMessage={errorMessage}
                        productData={productData}
                        selectedSizeId={selectedSizeId}
                        selectedSizeLabel={selectedSizeLabel}
                        sizeOptions={sizeOptions}
                    />
                </div>
            </main>
        </div>
    );
}


export default App;
