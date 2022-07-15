import { NextFunction, Request, Response } from "express";


export class ValidationError extends Error { }

export const handleError = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    res
        .status(err instanceof ValidationError ? 400 : 500)
        // Tu właśnie okreslamy, że jak to okreslony błąd to dajemy message, a jak nie to żeby nie podać wrażliwych danych podajemy tylko Srry, please try again later
        .json({
            message: err instanceof ValidationError ? err.message : 'Sorry, please try again later.'
        })
} 