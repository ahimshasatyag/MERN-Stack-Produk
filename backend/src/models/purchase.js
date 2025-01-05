const mongoose = require("../configuration/dbConfig");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    produk_id: {
        type: Schema.Types.ObjectId,
        ref: "Produk", 
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    harga: {
        type: Number,
        required: true
    }
});

const purchaseSchema = new Schema({
    customer_id: {
        type: Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    },
    items: [itemSchema],
}, { timestamps: true });

purchaseSchema.pre('save', async function(next) {
    if (this.isModified('items') || this.isNew) {
        const Produk = mongoose.model('Produk');
        for (let item of this.items) {
            const produk = await Produk.findById(item.produk_id); // Temukan Produk menggunakan produk_id
            if (produk) {
                item.harga = produk.harga * item.quantity; 
            }
        }
    }
    next();
});

purchaseSchema.methods.populateDetails = async function() {
    const populatedPurchase = await this.populate('customer_id', 'nama_customer').execPopulate();
    return populatedPurchase;
};


module.exports = mongoose.model("Purchase", purchaseSchema);
