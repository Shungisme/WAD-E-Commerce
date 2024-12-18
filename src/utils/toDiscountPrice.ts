export const toDiscountPrice = (item:any) => {
    return Math.floor(
        item?.discount <= 0 ? item?.price : item?.price * (1 - item?.discount / 100)
      );
}