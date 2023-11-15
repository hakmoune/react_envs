import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ApiResponse, InputRefType } from "./data.type";


export const ApiCall: React.FC = () => {
    const [dataAxios, setDataAxios] = useState<ApiResponse | null>(null);
    const [dataFetch, setDataFetch] = useState<ApiResponse | null>(null);

    const inputRef = useRef<InputRefType>({});

    console.log("console", process.env.REACT_APP_API_BASE_URL)

    //AXIOS BASE URL/////////////////////////
    const instance = axios.create({
        baseURL: process.env.REACT_APP_API_BASE_URL,
        // Additional configuration if needed
    });

    //AXIOS/////////////////////////
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await instance.get(`/products`)
                setDataAxios(response.data)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
        fetchData();
    }, [])

    //AXIOS/////////////////////////
    const handleDeleteAxios = async (id: number) => {
        try {
            const response = await instance.delete(`/products/${id}`)
            if (response.status === 200) {
                setDataAxios(prevData => ({
                    //"!": It's a way of telling TypeScript, "I know this might be null, but I'm sure it's not, so treat it as non-null."
                    ...prevData!,
                    products: prevData!.products.filter(product => product.id !== id),
                }));
            } else {
                console.error(`Failed to delete item with ID ${id}. Status: ${response.status}`);
            }

        } catch (error) {
            console.error(`Failed to delete item with ID ${id}`, error)
        }
    }

    //AXIOS/////////////////////////
    const handleUpdateAxios = async (id: number) => {
        try {
            const response = await instance.patch(
                `/products/${id}`,
                { title: inputRef.current[id] },
                { headers: { 'Content-Type': 'application/json' } }
            )
            if (response.status === 200) {
                setDataAxios(prevData => ({
                    ...prevData!,
                    products: prevData!.products.map(product =>
                        product.id === id ? { ...product, title: inputRef.current[id] } : product
                    )
                }))
            } else {
                console.error(`Failed to update item with ID ${id}. Status: ${response.status}`)
            }

        } catch (error) {
            console.error(`Failed to update item with ID ${id}`, error)
        }
    }

    //AXIOS/////////////////////////
    const handleAddAxios = async () => {
        try {
            const response = await instance.post(
                `/products/add`,
                { title: inputRef.current['addAxios'] },
                { headers: { 'Content-Type': 'application/json' } }
            )
            if (response.status === 200) {
                setDataAxios(prevData => ({
                    ...prevData!,
                    products: [response.data, ...prevData!.products]
                }))
            } else {
                console.error(`Failed to create the item. Status: ${response.status}`)
            }
        } catch (error) {
            console.error(`Failed to create the item. Status: ${error}`)
        }
    }

    //FETCH/////////////////////////
    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(response => response.json())
            .then(data => setDataFetch(data))
            .catch(error => console.error('Error fetching data:', error))
    }, [])

    //FETCH/////////////////////////
    const handleDeleteFetch = (id: number) => {
        fetch(`https://dummyjson.com/products/${id}`, {
            method: 'DELETE',
        })
            .then(res => {
                if (!res.ok)
                    throw new Error(`Failed to delete item with ID ${id}`)
            })
            .then(() => {
                setDataFetch((prevData) => ({
                    //"!": It's a way of telling TypeScript, "I know this might be null, but I'm sure it's not, so treat it as non-null."
                    ...prevData!,
                    products: prevData!.products.filter(product => product.id !== id)
                }))
            })
            .catch(error => {
                console.error(error.message)
            })
    };

    //FETCH/////////////////////////
    const handleUpdateFetch = (id: number) => {
        fetch(`https://dummyjson.com/products/${id}`, {
            method: 'PUT', /* or PATCH */
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: inputRef.current[id]
            })
        })
            .then(res => {
                if (!res.ok)
                    throw new Error(`Failed to update item with ID ${id}`)
            })
            .then(() => {
                setDataFetch(prevData => ({
                    ...prevData!,
                    products: prevData!.products.map(product =>
                        product.id === id ? { ...product, title: inputRef.current[id] } : product
                    )
                }))
            })
            .catch(error => {
                console.error(error.message)
            })
    }

    //FETCH/////////////////////////
    const handleAddFetch = () => {
        fetch(`https://dummyjson.com/products/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: inputRef.current["addFetch"]
            })
        })
            .then(res => {
                if (!res.ok)
                    throw new Error(`Failed to Add the item`)

                return res.json()
            })
            .then(data => {
                setDataFetch(prevData => ({
                    ...prevData!,
                    products: [data, ...prevData!.products]
                }))
            })
            .catch(error => console.error(error.message))
    }

    return (
        <div>
            <h2>List Product with axios</h2>
            <div>
                <input type="text" onChange={(e) => inputRef.current['addAxios'] = e.target.value} placeholder="axios value" />
                <button onClick={() => handleAddAxios()}>ADD AXIOS</button>
            </div>
            <ul>
                {dataAxios?.products.map(product => (
                    <li key={product.id}>
                        <input
                            type="text"
                            defaultValue={product.title}
                            onChange={e => inputRef.current[product.id] = e.target.value}
                            placeholder={`axios update value ${product.id}`}
                        />
                        <button onClick={() => handleDeleteAxios(product.id)}>Delete Axios {product.id}</button>
                        <button onClick={() => handleUpdateAxios(product.id)}>Update Axios {product.id}</button>
                    </li>
                ))
                }
            </ul>

            <h2>List Product with Fetch</h2>
            <div>
                <input type="text" onChange={(e) => inputRef.current['addFetch'] = e.target.value} placeholder="fetch value" />
                <button onClick={() => handleAddFetch()}>ADD FETCH</button>
            </div>
            <ul>
                {dataFetch?.products.map(product => (
                    <li key={product.id}>
                        <input
                            type="text"
                            defaultValue={product.title}
                            onChange={e => inputRef.current[product.id] = e.target.value}
                            placeholder={`fetch update value ${product.id}`}
                        />
                        <button onClick={() => handleDeleteFetch(product.id)}>Delete Fetch {product.id}</button>
                        <button onClick={() => handleUpdateFetch(product.id)}>Update Fetch {product.id}</button>
                    </li>
                ))
                }
            </ul>
        </div>
    );
}