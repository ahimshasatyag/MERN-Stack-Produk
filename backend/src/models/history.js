const mongoose = require("../configuration/dbConfig");
const Schema = mongoose.Schema;

const historySchema = new Schema({
    customer_id: {
        type: Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    },
    purchase_id: {
        type: Schema.Types.ObjectId,
        ref: "Purchase",
        required: true
    },
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
}, { timestamps: true });

// Untuk menambahkan populate pada customer_id, purchase_id, dan produk_id
historySchema.methods.populateDetails = async function() {
    const populatedHistory = await this.populate('customer_id', 'nama_customer')
                                       .populate('purchase_id')
                                       .populate('produk_id', 'nama_produk')
                                       .execPopulate();
    return populatedHistory;
};

module.exports = mongoose.model("History", historySchema);
