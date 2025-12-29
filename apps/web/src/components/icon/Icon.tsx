import { icons, type IconName } from './icons';

interface IconProps {
	name: IconName;
	size?: number;
	color?: string;
	className?: string;
}

export const Icon = ({
	name,
	size = 24,
	color = 'currentColor',
	className,
}: IconProps) => {
	const icon = icons[name];

	if (!icon) {
		return null;
	}

	return (
		<svg
			width={size}
			height={size}
			viewBox={icon.viewBox ?? '0 0 24 24'}
			fill="currentColor"
			className={className}
			style={{ color }}
			aria-hidden="true"
		>
			{icon.content}
		</svg>
	);
};
