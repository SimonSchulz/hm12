import { NextFunction, Request, Response } from "express";
import { HttpStatus } from '../../../core/types/http-statuses';
import {blogService} from "../../domain/blog.service";
import { NotFoundError } from "../../../core/utils/app-response-errors";

export async function deleteBlogHandler(req: Request<{id:string}>, res: Response, next: NextFunction): Promise<void> {
    try{
        const id = req.params.id;
        const blog = await blogService.findByIdOrFail(id);
        if (!blog) { throw new NotFoundError('Blog not found'); }
        await blogService.delete(id);
        res.sendStatus(HttpStatus.NoContent);
    }
    catch (e: unknown) {
        next(e);
    }
}