import shortLinkService from "../services/shortLinkService";
import { Request , Response } from "express";

const createShortLink = async (request: Request, response: Response) => {
    const { url } = request.body;
    const newUrl: { isUrl: boolean, message: string | null } = await shortLinkService.createShortLink(url);

    if(!newUrl.isUrl) {
        return response.status(422).json({
            error: newUrl.message,
        });
    }

    response.status(201).json({
        shortLink: newUrl.message
    });
};

const redirectLink = async (request: Request, response: Response) => {
    const { url } = request.body;
    const link: string | undefined = await shortLinkService.getOriginalLink(url);

    response.status(200).json({
        link: link ?? ''
    });
};

export default { createShortLink, redirectLink };