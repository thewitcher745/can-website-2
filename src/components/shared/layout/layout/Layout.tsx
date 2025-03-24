import { MetaTagsModel } from 'models'
import React, { useContext } from 'react';
import { LayoutWrapper } from './Layout.styled';
import { AppContext } from 'pages/_app'
import { CustomHead, Navbar } from 'components/shared';
import { Footer } from '../footer';

interface LayoutProps {
	metaTags: MetaTagsModel
	children: React.ReactNode
}

export const Layout = ({ metaTags, children }: LayoutProps) => {
	return (
		<LayoutWrapper isFirstLoad={useContext(AppContext).isFirstLoad}>
			<CustomHead metaTags={metaTags} />
			<Navbar />
			{children}
			<Footer />
		</LayoutWrapper>
	)
}
