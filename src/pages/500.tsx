import { NextPage } from 'next'
import styled from '@emotion/styled'
import { Layout, LayoutContainer, Heading2, Paragraph } from 'components/shared'
import { Button } from 'components/shared/buttons'
import { page500 } from 'components/screens/500'

const Custom500: NextPage = () => {
	return (
		<Layout metaTags={page500.seoTags}>
			<LayoutContainer>
				<Section>
					<HeadingWrapper>
						<Heading2 text={page500.title} isDangerouslySet />
					</HeadingWrapper>
					<Paragraph text={page500.text} size="m" />
					<Button 
						variant="primary"
						size="medium"
						href={page500.button.link}
					>
						{page500.button.text}
					</Button>
				</Section>
			</LayoutContainer>
		</Layout>
	)
}

const Section = styled.section`
	text-align: center;
	margin: 58px auto 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	& > * {
		margin-bottom: 32px;
		max-width: 448px;
	}
	a {
		margin-bottom: 0;
	}
`
const HeadingWrapper = styled.div`
	max-width: 545px;
`

export default Custom500
