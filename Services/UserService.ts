import { request } from "../Utils/RequestUtils";

export class UserService {
    private getFullAddress({ street, suite, city, zipcode }: Address): string {
        return `[${street}] [${suite}] [${city}] [${zipcode}]`;
    }
    
    private getCoordinatesPair({ geo }: Address): string {
        return `(${geo.lat}, ${geo.lng})`;
    }

    public async getUsers(): Promise<UserDto> {
        const usersResponse = await request<User[]>('/users');
        const usersData: UserDto[] = usersResponse?.map(user => {
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

    public async getUserPost(userId: string): Promise<PostDto[]> {
        const userData = await request<User>(`/users/${userId}`);
        const postsResponse = await request<Post[]>(`/users/${userId}/posts`);
        const postsOver200: PostDto[] = postsResponse?.filter(post => post.body.length > 120)
            .map(post => {
                return {
                    userId: post.userId,
                    name: userData?.name,
                    email: userData?.email,
                    title: post.title,
                    body: post.body
                }
            });
        return postsOver200;
    }
}