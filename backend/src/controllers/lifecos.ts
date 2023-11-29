import { RequestHandler } from 'express';
import LifecoModel from "../models/lifeco"
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import ILifecoBody from '../interfaces/lifecoInterface';

export const getLifecos: RequestHandler =  async (req, res, next) => {
    try {
        const lifecos = await LifecoModel.find().exec();
        res.status(200).json(lifecos);
    } catch (error) {
        next(error);
    }
}

export const getSingleLifeco: RequestHandler = async (req, res, next) => {
    const { id } = req.params;

    try {
        if (!mongoose.isValidObjectId(id)) {
            throw createHttpError(400, "Invalid Lifeco ID") 
        }

        const singleLifeco = await LifecoModel.findById(id).exec();

        if (!singleLifeco) {
            throw createHttpError(404, "Lifeco not found")
        }
        res.status(200).json(singleLifeco)
    } catch (error) {
        next(error)
    }
}

export const createLifeco: RequestHandler<unknown, unknown, ILifecoBody, unknown> =  async (req, res, next) => {
    try {
        if (!req.body.title) {
            throw createHttpError(400, "Title is required")
        }

        const lifeco = req.body;
        const createLifecoo = await LifecoModel.create(lifeco)
        console.log(createLifecoo)
        res.status(201).json(createLifecoo)
        
    } catch (error) {
        next(error);
    }
}

interface updateLifecoParams {
    id: string
}

export const updateLifeco: RequestHandler<updateLifecoParams, unknown, ILifecoBody, unknown> = async (req, res, next) => {
    const {id} = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw createHttpError(400, "Invalid Lifeco ID")
        }

        if (req.body.title === "") {
            throw createHttpError(400, "Lifeco has to have a title")
        }

        const lifeco = await LifecoModel.findByIdAndUpdate({_id: id}, {...req.body}, {new: true}).exec();
        console.log(lifeco)

        if (!lifeco) {
            throw createHttpError(404, "Lifeco not found")
        }

        res.status(200).json(lifeco)
        
    } catch (error) {
        next(error);
    }
}

export const deleteLifeco: RequestHandler = async (req, res, next) => {
    const {id} = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw createHttpError(400, "ID not found")
        }

        const deletedLifeco = await LifecoModel.findByIdAndDelete({_id: id}).exec()

        if (!deletedLifeco) {
            throw createHttpError(400, "Lifeco doesn't exist")
        }

        res.sendStatus(204)

    } catch(error) {
        next(error)
    }
}