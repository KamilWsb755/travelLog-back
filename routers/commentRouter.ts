import { Router } from "express";
import { CommentRecord } from "../records/comment.record";

export const commentRouter = Router()
    .get('/', async (req, res) => {
        const comments = await CommentRecord.getAll();
        res.json(comments);
    })
    .get('/:id', async (req, res) => {
        const { id } = req.params;
        const comment = await CommentRecord.getOne(id);
        res.json(comment);
    })
    .post('/', async (req, res) => {
        console.log(req.body)
        const comment = new CommentRecord(req.body);
        await comment.insert();
        res.json(comment)
    })