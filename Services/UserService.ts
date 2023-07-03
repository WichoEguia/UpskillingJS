import { request } from "../Utils/RequestUtils";

export class UserService {
    private getFullAddress({ street, suite, city, zipcode }: Address): string {
        return `[${street}] [${suite}] [${city}] [${zipcode}]`;
    }
    
    private getCoordinatesPair({ geo }: Address) {
        return `(${geo.lat}, ${geo.lng})`;
    }

    public async getUsers(): Promise<unknown> {
        const usersResponse = await request<User[]>('/users');
        const usersData = usersResponse?.map((user: User) => {
            const [firstName, lastName] = user.name.split(" ");
            return {
                id: user.id,
                prefix: "Mr.", // TODO: How can I get this value?
                firstName,
                lastName,
                email: user.email,
                address: this.getFullAddress(user.address),
                geolocation: this.getCoordinatesPair(user.address),
                companyName: user.company.name
            }
        });
        return usersData;
    };
}