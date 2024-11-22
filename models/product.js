import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number },
    description: { type: String },
    sku : {type: String},
    image: { type: Buffer },
    // mainImage: { type: String },
    isFavorite: { type: Boolean, default: false },
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
});

const Product = mongoose.model('Product', ProductSchema);
export default Product;
