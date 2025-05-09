import Bus from '../models/bus.js'

export const getBusDetails = async (req, res) => {
    try {
        const { busId } = req.params
        if (!busId) {
            return res.status(400).json({ error: "Bus ID is requried" });
        }
        const bus = await Bus.findOne({ busId })

        if (!bus) {
            return res.status(404).json({ error: "Bus not found" });
        }

        res.status(200).json({
            success: true,
            data: {
                busId: bus.busId,
                from: bus.from,
                to: bus.to,
                departureTime: bus.departureTime,
                arrivalTime: bus.arrivalTime,
                availableSeats: bus.availableSeats,
                price: bus.price,
                originalPrice: bus.originalPrice,
                company: bus.company,
                busType: bus.busType,
                rating: bus.rating,
                totalReviews: bus.totalReviews,
                badges: bus.badges,
                seats: bus.seats,
            }
        })
    } catch (error) {
        console.error("Error fetching bus details:", error);
        res.status(500).json({ error: "Internal Server error." })
    }
}

export const searchBuses = async (req, res) => {
    try {
        const { from, to, date } = req.body;
        if (!from || !to || !date) {
            return res
                .status(400)
                .json({ error: "from, to and date are required." });
        }

        const selectdDate = new Date(date);
        const startOfDay = new Date(selectdDate.setHours(0, 0, 0, 0));
        const endOfDay = new Date(selectdDate.setHours(23, 59, 59, 99));

        const buses = await Bus.find({
            from,
            to,
            departureTime: { $gte: startOfDay, $lte: endOfDay },
        });

        res.status(200).json({ success: true, data: buses });

    } catch (error) {
        console.error("Error searching buses:", error);
        res.status(500).json({ error: "Internal Server Error." })
    }
}