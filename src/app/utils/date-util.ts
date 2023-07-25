export const isDateValid = (date: string) => {
  const value = new Date(date);

  // Verifica se o valor é uma data válida
  return !isNaN(value.getDay());
};
