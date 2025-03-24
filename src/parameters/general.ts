export const colors = {
	// Colors for CAN Trading Solutions
	background1: '#121212',
	background2: '#1A1A1A',
	white: '#FFFFFF',
	offwhite: '#E0E0E0',
	body: '#B0B0B0',
	primaryBlue1: '#4A6F8A',
	primaryBlue2: '#334759',
	primaryBlue3: '#1F2B37',
	primaryBlue4: '#192330',
	primaryHighlight: '#FE9A00',
	primaryGreen2: '#D68000',
	primaryGreen3: '#FF8C00'
};

// Breakpoints
export const breakpoints = {
	mobileS: 320,
	mobileM: 375,
	mobileL: 425,
	tablet: 768,
	laptop: 1024,
	laptopL: 1440,
	desktop: 2560
};

// Media queries
export const devices = {
	mobileS: `(min-width: ${breakpoints.mobileS}px)`,
	mobileM: `(min-width: ${breakpoints.mobileM}px)`,
	mobileL: `(min-width: ${breakpoints.mobileL}px)`,
	tablet: `(min-width: ${breakpoints.tablet}px)`,
	laptop: `(min-width: ${breakpoints.laptop}px)`,
	laptopL: `(min-width: ${breakpoints.laptopL}px)`,
	desktop: `(min-width: ${breakpoints.desktop}px)`
};

export const routes = {
	home: '/',
	services: '/services',
	blog: '/blog',
	contact: '/contact',
	login: '/login',
	404: '404',
	500: '500'
};
