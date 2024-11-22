import Product from "../models/product.js";
import multer from "multer";
import fs from "fs";
// import * as path from "node:path";
import path, { dirname } from 'path';
import { fileURLToPath}from'url';
import mongoSchema from "../models/mongoSchema.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const uploadPath = path.join(__dirname, '../uploads');
//         if (!fs.existsSync(uploadPath)) {
//             fs.mkdirSync(uploadPath, { recursive: true });
//         }
//         cb(null, uploadPath);
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${file.fieldname}-${Date.now()}`);
//     }
// });

const storage = multer.memoryStorage()

const upload = multer({ storage });


export const addProduct = async (req, res) => {
    upload.single('images')(req, res, async (err) => {

        // if (err) {
        //     return res.status(400).json({ status: "400", error: err.message });
        // }

        try {
            // Validate required fields
            const { name, description,price, isFavorite, image,sku } = req.body;
            console.log("Body =============>", req.body);

            if (!name || !price) {
                return res.status(400).json({ error: "Name and Price are required fields." });
            }

            const product = new Product({
                name,
                price,
                sku,
                description,
                // images: {
                //     // data: fs.readFileSync(path.join(__dirname, '../uploads' , req.file.filename)),
                //     // data: req.file.filename,
                //     contentType: req.file.mimeType,
                // },
                image: req.file.buffer ? req.file.buffer : null,
                isFavorite: isFavorite || false,
            });

            // Save to database
            console.log('Image File:', req.file);

            await mongoSchema.create(product);

            res.status(201).json({ message: "Product created successfully", product });
        } catch (error) {
            console.error("Error adding product:", error);
            res.status(500).json({ error: error.message });
        }
    });
};

// export const getProducts = async (req, res) => {
//     try {
//         const products = await Product.find();
//         // res.status(200).json(products);
//         const formattedProducts = products.map(product => ({
//             ...product._doc,
//             imgBase64: product.image.data.toString('base64'),
//         }));
//         res.json(formattedProducts);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
//
//
// };

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();

        const formattedProducts = products.map(product => ({
            ...product._doc,
            imgBase64: product.image
                ? product.image.toString('base64')
                : null,
        }));

        // Respond with formatted products
        res.status(200).json(formattedProducts);
    } catch (error) {
        // Handle errors
        console.error("Error fetching products:", error);
        res.status(500).json({ error: error.message });
    }
};

export const getFavoriteProducts = async (req, res) => {
    try {
        const products = await Product.find();

        const favoriteProducts = products.filter(product => product.isFavorite);
        res.status(200).json(favoriteProducts);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getProductById = async (req, res) => {

    const id = req.params.id;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id);
        res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const toggleFavorite = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        product.isFavorite = !product.isFavorite;
        await product.save();

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
