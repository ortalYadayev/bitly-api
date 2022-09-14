import * as express from 'express';
import shortLinkController from "../../controllers/shortLink.controller";

const shortLinkRouter = express.Router();

shortLinkRouter.route('/')
    .get(shortLinkController.createShortLink);

shortLinkRouter.route('/shorten-link')
    .post(shortLinkController.createShortLink);

export default shortLinkRouter;