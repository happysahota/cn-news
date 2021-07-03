import { Request, Response, NextFunction } from 'express';

export const jwtFunction = (req: Request, res: Response, next: NextFunction) => {

    // we can have few validations here to secure app. And respond accordingly: res.sendStatus(401) --- Unauthorized or res.sendStatus(403) --- Forbidden;

    next();

};
