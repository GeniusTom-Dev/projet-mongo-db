import React, {useContext} from 'react';

function LineItems(props) {

    return (
        <tr>
            <td className="px-6 py-4 whitespace-nowrap">{props.name}</td>
            <td className="px-6 py-4 whitespace-nowrap">{props.price} €</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${props.quantity > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
              >
                {props.quantity > 0 ? "En stock" : "Hors stock"}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">2000</td>
            <td className="px-6 py-4 whitespace-nowrap">200</td>
            <td className="px-6 py-4 whitespace-nowrap">20</td>
        </tr>
    );
}

export default LineItems;