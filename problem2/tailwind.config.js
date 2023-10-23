import defaultTheme from 'tailwindcss/defaultTheme';
import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		colors: {
			primary: '#fb923c',
			'primary-active': '#f97316',
			secondary: '#38bdf8',
			'secondary-active': '#0ea5e9',
			info: '#22d3ee',
			'info-active': '#06b6d4',
			error: '#f43f5e',
			'error-active': '#e11d48',
			success: '#34d399',
			'success-active': '#10b981',
			warning: '#eab308',
			'warning-active': '#d97706',
			disabled: '#9ca3af',
			'base-content-active': '#3f3f46',
			'base-content': '#374151',
			...colors,
		},
		extend: {
			fontFamily: {
				sans: ['Inter var', ...defaultTheme.fontFamily.sans],
			},
			animation: {
				slide: 'shimmer 1s ease infinite',
				roller: 'spin 1.2s ease infinite',
			},
			keyframes: {
				shimmer: {
					'0%': {
						transform: 'translateX(0%)',
					},
					'100%': {
						transform: 'translateX(120%)',
					},
				},
				spin: {
					'0%': { transform: 'rotate(0turn)' },
					'100%': { transform: 'rotate(1turn)' },
				},
			},
		},
	},
	plugins: ['@tailwindcss/forms'],
};
