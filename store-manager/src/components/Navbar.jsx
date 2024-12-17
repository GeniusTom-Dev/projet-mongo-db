import React from 'react';

function Navbar(props) {
    return (
        <aside className="w-64 bg-white p-6 border-r">
            <div className={"flex justify-between items-center mb-6"}>
                <h1 className="text-2xl font-bold">I. M.</h1>
                <img src={"./src/assets/logo.png"} alt={"logo"} className={"rounded-full w-12"}/>
            </div>
            <nav>
                <ul className="space-y-4">
                    <li>
                        <a
                            href="/"
                            className="block text-gray-900 font-semibold hover:text-gray-600"
                        >
                            Tous les produits
                        </a>
                    </li>
                    <li>
                        <a href="/products-hors-stock" className="block text-gray-600 hover:text-gray-900">
                            Produits hors stock
                        </a>
                    </li>
                    <li>
                        <a href="#" className="block text-gray-600 hover:text-gray-900">
                            Collections
                        </a>
                    </li>
                    <li>
                        <a href="#" className="block text-gray-600 hover:text-gray-900">
                            Catégories
                        </a>
                    </li>
                    <li>
                        <a href="#" className="block text-gray-600 hover:text-gray-900">
                            Marques
                        </a>
                    </li>
                    <li>
                        <a href="#" className="block text-gray-600 hover:text-gray-900">
                            Fournisseurs
                        </a>
                    </li>
                    <li>
                        <a href="#" className="block text-gray-600 hover:text-gray-900">
                            Listes de produits
                        </a>
                    </li>
                    <li>
                        <a href="#" className="block text-gray-600 hover:text-gray-900">
                            Produits en attente
                        </a>
                    </li>
                    <li>
                        <a href="#" className="block text-gray-600 hover:text-gray-900">
                            Produits supprimés
                        </a>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}

export default Navbar;