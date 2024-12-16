import React, { useState } from "react";
import axios from "axios";

const AddProductModal = ({ isOpen, onClose, getProducts }) => {
    const port = import.meta.env.VITE_SERVER_PORT

    const [formData, setFormData] = useState({
        name: "",
        reference: "",
        price: "",
        quantity: "",
        description: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        formData.price = parseFloat(formData.price);
        formData.quantity = parseInt(formData.quantity);

        await addProduct(formData).catch((error) => console.error("Error adding product:", error));
        setFormData({ name: "", reference: "", price: "", quantity: "", description: "" });
        onClose(); // Fermer la popup après ajout
        getProducts(); // Mettre à jour la liste des produits
    };

    const addProduct = async (formData) => {
        try {
            let queryParameters = {
                product: formData
            }

            const response = await axios.post('http://localhost:' + port +'/addProduct', queryParameters);

        } catch (error) {
            console.error('Error adding product:', error);
        }
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Ajouter un produit</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Champ Nom */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nom du produit</label>
                        <input
                            autoComplete="off"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
                        />
                    </div>

                    {/* Champ Référence */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Référence</label>
                        <input
                            autoComplete="off"
                            type="text"
                            name="reference"
                            value={formData.reference}
                            onChange={handleChange}
                            required
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
                        />
                    </div>

                    {/* Champ Prix */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Prix (€)</label>
                        <input
                            autoComplete="off"
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            min="0"
                            step="0.01"
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
                        />
                    </div>

                    {/* Champ Prix */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Stock</label>
                        <input
                            autoComplete="off"
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            required
                            min="0"
                            step="0"
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
                        />
                    </div>

                    {/* Champ Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
                        ></textarea>
                    </div>

                    {/* Boutons */}
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="border-red-600 bg-white text-red-600 px-4 py-2 rounded hover:border-red-600 hover:bg-red-600 hover:text-white focus:outline-none outline-none mx-4"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="border-gray-800 bg-white text-gray-800 px-4 py-2 rounded hover:border-gray-800 hover:bg-gray-800 hover:text-white focus:outline-none outline-none mx-4"
                        >
                            Ajouter
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProductModal;
