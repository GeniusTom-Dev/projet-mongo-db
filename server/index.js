const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors'); // Importer cors
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://tomeven:I1FolNn3GV5r6ZOx@cluster0.dd0qz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);



let collection = null

async function getCollection() {
    await client.connect();
    const database = client.db('store');
    return database.collection('stock');
}

// app.get('/products', async (req, res) => {
//     try {
//         if(collection === null) {
//             collection = await getCollection();
//         }
//         const products = await collection.find({}).toArray();
//         console.log(products)
//         res.json(products);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Erreur lors de la récupération des données.');
//     }
// });

app.get('/products', async (req, res) => {
    try {
        if (collection === null) {
            collection = await getCollection();
        }
        console.log(req.query)
        // Récupérer le paramètre de la requête
        const { reference } = req.query; // Utilise req.query pour accéder aux paramètres de la requête

        if (!reference) {
            return res.status(400).send('Référence manquante dans la requête');
        }

        const product = await collection.findOne({ reference: reference });

        if (!product) {
            return res.status(404).send('Produit non trouvé');
        }

        res.json(product); // Renvoie le produit trouvé
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la récupération du produit.');
    }
});


app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
