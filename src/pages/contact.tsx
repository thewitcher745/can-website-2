import React from 'react';
import { NextPage } from 'next';
import { Layout, LayoutContainer } from 'components/shared';
import { defaultMetaTags } from 'parameters';

/**
 * Contact Us page
 */
const ContactPage: NextPage = () => {
    return (
        <Layout metaTags={{
            ...defaultMetaTags,
            title: 'Contact Us | CAN Trading Solutions',
            description: 'Get in touch with our team for trading and financial solutions',
        }}>
            <LayoutContainer>
                <div style={{ padding: '60px 0' }}>
                    <h1>Contact Us</h1>
                    <p>This is a placeholder for the Contact form and information.</p>
                </div>
            </LayoutContainer>
        </Layout>
    );
};

export default ContactPage; 