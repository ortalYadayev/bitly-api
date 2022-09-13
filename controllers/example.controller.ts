import exampleService from "../services/exampleService";

const getAll = async (req: any, res: any, next: any) => {
    const example = await exampleService.getAll();

    res.status(200).json(example);
};

export default { getAll };