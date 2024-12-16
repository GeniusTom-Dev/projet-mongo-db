import React, {useEffect, useState} from 'react';
import {AddProductModal, EditProductModal, LineItems, Navbar} from "../../components";
import axios from "axios";

function DashBoard(props) {

    const port = import.meta.env.VITE_SERVER_PORT

    const [sort, setSort] = useState({"price": 1})
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);   // Total pages state
    const [nbAffiche, setNbAffiche] = useState(10);   // Number of items to display per page


    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);

    const getProducts = async () => {
        try {
            let queryParameters = {
                sort: JSON.stringify(sort),
                page: currentPage,
                limit: nbAffiche
            }

            const response = await axios.get('http://localhost:' + port +'/products', {
                params: queryParameters
            });

            const count = await axios.get('http://localhost:' + port +'/productCount');

            setTotalPages(Math.ceil(count.data.count / nbAffiche))

            setProducts(Object.entries(response.data))
        } catch (error) {
            console.error('Error get product:', error);
        }
    };
    const filterByKeyword = async (value) => {
        try {
            let queryParameters = {
                value: value
            }

            const response = await axios.get('http://localhost:' + port +'/searchProducts', {
                params: queryParameters
            });

            setTotalPages(1)

            setProducts(Object.entries(response.data))
        } catch (error) {
            console.error('Error adding product:', error);
        }
    }

    const openEditModal = (reference) => {
        for (let i = 0; i < products.length; i++) {
            if (products[i][1].reference === reference) {
                setFormData(products[i][1])
                setIsModalOpenEdit(true)
            }
        }

    }

    const orderBy = (key) => {
        let actualSort = Object.entries(sort)
        if(key === actualSort[0][0]){
            setSort({[key]: -actualSort[0][1]})
        }else{
            setSort({[key]: 1})
        }
    }

    const getArrowSort = (key) => {
        let actualSort = Object.entries(sort)
        let arrow = "sort"
        if(key === actualSort[0][0]){
            if(actualSort[0][1] === 1){
                arrow = "sort-up"
            }else{
                arrow = "sort-down"
            }
        }
        return "./src/assets/" + arrow + ".svg"
    }

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    useEffect(() => {
        getProducts().catch((error) => console.error("Error adding product:", error));
    }, [sort,currentPage,nbAffiche]);

    return (
        <div className="flex h-screen">
            <Navbar/>

            <AddProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                getProducts={getProducts}
            />

            <EditProductModal
                isOpen={isModalOpenEdit}
                onClose={() => setIsModalOpenEdit(false)}
                getProducts={getProducts}
                formData={formData}
                setFormData={setFormData}
            />

            <div className="flex-1 p-8">
                <div className="mb-6">
                    <h2 className="text-3xl font-bold">Tous les produits</h2>
                    <p className="text-gray-600 mt-1">
                        Gérez tous les produits de votre boutique dans le catalogue.
                    </p>
                    <div className="mt-4 flex space-x-2">
                        <button
                            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
                            onClick={() => setIsModalOpen(true)}
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
                        <select
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 focus:outline-none"
                            value={nbAffiche}
                            onChange={(e) => {
                                setCurrentPage(1)
                                setNbAffiche(Number(e.target.value))

                            }}
                        >
                            {Array.from({length: 20}, (_, i) => (i + 1) * 5).map((value) => (
                                <option key={value} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>

                        <div className="flex-grow"></div>

                        <input
                            type="text"
                            placeholder="Rechercher un produit"
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 focus:outline-none"
                            onChange={(e) => filterByKeyword(e.target.value)}
                        />


                    </div>
                </div>

                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center cursor-pointer"
                                onClick={() => orderBy("name")}
                            >
                                <div className={"flex justify-center items-center"}>
                                    Nom

                                    <img src={getArrowSort("name")} alt={"arrow-sort"} className={"ml-2 w-2"}/>
                                </div>
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center cursor-pointer"
                                onClick={() => orderBy("reference")}
                            >
                                <div className={"flex justify-center items-center"}>
                                    Référence
                                    <img src={getArrowSort("reference")} alt={"arrow-sort"} className={"ml-2 w-2"}/>
                                </div>
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center cursor-pointer"
                                onClick={() => orderBy("price")}
                            >
                                <div className={"flex justify-center items-center"}>
                                    Prix
                                    <img src={getArrowSort("price")} alt={"arrow-sort"} className={"ml-2 w-2"}/>
                                </div>
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center cursor-pointer"
                                onClick={() => orderBy("quantity")}
                            >
                                <div className={"flex justify-center items-center"}>
                                    Stock
                                    <img src={getArrowSort("quantity")} alt={"arrow-sort"} className={"ml-2 w-2"}/>
                                </div>
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
                            >
                                Statut
                            </th>

                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center cursor-pointer"
                                onClick={() => orderBy("description")}
                            >
                                <div className={"flex justify-center items-center"}>
                                    Description
                                    <img src={getArrowSort("description")} alt={"arrow-sort"} className={"ml-2 w-2"}/>
                                </div>
                            </th>

                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
                            >
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {
                            products.map((product, id) => (
                                <LineItems
                                    key={id}
                                    name={product[1].name}
                                    price={product[1].price}
                                    quantity={product[1].quantity}
                                    description={product[1].description}
                                    reference={product[1].reference}
                                    getProducts={getProducts}
                                    openEditModal={openEditModal}

                                />
                            ))
                        }


                        </tbody>
                    </table>
                </div>

                <div className="py-12 flex justify-center items-center space-x-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:bg-gray-100"
                    >
                        Précédent
                    </button>
                    {Array.from({length: totalPages}, (_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={`px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-gray-800 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:bg-gray-100"
                    >
                        Suivant
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DashBoard;