import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";

const tapRfid = asyncHandler(async (req: any, res: Response) => {
    
    const {rfidData} = req.body;
    req.io.emit('new_rfid_tap', rfidData)
    res.status(200);
});

export {tapRfid}