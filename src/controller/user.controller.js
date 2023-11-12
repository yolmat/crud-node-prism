import bcrypt from "bcrypt"
import { userValidation } from "../validation/validation";
import { createUser, getAll, getById, updateUser, deleteUser } from "../repositorys/use.repository";
import { response } from "express";

export const create = async (request, response) => {
    try {
        await userValidation.validate(request.body)

        const hasPassword = await bcrypt.hash(request.body.password, 10)
        request.body.password = hasPassword

        const user = await createUser(request.body)
        response.status(200).send(user)

    } catch (error) {
        response.status(400).send(error)
        console.log(error)
    }
}

export const get = async (request, response) => {
    try {
        const users = await getAll();
        response.status(200).send(users)
    } catch (error) {
        response.status(400).send(error)
    }
}

export const getId = async (resquest, response) => {
    try {
        const user = await getById(resquest.params.id)
        response.status(200).send(user)
    } catch (error) {
        response.status(400).send(error)
    }
}

export const update = async (request, response) => {
    try {
        const user = await updateUser(request.params.id, request.body)
        response.status(200).send(user)
    } catch (error) {
        response.status(400).send(error)
    }
}

export const remove = async (request, response) => {
    try {
        await deleteUser(request.params.id)
        response.status(200).send()
    } catch (error) {
        response.status(400).send(error)
    }
}