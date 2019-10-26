const Joi= require('@hapi/joi');
const Models = require('../../models/index');
const usersHandler= async (request, h) => {
    try{
        const user= await Models.User.findAll({})
        return {
            statusCode:200,
            eror:'', 
            massage:'Success',
            data: user
        }
    }catch(error){
        return h.response({error: error.message}).code(400)
       }
    }

    const createUserHandler = async (request, h) => {
        try{
            const{ fristNameReq, lastNameReq, emailReq, genderReq, registerDateReq}= request.payload
            console.log(request.payload);
            const users= await Models.User.create({
                firstName : fristNameReq,
                lastName : lastNameReq,
                email : emailReq,
                gender: genderReq,
                registerDate: registerDateReq
            })
            return{
                statusCode:200,
                eror:'', 
                message: 'New user has been created.',
                content: users
                
            }
            }
            catch (error){
                return h.response({
                    error: error.message
                }).code(400)
        }
    }

    const updateUserHandler = async (request, h) => {
        try{
            const user_id = request.params.id;
            const{ fristNameReq, lastNameReq, emailReq,genderReq,registerDateReq} = request.payload;
            const users = await Models.User.update({
                firstName: fristNameReq,
                lastName: lastNameReq,
                email: emailReq,
                gender: genderReq ,
                registerDate: registerDateReq
            }, {
                where:{
                    id: user_id
                }
            })
            const dataRequest = request.payload
            console.log('dataRequest');
            console.log(users);
            return{
                data: dataRequest,
                message: 'User has been updated'
            }
        }catch (error) {
            return h.response({
                error: error.message
            }).code(400)
        }
    }
    const deleteUserHandler = async (request, h) => {
        try{
            const user_id = request.params.id;
            await Models.User.destroy({
                where:{
                    id: user_id
                }
            })
            return {message: 'User has been deletred.'}
        } catch (error){
            return h.response({
                error: error.message
            }).code(400)
        }
    }

module.exports =[
    {method: 'GET',path: '/user/list',handler: usersHandler},
    
    {
        method: 'POST',
        path: '/user/postData',
        handler: createUserHandler
    },
    {method: 'PATCH', path: '/user/postUpdate/{id}', handler: updateUserHandler},
    {method: 'DELETE', path: '/user/deleteUser/{id}', handler: deleteUserHandler},
]