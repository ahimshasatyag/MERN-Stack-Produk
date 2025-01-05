const { getAllHistory } = require("../services/history");

async function getHistory(req, res) {
    try {
        const histories = await getAllHistory();  
        if (!histories || histories.length === 0) {
            return res.status(404).json({ success: false, message: "History tidak ditemukan" });
        }
        res.status(200).json({ success: true, histories });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

module.exports = { getHistory };
