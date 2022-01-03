/**
 * Merge arr1 and arr2.
 *
 * ex.
 * arr1 = ["apple", "banana", "melon"]
 * arr2 = ["apple", "melon"]
 *
 * return ["apple", "melon"]
 * @param {any[]} arr1
 * @param {any[]} arr2
 * @returns {any[]} merged array
 */
export const merge = (arr1, arr2) => {
  return Array.from(
    new Set(
      [...arr1, ...arr2].filter(
        (item) => arr1.includes(item) && arr2.includes(item)
      )
    )
  );
};
