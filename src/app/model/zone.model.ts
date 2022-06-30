export class Zone {
    constructor(
        public zoneName: string = "",
        public area: string = "",
        public district: string = "",
        public isActive?: string,
        public _id?: string, 
        public createdDate?: Date,
    ){}
}
