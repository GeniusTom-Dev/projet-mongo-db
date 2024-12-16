import React, {useState} from 'react';
import axios from "axios";
import {EditProductModal} from "./";

function LineItems(props) {

    const deleteProduct = async () => {
        try {
            const response = await axios.delete('http://localhost:5000/deleteOne', {
                data: { filter: { reference: props.reference } }
            });

            props.getProducts();

        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }

    return (
        <tr>
            <td className="px-6 py-4 whitespace-nowrap text-center">{props.name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-center">{props.reference}</td>
            <td className="px-6 py-4 whitespace-nowrap text-center">{props.price}€</td>
            <td className="px-6 py-4 whitespace-nowrap text-center">{props.quantity}</td>
            <td className="px-6 py-4 whitespace-nowrap text-center">
          <span
              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${props.quantity > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
          >
            {props.quantity > 0 ? "En stock" : "Hors stock"}
          </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-center">{props.description}</td>


            <td className="px-6 py-4 whitespace-nowrap flex justify-center text-center">
                <button
                    className="border-orange-600 bg-white text-orange-600 px-4 py-2 rounded hover:border-orange-600 hover:bg-orange-600 hover:text-white focus:outline-none outline-none mx-4"
                    onClick={() => props.openEditModal(props.reference)}
                >
                    Edit
                </button>
                <button
                    className="border-red-600 bg-white text-red-600 px-4 py-2 rounded hover:border-red-600 hover:bg-red-600 hover:text-white focus:outline-none outline-none mx-4"
                    onClick={() => deleteProduct()}
                >
                    Delete
                </button>
            </td>

        </tr>

    );
}

export default LineItems;