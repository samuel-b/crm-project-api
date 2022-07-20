import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import clientService from "../services/clientService";

const httpTrigger: AzureFunction = async function (
    context: Context,
    req: HttpRequest,
): Promise<void> {
    let response;

    try {
        const id = req.params.id;
        const pk = req.params.id;
        const result = await clientService.delete(id, pk);
        response = { body: result, status: 200 };
    } catch (err) {
        response = { body: err.message, status: 500 };
    }

    context.res = response;
};

export default httpTrigger;
