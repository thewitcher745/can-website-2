import React from 'react';
import { NextPage } from 'next';
import { Layout, LayoutContainer } from 'components/shared';
import { defaultMetaTags } from 'parameters';

/**
 * Login page
 */
const LoginPage: NextPage = () => {
    return (
        <Layout metaTags={{
            ...defaultMetaTags,
            title: 'Login | CAN Trading Solutions',
            description: 'Access your CAN Trading Solutions account',
        }}>
            <LayoutContainer>
                <div style={{ padding: '60px 0', maxWidth: '400px', margin: '0 auto' }}>
                    <h1>Login</h1>
                    <p>This is a placeholder for the login form.</p>
                </div>
            </LayoutContainer>
        </Layout>
    );
};

export default LoginPage; 