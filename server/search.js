const { Ticket } = require("../models");
const { Op } = require("sequelize");

module.exports = async (config, type, query, limit, offset) => {
    try {
        console.log("Searching for " + type + " with query: " + query);

        // Status
        let status = query.match(/status:(open|ongoing|closed)\s?/g);
        if (status) {
            status = status.map(status => status.substring(7).trim());
        } else {
            status = ["open", "ongoing", "closed"];
        }
        query = query.replace(/status:(open|ongoing|closed)\s?/g, "");

        status = status.map(status => {
            console.log(status);
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
            console.log("type is required");
            return [];
        } else if (type === "ticket") {
            let opts = {
                where: {
                    status: {
                        [Op.in]: status
                    },
                }
            };

            if (query !== "") {
                opts.where.title = {
                    [Op.like]: `%${query}%`
                }
            }

            if (ids.length > 0) {
                opts.where.id = {
                    [Op.in]: ids
                }
            }

            if (limit !== undefined && offset !== undefined) {
                return await Ticket.findAll({
                    ...opts,
                    limit,
                    offset
                });
            } else {
                return await Ticket.findAll(opts);
            }
        }
    } catch (error) {
        console.error("error to get user:", error)
        return [];
    }
}
