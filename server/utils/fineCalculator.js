export const calculateFine = (dueDate, returnDate) => {
  if (!dueDate || !returnDate) return 0;

  const due = new Date(dueDate);
  const returned = new Date(returnDate);

  if (returned <= due) return 0;

  const msInDay = 1000 * 60 * 60 * 24;
  const overdueDays = Math.ceil((returned - due) / msInDay);

  return overdueDays * 5;
};

export default calculateFine;
