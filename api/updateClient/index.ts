import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import clientService from "../services/clientService";

const httpTrigger: AzureFunction = async function (
    context: Context,
    req: HttpRequest,
): Promise<void> {
    let response;

    if (req.params.id !== req.body.id) {
        context.res = { status: 400 };
        return;
    }

    try {
        const client = req.body;
        const result = await clientService.update(client);
        response = { body: result, status: 200 };
    } catch (err) {
        response = { body: err.message, status: 500 };
    }

    context.res = response;
};

export default httpTrigger;
