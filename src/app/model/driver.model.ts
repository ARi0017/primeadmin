
export class Driver {
    constructor(
        public name: string = "",
        public phone: string = "",
        public email: string = "",
        public address: string = "",
        public zoneId: string = "",
        public landmark: string = "",
        public panNo: string = "",
        public adhaarNo: string = "",
        public licenseNo: string = "",
        public isOnline: string = "",
        public isOnlineBoolean: Boolean = false,
        public image?: string,
        public isActive?: string,
        public _id?: string, 
        public createdDate?: Date,
    ){}
}
