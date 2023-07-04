export class BaseResponse<Type> {
    private response: Type;

    constructor(response: Type) {
        this.response = response;
        return this;
    }
}