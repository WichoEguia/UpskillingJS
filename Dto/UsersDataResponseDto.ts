interface UserResponseDto {
  id: number;
  prefix: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  geolocation: string;
  companyName: string;
}

export type UsersDataResponseDto = UserResponseDto[];
