import { UserResponse } from './user.interface';

export class UserModel {

    public id: number;
    public emailAddress: string;
    public name: string;

    constructor(raw: UserResponse) {

        if (!raw) {
            return;
        }

        this.id = raw.id;
        this.name = raw.name;
        this.emailAddress = raw.email_address;

    }

}
