import { Router } from "express";
import { TravelRecord } from "../records/addTravel.record";

export const travelRouter = Router()
    .get('/', async (req, res) => {
        const travels = await TravelRecord.getAll();
        res.json(travels);
    })
    .get('/:id', async (req, res) => {
        const { id } = req.params;
        const travel = await TravelRecord.getOne(id);
        res.json(travel);
    })
    .post('/', async (req, res) => {
        const travel = new TravelRecord(req.body);
        await travel.insert();
        res.json(travel)
    })