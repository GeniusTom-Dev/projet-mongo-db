import React, {useEffect, useState} from 'react';
import {LineItems, Navbar} from "../../components";
import axios from "axios";

function DashBoard(props) {

    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/products', {
                params: { reference: "FR14" } // Passer "reference" comme paramètre de requête
            });
            const productArray = Object.entries(response.data); // [ ["reference", "FR14"], ["name", "Product A"], ["price", 100] ]
            let newProductArray = [];
            for (let i = 0; i < productArray.length; i++) {
                const [key, value] = productArray[i];
                newProductArray.push({[key]: value});
            }

            console.log(newProductArray)

            setProducts(newProductArray);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };


    useEffect(() => {
        getProducts().then(r => console.log(r));

    }, []);

    return (
        <div className="flex h-screen">
            <Navbar/>

            <div className="flex-1 p-8">
                <div className="mb-6">
                    <h2 className="text-3xl font-bold">Tous les produits</h2>
                    <p className="text-gray-600 mt-1">
                        Gérez tous les produits de votre boutique dans le catalogue.
                    </p>
                    <div className="mt-4 flex space-x-2">
                        <button
                            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
                        >
                            Nouveau produit
                        </button>
                        <button
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                        >
                            Importer
                        </button>
                        <button
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                        >
                            Exporter
                        </button>
                        <button
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                        >
                            Modifier
                        </button>
                        <button
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                        >
                            Actions groupées
                        </button>
                    </div>
                </div>

                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Nom
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Prix
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Stock
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Statut
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Visites
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Commandes
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Stock
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {
                            products.map((product) => (
                                <LineItems
                                    key={product._id}
                                    name={product.name}
                                    price={product.price}
                                    quantity={product.quantity}
                                />
                            ))
                        }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default DashBoard;