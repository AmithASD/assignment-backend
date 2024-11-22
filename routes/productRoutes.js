import express from "express";
import multer from "multer";
import {
    addProduct,
    getProductById,
    getProducts,
    updateProduct,
    deleteProduct,
    getFavoriteProducts,
    toggleFavorite,
} from "../controllers/productController.js";
import {CheckAuth} from "../middleware/check-auth.js";
// import {logger} from "../utils/logger.js";

const router = express.Router();

// Multer configuration
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads/");
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}-${file.originalname}`);
//     },
// });
//
// const upload = multer({
//     storage,
//     limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype.startsWith("image/")) {
//             cb(null, true);
//         } else {
//             cb(new Error("Only image files are allowed!"), false);
//         }
//     },
// });

// router.post("/save-data", upload.array("images", 5), addProduct);
router.post("/save-data", CheckAuth, addProduct);
router.get("/get-data", CheckAuth, getProducts);
router.get("/get-data/:id", CheckAuth, getProductById);
router.post("/edit-product/:id", CheckAuth, updateProduct);
router.delete("/delete-data/:id", CheckAuth, deleteProduct);
router.get("/get-favorite-data", CheckAuth, getFavoriteProducts);
router.post('/toggle-favorite/:id', CheckAuth, toggleFavorite);

export default router;
