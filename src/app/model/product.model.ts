
export class Product {
    constructor(
        public name: string = "",
        public categoryid: string | {_id: "", categoryName: ""}  = "",
        public description: string = "",
        public image: string | undefined = undefined,
        public video: string = "",
        public hsnCode: string = "",
        public gst: string = "",
        public packetSize: string = "",
        public priceOne: string = "",
        public priceTwo: string = "",
        public priceThree: string = "",
        public commission: number = 0,
        public marketedBY: string = "",
        public packedBY: string = "",
        public manufacturedBY: string = "",
        public isShowOnHomePage: string | Boolean = false,
        public isBestSeller: string | Boolean = false,
        public isActive?: string | Boolean,
        public _id?: string,
        public createdDate?: Date,
    ){}
}
