// SCHEMA
const {
    users: userSchema,
    user_tokens: userTokenSchema,
} = require('./../Database/Schema');

class User {

    async getUserTokenInfo(access_token) {
        return await userTokenSchema.findOne({
            where: {
                access_token
            },
            attributes: ['user_id', 'updatedAt'],
            include: [
                {
                    model: userSchema,
                }
            ]
        });
    }
}

module.exports = User;