import express from 'express';
import axios, { AxiosError } from 'axios';
import jwt from 'jsonwebtoken';
 
const APP = express();
const PORT: number = 3000;
const BASE_URL = `https://jsonplaceholder.typicode.com`;
const MAX_RETRIES = 5;
const TOP_SECRET_FIRM = 'SuperSecretFirm';

// Middleware section
APP.use(express.json());

function authenticateUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    const token = req.headers.authorization;
    if (!token) 
        return res.status(400)
            .json({ message: 'missing autherization token' });
    
    jwt.verify(token, TOP_SECRET_FIRM, (err, user: UserDto) => {
        if (err || user.role !== 'ADMIN') 
            return res.status(403);
        req.user = user;
        next();
    });
};

APP.get('/', (req, res) => {
    res.send("Hello world");
});

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
        res.json(`Request failed: ${error.message}`)
}

const getFullAddress = ({ street, suite, city, zipcode }: Address): string => {
    return `[${street}] [${suite}] [${city}] [${zipcode}]`;
};

const getCoordinatesPair = ({ geo }: Address) => `(${geo.lat}, ${geo.lng})`;

// TODO: Refactor to use MVC architecture

APP.get('/login', (req, res) => {
    const { userId, role }: UserDto = req.body;
    const token = jwt.sign({ userId, role }, 
        TOP_SECRET_FIRM, 
        { expiresIn: '1h' });
    res.json({ token, expiresIn: '1h' });
});

APP.get('/users', authenticateUser, async (req, res) => {
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
    res.json(usersData);
});

APP.listen(PORT, () => {
    console.log(`Starting server in port ${PORT}`);
});