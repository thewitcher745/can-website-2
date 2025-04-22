# CAN Trading Solutions Website

A professional website for CAN Trading Solutions featuring a dark, elegant design.

## Features

- Modern, dark-themed design
- Responsive layout
- Section-based navigation
- Blog system
- Contact form

## Deploying to Netlify

### Option 1: Manual Deployment

1. Build the project locally:
   ```
   npm run build
   ```

2. Go to [Netlify](https://app.netlify.com/) and drag and drop the `.next` folder.

### Option 2: Continuous Deployment

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket).

2. Log in to [Netlify](https://app.netlify.com/).

3. Click "New site from Git" and select your repository.

4. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`

5. Click "Deploy site" and wait for the build to complete.

### Option 3: Netlify CLI

1. Install Netlify CLI globally:
   ```
   npm install -g netlify-cli
   ```

2. Authenticate the CLI:
   ```
   netlify login
   ```

3. Initialize a new Netlify site:
   ```
   netlify init
   ```

4. Follow the prompts to set up your site.

5. Deploy your site:
   ```
   netlify deploy --prod
   ```

## Environment Variables

Make sure to set these environment variables in Netlify's environment settings:

- `HOST` - Your website's hostname
- `EMAIL_SERVER` - SMTP server for the contact form
- `EMAIL_USERNAME` - SMTP username
- `EMAIL_PASSWORD` - SMTP password

## Development

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- Next.js
- TypeScript
- Emotion (CSS-in-JS)
- React
