import { createContext, useState, useEffect } from 'react';

export const ProductsContext = createContext({
    products: [],
})

export const ProductProvider = ({children}) => {
    const [products, setProducts] = useState([])
    const value = {products}
    let { id } = useParams();
    console.log(id)

    useEffect(() => {
        const fetchData = async () => {
            await axios("http://localhost:8080/detail/" + id)
                .then(result => {
                    console.log(result);
                    setProducts(result.products);
                },
                    (error) => {
                        console.log(error);
                    }
                )
        };
        fetchData();
    }, [])

    return (
        <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
    )
}