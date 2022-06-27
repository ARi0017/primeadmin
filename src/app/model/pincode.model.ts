
export class Pincode {
    constructor(
        public pincode: string = "",
        public area: string = "",
        public district: string = "",
        public route: string = "",
        public latitude: string = "",
        public longitude: string = "",
        public isActive?: string,
        public _id?: string,
        public createdDate?: Date
    ){}
}
