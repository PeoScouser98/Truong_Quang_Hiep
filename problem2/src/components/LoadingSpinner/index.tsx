import classNames from 'classnames';
import React, { useMemo } from 'react';

// export const Spinner = tw.div`pointer-events-none animate-roller rounded-full border-[3px] border-gray-200 `;
export type TLoadingSpinnerProps = {
	size?: 'sm' | 'md' | 'lg';
	variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'info' | 'success' | 'error';
};

const LoadingSpinner: React.FC<TLoadingSpinnerProps> = ({ size, variant }) => {
	const loadingStyles = useMemo(
		() =>
			classNames('loading', {
				// size
				'loading-sm': size === 'sm',
				'loading-md': size === 'md',
				'loading-lg': size === 'lg',
				// variant
				'loading-primary': variant === 'primary',
				'loading-secondary': variant === 'secondary',
			}),
		[variant, size],
	);

	return <div className={loadingStyles} />;
};

export default LoadingSpinner;
