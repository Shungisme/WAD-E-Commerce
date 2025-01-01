export const toVND = (value: number | string): string => {
  if (!value || isNaN(Number(value))) {
    return new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "VND",
    })
      .format(0)
      .replace("₫", "")
      .trim();
  }

  value = value.toString().replace(/\./g, "");
  const formatted = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "VND",
  })
    .format(Number(value))
    .replace("₫", "")
    .trim();

  return formatted;
};
