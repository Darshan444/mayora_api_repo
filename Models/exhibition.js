// SCHEMA
const { exhibitions: exhibitionSchema } = require("./../Database/Schema");

class Faq {
    async getexhibitionDetailsById(id, allowedStatus) {
        return await exhibitionSchema.findOne({
            where: { id, status: allowedStatus }
        });
    }

    async listByPaginate(data, allowedStatus) {
        const condition = {status: allowedStatus};

        // Sorting and Pagination
        const currentPage = parseInt(data.currentPage) || 0;
        const limit = parseInt(data.itemsPerPage) || PAGINATION_PAGE_SIZE;
        const offset = currentPage * limit;
        const sortBy = [];
        if (data.sortBy && data.sortBy.length > 0) {
            data.sortBy.forEach((sort) => {
                sortBy.push([sort.id, sort.desc ? "desc" : "asc"]);
            });
        }

        return await exhibitionSchema.findAndCountAll({
            where: condition,
            offset,
            limit,
            order: [...sortBy]
        });
    }

    async add(data) {
        return await exhibitionSchema.create(data);
    }

    async updateById(data, id, allowedStatus) {
        return await exhibitionSchema.update(data, { where: { id, status: allowedStatus } });
    }

    async deleteById(id, allowedStatus) {
		let data = { status: STATUS.DELETED }
        return await exhibitionSchema.update(data, { where: { id, status: allowedStatus } });
    }

}

module.exports = Faq;
