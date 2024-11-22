import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
    // name: { type: String, required: true },
    // desc: { type: String, required: true },
    image: { type: Buffer},
    name: { type: String, required: true },
    price: { type: Number },
    description: { type: String },
    // images: [{ type: String }],
    // mainImage: { type: String },
    isFavorite: { type: Boolean, default: false },
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
});

 const mongoSchema =mongoose.model('products',imageSchema);
export default mongoSchema
