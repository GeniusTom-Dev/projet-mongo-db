const express = require('express');
const { MongoClient, Double, ObjectId} = require('mongodb');
const cors = require('cors'); // Importer cors
const app = express();
const PORT = 5013;

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

app.get('/products', async (req, res) => {
    try {
        if (collection === null) {
            collection = await getCollection();
        }

        const find = req.query.filter ? JSON.parse(req.query.filter) : {};
        const sort = req.query.sort ? JSON.parse(req.query.sort) : {};
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50;


        const products = await collection.find(find).sort(sort).skip((page-1)*limit).limit(limit).toArray()


        if (products.length === 0) {
            return res.status(404).send('Produit non trouvé');
        }

        res.json(products); // Renvoie le produit trouvé
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la récupération du produit.');
    }
});

app.get('/productCount', async (req, res) => {
    try {
        if (collection === null) {
            collection = await getCollection();
        }
        const count = await collection.countDocuments();
        res.json({ count });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la récupération du nombre de produits.');
    }
});

app.get('/searchProducts', async (req, res) => {
    try {
        if (collection === null) {
            collection = await getCollection();
        }
        const value = req.query.value ? req.query.value : "";
        const regex = new RegExp(value, 'i');
        const products = await collection.find({
            $or: [
                {name: { $regex: regex  }},
                {quantity: { $regex: regex }},
                {reference: { $regex: regex }},
                {price: { $regex: regex }},
                {description: { $regex: regex }}
            ]
        }).limit(10).toArray();

        if (products.length === 0) {
            return res.status(404).send('Produit non trouvé');
        }

        res.json(products); // Renvoie le produit trouvé
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la récupération du produit.');
    }
});



app.put('/updateOneProduct', async (req, res) => {
    try {
        if (collection === null) {
            collection = await getCollection();
        }
        let filter = req.body.filter;

        let updateSet = req.body.updateSet;
        delete updateSet._id;

        updateSet.price = new Double(updateSet.price);

        console.log(filter)
        console.log(updateSet)
        const result = await collection.updateOne(filter, { $set: updateSet });
        console.log(result)
        res.json(result);
    } catch (error) {
        let errorDetails = [];
        for (let i = 0; i < error.errorResponse.errInfo.details["schemaRulesNotSatisfied"][0]["propertiesNotSatisfied"].length; i++) {
            const errorObject = error.errorResponse.errInfo.details["schemaRulesNotSatisfied"][0]["propertiesNotSatisfied"][i]
            errorDetails.push(errorObject.propertyName + " : " + errorObject.details[0].reason + ". Attempted value : " + errorObject.details[0].specifiedAs.bsonType + ". Considered type : " + errorObject.details[0].consideredType)
        }
        console.log(errorDetails)
        res.status(500).send('Error updating one product.');
    }
});

app.post('/addProduct', async (req, res) => {
    try {
        if (collection === null) {
            collection = await getCollection();
        }
        const product = req.body.product;
        product.price = new Double(product.price);


        const result = await collection.insertOne(product);
        res.json(result);
    } catch (error) {
        let errorDetails = [];
        for (let i = 0; i < error.errorResponse.errInfo.details["schemaRulesNotSatisfied"][0]["propertiesNotSatisfied"].length; i++) {
            const errorObject = error.errorResponse.errInfo.details["schemaRulesNotSatisfied"][0]["propertiesNotSatisfied"][i]
            errorDetails.push(errorObject.propertyName + " : " + errorObject.details[0].reason + ". Attempted value : " + errorObject.details[0].specifiedAs.bsonType + ". Considered type : " + errorObject.details[0].consideredType)
        }
        console.log(errorDetails)
        res.status(500).send(errorDetails);
    }
});

app.delete('/deleteOne', async (req, res) => {
    try {
        if (collection === null) {
            collection = await getCollection();
        }

        const filter = req.body.filter ? req.body.filter : "";
        if(req.body.filter === "") {
            return res.status(400).send('Paramètre filter manquant');
        }
        const products = collection.deleteOne(filter);

        if (products.length === 0) {
            return res.status(404).send('Produit non trouvé');
        }
        res.json(products); // Renvoie le produit trouvé
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la récupération du produit.');
    }
});

app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
