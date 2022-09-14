import * as express from 'express';
import shortLinkController from "../../controllers/shortLink.controller";

const shortLinkRouter = express.Router();

shortLinkRouter.route('/redirect-link')
    .post(shortLinkController.redirectLink);

shortLinkRouter.route('/short-link')
    .post(shortLinkController.createShortLink);

export default shortLinkRouter;