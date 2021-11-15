const {User} = require('../dataBase');

module.exports = {
    getAllUsers: (query = {}) => {
        const {
            perPage = 20,
            page = 1,
            sortBy = 'createdAt',
            order = 'asc',
            ...filters
        } = query;

        const findObject = {};

        Object.keys(filters).forEach((filterParam) => {
            switch (filterParam) {
                case 'userName':
                    findObject.userName = {$regex: `^${filters.userName}`, $options: 'i'};
                    break;
                case 'type':
                    const rolesArray = filters.type.split(';');
                    findObject.type = {$in: rolesArray};
                    break;
            }
        });

        const orderBy = order === 'asc' ? -1 : 1;

        return User
            .find(findObject)
            .sort({[sortBy]: orderBy})
            .limit(+perPage)
            .skip((page - 1) * perPage);
    }
};
