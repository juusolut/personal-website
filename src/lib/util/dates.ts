export default function formatDate(input: string, onlyYear = false) {
  if (!input) return "";

  const [year, month, day] = input.split("-");

  if (year && onlyYear) return `${year}`;

  if (year && month && day) {
    return `${day}.${month}.${year}`; // Output: 15.08.2023
  }

  return input;
}
