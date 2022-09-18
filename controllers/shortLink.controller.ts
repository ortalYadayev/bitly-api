import shortLinkService from "../services/shortLinkService";
import { Request , Response } from "express";

const createShortLink = async (request: Request, response: Response) => {
    const { longLink } = request.body;
    const newUrl: {
        isUrl: boolean,
        message?: string,
        link?: any,
    } = await shortLinkService.createShortLink(longLink);

    if (!newUrl.isUrl && newUrl?.message) {
        return response.status(422).json({
            message: newUrl.message,
        });
    }

    if (newUrl?.link)
        return response.status(201).json({
            shortLink: newUrl.link.short_url,
            longLink: newUrl.link.original_url,
        });

    return response.status(201).json();
}

const redirectLink = async (request: Request, response: Response) => {
    const { url } = request.body;
    const link: string | undefined = await shortLinkService.getOriginalLink(url);

    response.status(200).json({
        link: link ?? ''
    });
};

export default { createShortLink, redirectLink };