export const ECOMMERCE_PRIVADO =
  process.env.NEXT_PUBLIC_ECOMMERCE_PRIVADO === "true" ||
  Boolean(process.env.NEXT_PUBLIC_ECOMMERCE_PRIVADO) === true;
