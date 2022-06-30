export class Category {
    constructor(
        public coverImage: string = "",
        public coverVideo: string = "",
        public description: string = "",
        public displayOrder: number = 0,
        public isFeatured: string = "0",
        public isTopMenu: string = "0",
        public isActive?: string,
        public _id?: string,
        public createdDate?: Date
    ){}
}
