import shortenLinkService from "../services/shortLinkService";

const createShortLink = async (request: any, response: any, next: any) => {
    const { url } = request.body;
    const newUrl: { isUrl: boolean, message: string | null } = await shortenLinkService.createShortLink(url);

    if(!newUrl.isUrl) {
        return response.status(422).json({
            error: newUrl.message,
        });
    }

    response.status(201).json(newUrl.message);
};

export default { createShortLink };