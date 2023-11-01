export enum ColorMode {
	GLOBAL,
	ROW,
	CHAR
}

export function update_color_mode(mode: ColorMode) {
	switch (mode) {
		case ColorMode.GLOBAL:
			return ColorMode.ROW;
		case ColorMode.ROW:
			return ColorMode.CHAR;
		case ColorMode.CHAR:
			return ColorMode.GLOBAL;
		default:
			return ColorMode.GLOBAL;
	}
}
