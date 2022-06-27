export interface IDriver {
    name: string;
    email: string,
    phone: string,
    image: string,
    isActive: string,
    createdDate?: Date,
    _id?: string, 
}


export class Driver {
    constructor(
        public name: string = "",
        public email: string = "",
        public phone: string = "",
        public isActive: string = "1",
        public createdDate?: Date,
        public _id?: string, 
    ){}
}
