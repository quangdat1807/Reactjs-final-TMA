import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react'
import NotFound from '../components/home/NotFound';
import toast, { Toaster } from 'react-hot-toast';

export const Context = createContext();

export const DataProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [categories, setCategory] = useState([]);
    const [total, setTotal] = useState(0);
    const [dataSearch, setDataSearch] = useState([]);
    const [inputSearch, setInputSearch] = useState('')

    useEffect(() => {
        const ListProduct = async () => {
            await axios("http://localhost:8080")
                .then(result => {
                    setProducts(result.data);
                },
                    (error) => {
                        console.log(error);
                    }
                )
        }
        ListProduct()

        const ListCategory = async () => {
            await axios('http://localhost:8080/category')
                .then(result => {
                    setCategory(result.data);
                },
                    (err) => {
                        console.log(err);
                    })
        };
        ListCategory();

        const dataCart = JSON.parse(localStorage.getItem('dataCart'));
        if (dataCart !== null) {
            setCart(dataCart);
        }
        const dataTotal = JSON.parse(localStorage.getItem('dataTotal'));
        if (dataTotal !== null) {
            setTotal(dataTotal);
        }
    }, [])

    const addCart = (id) => {
        toast.success('Thêm thành công!');
        const check = cart.every(item => {
            return item.id !== id;
        })
        if (check) {
            const data = products.filter(product => {
                return product.id === id;
            })
            setCart([...cart, ...data])
        } else {
            increase(id)
        }
    }

    const reduction = id => {
        cart.forEach(item => {
            if (item.id === id) {
                // if(item.quantity <= 1) {
                //     removeProduct(id)
                // }else {
                //     item.quantity -= 1
                // }
                item.quantity <= 1 ? removeProduct(id) : item.quantity -= 1;

            }
        })
        setCart(cart)
        getTotal()
    }

    const increase = id => {
        cart.forEach(item => {
            if (item.id === id) {
                item.quantity += 1;
            }
        })

        setCart(cart)
        getTotal()
    }

    const removeProduct = id => {
        if (window.confirm('Are you sure you want to remove Product?')) {
            cart.forEach((item, index) => {
                if (item.id === id) {
                    cart.splice(index, 1);
                }
            })
            setCart(cart)
            getTotal()
            if (cart.length === 0) {
                window.location.reload();
                CartEmpty()
            }
        }

    }

    const CartEmpty = () => {
        return (
            <>
                <NotFound />
            </>
        )
    }


    const getTotal = () => {
        const res = cart.reduce((prev, item) => {
            return prev + (item.quantity * item.price);
        }, 0)
        setTotal(res)
    }

    useEffect(() => {
        localStorage.setItem('dataCart', JSON.stringify(cart));
        localStorage.setItem('dataTotal', JSON.stringify(total));
    })

    const requestSearch = (e) => {
        const inputSearch = e.target.value.toLowerCase();
        setInputSearch(inputSearch)

        const filterSearch = products.filter((dataSearch) => {
            return dataSearch.name.toLowerCase().includes(inputSearch.toLowerCase());
        });
        setDataSearch(filterSearch);
        console.log(inputSearch)
        console.log(dataSearch)
    };

    const cancelSearch = () => {
        setInputSearch('')
        requestSearch(inputSearch)
    }

    const value = {
        products, categories, addCart, cart,
        reduction, increase, removeProduct, total, getTotal,
        requestSearch, inputSearch, dataSearch, cancelSearch, CartEmpty
    };

    return (
        <Context.Provider value={value}> {children} </Context.Provider>
    )

}
