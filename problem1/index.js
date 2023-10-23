/**
 *
 * @param {number} n
 * @returns {Array<number>}
 */
const generateArr = (n) => Array.from({ length: n }, (_, i) => i + 1);

/**
 *
 * @param {unknown} n
 * @returns {boolean}
 */
const isInvalidEntry = (n) => isNaN(+n) || n <= 0;

/**
 * @param {number} n
 */
const sum_to_n_a = (n) => {
	if (isInvalidEntry(n)) return;
	const arr = generateArr(n);
	return arr.reduce((acc, curr) => acc + curr, 0);
};
console.log(sum_to_n_a(5));

/**
 * @param {number} n
 */
const sum_to_n_b = (n) => {
	if (isInvalidEntry(n)) return;
	const arr = generateArr(n);
	let sum = 0;
	arr.forEach((el) => (sum += el));
	return sum;
};
console.log(sum_to_n_b(5));

/**
 * @param {number} n
 */
const sum_to_n_c = (n) => {
	if (isInvalidEntry(n)) return;
	return (n * (n + 1)) / 2;
};
console.log(sum_to_n_c(5));
