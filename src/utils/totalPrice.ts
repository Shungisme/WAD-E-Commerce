import { toDiscountPrice } from "./toDiscountPrice";


export const totalPrice = (products:any) => {
    if(products?.length <= 0) return 0;

    const price = products?.reduce((acc:any, currentVal:any) => {
        const price = toDiscountPrice(currentVal)
        return acc += (price * currentVal?.quantity);
    },0)
    return price
}