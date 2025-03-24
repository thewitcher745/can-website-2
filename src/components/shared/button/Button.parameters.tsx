import { colors } from "parameters";
import { TemplateButtonColors } from "./Button.model";

export const ButtonVariants: TemplateButtonColors = {
	primary: {
		background: {
			normal: colors.primaryHighlight,
			hover: colors.primaryHighlight,
			disabled: colors.primaryHighlight
		},
		outline: {
			normal: 'transparent',
			hover: 'transparent',
			disabled: 'transparent'
		},
		text: {
			normal: colors.primaryBlue3,
			hover: colors.primaryBlue3,
			disabled: colors.primaryBlue3
		}
	},
	secondary: {
		background: {
			normal: colors.white,
			hover: colors.primaryHighlight,
			disabled: colors.primaryHighlight
		},
		outline: {
			normal: colors.primaryHighlight,
			hover: colors.primaryHighlight,
			disabled: 'transparent'
		},
		text: {
			normal: colors.primaryBlue1,
			hover: colors.primaryBlue1,
			disabled: colors.primaryBlue3
		}
	},
	tertiary: {
		background: {
			normal: colors.white,
			hover: colors.white,
			disabled: colors.white
		},
		outline: {
			normal: 'transparent',
			hover: 'transparent',
			disabled: 'transparent'
		},
		text: {
			normal: colors.primaryBlue1,
			hover: colors.primaryBlue1,
			disabled: colors.primaryBlue3
		}
	}
};
