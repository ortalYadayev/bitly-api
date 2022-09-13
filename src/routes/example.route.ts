import express from 'express';
import exampleController from "../../controllers/example.controller";

const exampleRouter = express.Router();

exampleRouter.route('/')
    .get(exampleController.getAll)

export default exampleRouter;