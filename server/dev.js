const { MongoClient, ServerApiVersion, Double} = require('mongodb');
const uri = "mongodb+srv://tomeven:I1FolNn3GV5r6ZOx@cluster0.dd0qz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        const database = client.db("store");
        const collection = database.collection("stock");
        const allData = await updateProduct(collection);
        console.log(allData);
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
function updateProduct(collection){
    // { name: "", reference: "", price: "", quantity: "", description: "" }
    return collection.insertMany(
        [
            { name: "Laptop", reference: "AB12", price: new Double(1000), quantity: 10, description: "High-end laptop" },
            { name: "Smartphone", reference: "CD34", price: new Double(800), quantity: 15, description: "Latest model" },
            { name: "Tablet", reference: "EF56", price: new Double(500), quantity: 12, description: "Portable tablet" },
            { name: "Headphones", reference: "GH78", price: new Double(150), quantity: 25, description: "Wireless headphones" },
            { name: "Monitor", reference: "IJ90", price: new Double(300), quantity: 20, description: "4K monitor" },
            { name: "Keyboard", reference: "KL01", price: new Double(50), quantity: 30, description: "Mechanical keyboard" },
            { name: "Mouse", reference: "MN23", price: new Double(40), quantity: 35, description: "Ergonomic mouse" },
            { name: "Printer", reference: "OP45", price: new Double(200), quantity: 8, description: "All-in-one printer" },
            { name: "Router", reference: "QR67", price: new Double(120), quantity: 18, description: "WiFi router" },
            { name: "Speakers", reference: "ST89", price: new Double(180), quantity: 22, description: "Bluetooth speakers" },
            { name: "Smartwatch", reference: "UV12", price: new Double(250), quantity: 14, description: "Waterproof watch" },
            { name: "Camera", reference: "WX34", price: new Double(700), quantity: 10, description: "Digital camera" },
            { name: "Tripod", reference: "YZ56", price: new Double(80), quantity: 18, description: "Compact tripod" },
            { name: "Drone", reference: "AA78", price: new Double(1200), quantity: 7, description: "4K drone" },
            { name: "Charger", reference: "BB90", price: new Double(30), quantity: 50, description: "Fast charger" },
            { name: "Backpack", reference: "CC01", price: new Double(70), quantity: 25, description: "Laptop backpack" },
            { name: "Desk", reference: "DD23", price: new Double(300), quantity: 12, description: "Adjustable desk" },
            { name: "Chair", reference: "EE45", price: new Double(200), quantity: 20, description: "Ergonomic chair" },
            { name: "Lamp", reference: "FF67", price: new Double(40), quantity: 30, description: "Desk lamp" },
            { name: "Fan", reference: "GG89", price: new Double(60), quantity: 15, description: "Portable fan" },
            { name: "Watch", reference: "HH12", price: new Double(150), quantity: 22, description: "Smartwatch" },
            { name: "TV", reference: "II34", price: new Double(1200), quantity: 5, description: "OLED TV" },
            { name: "Console", reference: "JJ56", price: new Double(500), quantity: 8, description: "Gaming console" },
            { name: "Controller", reference: "KK78", price: new Double(60), quantity: 40, description: "Wireless controller" },
            { name: "VR Headset", reference: "LL90", price: new Double(400), quantity: 6, description: "Virtual reality" },
            { name: "Pen", reference: "MM01", price: new Double(10), quantity: 100, description: "Stylus pen" },
            { name: "Notebook", reference: "NN23", price: new Double(20), quantity: 75, description: "Hardcover notebook" },
            { name: "Scanner", reference: "OO45", price: new Double(250), quantity: 10, description: "Document scanner" },
            { name: "Phone Case", reference: "PP67", price: new Double(20), quantity: 50, description: "Durable case" },
            { name: "Power Bank", reference: "QQ89", price: new Double(70), quantity: 25, description: "Portable charger" },
            { name: "Projector", reference: "RR12", price: new Double(350), quantity: 10, description: "Mini projector" },
            { name: "Cable", reference: "SS34", price: new Double(15), quantity: 60, description: "USB cable" },
            { name: "Adapter", reference: "TT56", price: new Double(25), quantity: 40, description: "Power adapter" },
            { name: "Case", reference: "UU78", price: new Double(50), quantity: 30, description: "Hard shell case" },
            { name: "Docking Station", reference: "VV90", price: new Double(200), quantity: 12, description: "USB-C dock" },
            { name: "Microphone", reference: "WW01", price: new Double(120), quantity: 18, description: "Studio microphone" },
            { name: "Webcam", reference: "XX23", price: new Double(90), quantity: 20, description: "HD webcam" },
            { name: "Fitness Tracker", reference: "YY45", price: new Double(100), quantity: 14, description: "Health tracker" },
            { name: "Home Assistant", reference: "ZZ67", price: new Double(150), quantity: 8, description: "Smart assistant" },
            { name: "E-Reader", reference: "AB89", price: new Double(200), quantity: 10, description: "E-book reader" },
            { name: "Soundbar", reference: "CD12", price: new Double(300), quantity: 12, description: "TV soundbar" },
            { name: "Gamepad", reference: "EF34", price: new Double(50), quantity: 25, description: "Gaming gamepad" },
            { name: "Bluetooth Dongle", reference: "GH56", price: new Double(20), quantity: 35, description: "USB dongle" },
            { name: "SSD", reference: "IJ78", price: new Double(100), quantity: 18, description: "500GB SSD" },
            { name: "RAM", reference: "KL90", price: new Double(80), quantity: 20, description: "16GB RAM" },
            { name: "Graphics Card", reference: "MN01", price: new Double(500), quantity: 5, description: "Gaming GPU" },
            { name: "Processor", reference: "OP23", price: new Double(300), quantity: 7, description: "CPU processor" },
            { name: "Motherboard", reference: "QR45", price: new Double(250), quantity: 6, description: "Gaming motherboard" },
            { name: "Hard Drive", reference: "ST67", price: new Double(80), quantity: 15, description: "2TB HDD" },
            { name: "Cooler", reference: "UV89", price: new Double(40), quantity: 25, description: "PC cooler" },
            { name: "Power Supply", reference: "WX12", price: new Double(120), quantity: 10, description: "750W PSU" }
        ]

    );
}


run().catch(console.dir);