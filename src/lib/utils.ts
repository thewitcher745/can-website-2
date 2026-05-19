const subDigits = "₀₁₂₃₄₅₆₇₈₉";

const toSubscript = (n: number) =>
  String(n)
    .split("")
    .map((d) => subDigits[Number(d)])
    .join("");

/**
 * Formats a price value into a human‑readable USD string.
 *
 * Features:
 * - Optionally inserts thousands separators in the integer part.
 * - Optionally compresses very small values with many leading decimal zeros
 *   using a subscript notation (e.g., 0.00000078 → 0.0₆ 78).
 * - Handles scientific notation (e.g., 1e-7) by expanding it to a decimal form.
 *
 * @param num - The price value to format. Can be a number or numeric string.
 * @param subscriptTiny - If true (default), numbers with more than 5 leading
 * zeros after the decimal point will be shortened using subscript notation.
 * @param delimitThousands - If true (default), inserts commas every 3 digits
 * in the integer part for readability.
 *
 * @returns A formatted price string.
 *
 * @example
 * formatPrice(1234567.89)
 * // "1,234,567.89"
 *
 * @example
 * formatPrice(0.00000078)
 * // "0.0₆ 78"
 *
 * @example
 * formatPrice(0.00000078, false)
 * // "0.00000078"
 *
 * @example
 * formatPrice(1234567.89, true, false)
 * // "1234567.89"
 */

export const formatPrice = (
  num: number | string,
  subscriptTiny: boolean = true,
  delimitThousands: boolean = true,
) => {
  const n = Number(num);
  if (!isFinite(n)) return "0";

  let str = String(n);

  if (str.includes("e")) {
    str = n.toFixed(20).replace(/0+$/, ""); // Avoids scintific notation
  }

  let [integerPart, decimalPart] = str.split(".");

  if (delimitThousands) {
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  if (subscriptTiny && decimalPart) {
    const match = decimalPart.match(/^(0+)(\d+)/);
    if (match) {
      const zeros = match[1].length;
      const digits = match[2];

      if (zeros > 5) {
        return `0.0${toSubscript(zeros)}${digits.slice(0, 2)}`;
      }
    }
  }

  return `${integerPart}${decimalPart ? "." + decimalPart : ""}`;
};
