import { FormControl } from "@angular/forms";

export interface Product {
    name: string;
    price: FormControl;
    description: string;
    quantity: undefined | number,
    status: undefined | string
}

