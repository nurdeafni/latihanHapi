const Joi = require('@hapi/joi');
const Models = require('../../models/index')
const userHandler = async (request, h) => {
    try {
        const user = await Models.User.findAll({})
        return {
            statusCode: "200",
            error: "",
            message: "Succes",
            content: user
        }
    }
    catch (error) {
        return h.response({ error: error.message }).code(400)
    }
}

const createUserHandler = async (request, h) => {
    try {
        const { firstNameReq, lastNameReq, emailReq, genderReq, registerDateReq } = request.payload
        console.log(request.payload);
        const users = await Models.User.create({
            firstName: firstNameReq,
            lastName: lastNameReq,
            email: emailReq,
            gender: genderReq,
            registerDate: registerDateReq,
        })
        return {
            statusCode: "200",
            error: "",
            message: "Sukses terupload",
            content: users
        }
    }
    catch (error) {
        return h.response({
            error: error.message
        }).code(400)
    }
}

const patchUserHandler = async (request, h) => {
    try {
        const users_id = request.params.id;
        const { firstNameReq, lastNameReq, emailReq, genderReq, registerDateReq } =
            request.payload;
        const users = await Models.User.update({
            firstName: firstNameReq,
            lastName: lastNameReq,
            email: emailReq,
            gender: genderReq,
            registerDate: registerDateReq,
        }, {
            where: {
                id: users_id
            }
        })

        const contentRequest = request.payload
        console.log('contentRequest');
        console.log(users);
        return {
            statusCode: "200",
            error: "",
            message: "Sukses terupdate",
            content: contentRequest
        }
    }
    catch (error) {
        return h.response({
            error: error.message
        }).code(400)
    }
}

const deleteUserHandler = async (request, h) => {
    try {
        const users_id = request.params.id;
        await Models.User.destroy({
            where: {
                id: users_id
            }
        })
        return { message: 'Data berhasil dihapus.' }
    }
    catch (error) {
        return h.response({
            error: error.message
        }).code(400)
    }
}

module.exports = [
    { method: 'GET', path: '/user/list', handler: userHandler },

    {
        method: 'POST',
        path: '/user/postData',
        config: {
            validate: {
                payload: {
                    firstNameReq: Joi.string().required(),
                    lastNameReq: Joi.string().required(),
                    emailReq: Joi.string().email(),
                    genderReq: Joi.string().required(),
                    registerDateReq: Joi.date().required(),
                }
            }
        },
        handler: createUserHandler
    },

    { method: 'PATCH', path: '/user/postUpdate/{id}', handler: patchUserHandler },
    { method: 'DELETE', path: '/user/deleteUser/{id}', handler: deleteUserHandler },
];