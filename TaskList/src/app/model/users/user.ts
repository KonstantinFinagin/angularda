import { Role } from './role';
import { Position } from './position';
import { Location } from './location';

export class User {
    _id: string;
    email: string;
    first: string;
    last: string;
    birthday: string;
    address: string;
    skype: string;
    phone: string;
    image_url: string;
    password: string;
    position: Position;
    location: Location;
    roles: Role[];
}
