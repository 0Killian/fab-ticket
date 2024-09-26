const Ticket = require("../models/Ticket")
const Borrow = require("../models/Borrow")
const Material = require("../models/Material")
const Op = require("sequelize").Op

const search = async (req,res) => {
    try {
        let query = req.query.query || "";
        let type = req.query.type;

        // Status
        let status = query.match(/status:[open|ongoing|closed]/g);
        if (status) {
            status = status.map(status => status.substring(7));
        } else {
            status = ["open", "ongoing", "closed"];
        }
        query = query.replace(/status:[open|ongoing|closed]/g, "");

        status = status.map(status => {
            if (status === "open") {
                return 0;
            } else if (status === "ongoing") {
                return 1;
            } else if (status === "closed") {
                return 2;
            }
        });

        // ID
        let ids = query.match(/#\d+/g);
        if (ids) {
            ids = ids.map(id => parseInt(id.substring(1)));
        } else {
            ids = [];
        }
        query = query.replace(/#\d+/g, "");

        if (type === undefined) {
            const msg = "type is required"
            console.log(msg);
            res.status(400).json({msg});
        } else if (type === "ticket") {
            if (query === "") {
                const result = await Ticket.findAll({
                    where: {
                        status: {
                            [Op.in]: statuses
                        },
                        id: {
                            [Op.in]: ids
                        }
                    }
                });
                res.status(200).json({result});
            } else {
                const result = await Ticket.findAll({
                    where: {
                        title: {
                            [Op.like]: `%${query}%`
                        },
                        status: {
                            [Op.in]: statuses
                        },
                        id: {
                            [Op.in]: ids
                        }
                    }
                });

                res.status(200).json({result});
            }
        }
    } catch (error) {
        console.error("error to get user:", error)
        res.status(500)
    }
}

module.exports = {
    search
}
