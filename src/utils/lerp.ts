/** basic lerp */
export default function lerp(x: number, y: number, a: number) {
	const r = (1 - a) * x + a * y;
	return Math.abs(x - y) < 0.001 ? y : r;
}
