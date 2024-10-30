export interface IProduct {
    _id?       : string
    title      : string;
    description: string;
    category   : string;
    price      : number;
    sizes      : string[];
    inStock    : number;
    images     : string[];
    slug       : string;
}
