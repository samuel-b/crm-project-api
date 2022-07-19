import { CosmosClient } from "@azure/cosmos";

// Set connection string from CONNECTION_STRING value in local.settings.json
const CONNECTION_STRING = process.env.CONNECTION_STRING;

const clientService = {
    init() {
        try {
            this.client = new CosmosClient(CONNECTION_STRING);
            this.database = this.client.database("crm-project");
            this.container = this.database.container("clients");
        } catch (err) {
            console.log(err.message);
        }
    },
    async create(clientToCreate) {
        const { resource } = await this.container.items.create(clientToCreate);
        return resource;
    },
    async read(): Promise<string> {
        const iterator = this.container.items.readAll();
        const { resources } = await iterator.fetchAll();
        return JSON.stringify(resources);
    },
    async update(client) {
        const { resource } = await this.container
            .item(client.id, client.brand.name)
            .replace(client);
        return resource;
    },
    async delete(id, brandName) {
        const result = await this.container.item(id, brandName).delete();
    },
};

clientService.init();

export default clientService;
