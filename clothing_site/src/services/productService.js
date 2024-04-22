/**
 * Product Service
 * 
 * This function sends an HTTP GET request to the specified API endpoint
 * to retrieve product data. It expects a JSON response containing
 * information about the product.
 * 
 * @returns {Promise<object>} A promise that resolves to JSON data from the HTTP GET response.
 * 
 * @throws {Error} If an error occurs during the fetch operation.
 */ 


export const fetchProduct = async () => {
    try {
        const response = await fetch('https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }

        const jsonData = await response.json();
        return jsonData;

    } catch (error) {
        console.error('Error fetching product:', error);
        throw new Error('An unexpected error occurred while fetching product');
    }
};