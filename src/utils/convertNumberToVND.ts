


export const toVND = (value: number | string): string => {
    value = value.toString().replace(/\./g, "");
    const formatted = new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "VND",
      })
      .format(Number(value))
      .replace("₫", "")
      .trim();
  
    return formatted;
}