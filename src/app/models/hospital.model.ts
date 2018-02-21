import { User } from './user.model';

export class Hospital {
    constructor ( 
        public name : string ,
        public _id ?: string,
        public img ?: string ,
        public user ?: User
     ) {}
}