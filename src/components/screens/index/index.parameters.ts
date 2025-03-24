import { Size } from 'hooks/useWindowSize';
import { HomePageProps } from './index.models';

export const getHome = ({ screenSize }: { screenSize: Size }): HomePageProps => ({
	welcome: {
		title: 'CAN Trading Solutions',
		subtitle: 'Expert Financial Trading Services',
		description: 'Providing professional trading solutions and strategic financial services for businesses and individuals'
	}
})
