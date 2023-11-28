import { RequestHandler } from 'express';
import LifecoModel from "../models/lifeco"

export const getLifecos: RequestHandler =  async (req, res, next) => {
    try {
        const lifecos = await LifecoModel.find().exec();
        res.status(200).json(lifecos);
    } catch (error) {
        next(error);
    }
}

export const getSingleLifeco: RequestHandler = async (req, res, next) => {
    try {
        const {id} = req.params;
        const singleLifeco = await LifecoModel.findById(id).exec();
        res.status(200).json(singleLifeco)
    } catch (error) {
        next(error)
    }
}

export const createLifeco: RequestHandler =  async (req, res, next) => {
    try {
        const lifeco = req.body;
        const createLifecoo = await LifecoModel.create(lifeco)
        console.log(createLifecoo)
        res.status(201).json(createLifecoo)
        
    } catch (error) {
        next(error);
    }
}