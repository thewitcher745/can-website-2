import { MetaTagsModel } from 'models';

export const defaultMetaTags: MetaTagsModel = {
	title: 'CAN Trading Solutions',
	description: 'Professional trading solutions and financial services by CAN Trading Solutions',
	keywords: 'trading, financial solutions, CAN Trading, investment',
	image: `${process.env.HOST}/images/meta/general.png`,
	url: `${process.env.HOST}`
};
