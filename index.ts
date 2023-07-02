import axios, { AxiosError } from 'axios';
import express from 'express';
 
const APP: express.Application = express();
const PORT: number = 3000;
const BASE_URL = `https://jsonplaceholder.typicode.com`;
const MAX_RETRIES = 5;

async function request<Type>(path: string, res: express.Response): Promise<Awaited<Type | undefined>> {
    let retryCount = 0;
    let error: AxiosError | undefined;
    while(retryCount < MAX_RETRIES) {
        try {
            const response = await axios.get(BASE_URL + path);
            return response.data;
        } catch (err: any) {
            retryCount++;
            error = err;
        }
    }
    if (!!error)
        res.send(`Request failed: ${error.message}`)
}

const getFullAddress = ({ street, suite, city, zipcode }: Address): string => {
    return `[${street}] [${suite}] [${city}] [${zipcode}]`;
};

const getCoordinatesPair = ({ geo }: Address) => `(${geo.lat}, ${geo.lng})`;

APP.get('/', (req, res) => {
    res.send("Hello world");
});

// TODO: Refactor to use MVC architecture

APP.get('/users', async (req, res) => {
    const usersResponse = await request<User[]>('/users', res);
    const usersData = usersResponse?.map((user: User) => {
        const [firstName, lastName] = user.name.split(" ");
        return {
            id: user.id,
            prefix: "Mr.", // TODO: How can I get this value?
            firstName,
            lastName,
            email: user.email,
            address: getFullAddress(user.address),
            geolocation: getCoordinatesPair(user.address),
            companyName: user.company.name
        }
    });
    res.send(usersData);
});

APP.listen(PORT, () => {
    console.log(`Starting server in port ${PORT}`);
});