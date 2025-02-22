# Tell Me a Story

## Project Overview

"Tell Me a Story" is a Next.js application designed to generate and explore AI-generated stories for children. Users can create personalized stories by selecting various options such as story type, age group, and image style. The app leverages AI to craft unique narratives and illustrations, providing an engaging storytelling experience.

## Prerequisites

Before running the application, ensure you have the following environment variables set up in a `.env.local` file:

- `NEXT_PUBLIC_DATABASE_URL`: Your database connection URL.
- `NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY`: Your ImageKit public key.
- `NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY`: Your ImageKit private key.
- `NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT`: Your ImageKit URL endpoint.
- `REPLICATE_API_TOKEN`: Your Replicate API token.
- `NEXT_PUBLIC_PAYPAL_CLIENT_ID`: Your PayPal client ID.

## Getting Started

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/tell-me-a-story.git
   cd tell-me-a-story
   ```

2. Install the dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up your environment variables in a `.env.local` file as described in the Prerequisites section.

### Running the Development Server

To start the development server, run:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### How to Use the App

1. **Create a Story**: Navigate to the "Create Story" page where you can select the subject, type, age group, and image style for your story. Once you've made your selections, click "Generate story" to create your personalized story.

   ```typescript:src/app/(main)/create-story/page.tsx
   startLine: 22
   endLine: 117
   ```

2. **Explore Stories**: Visit the "Explore" page to browse through a collection of stories. You can view details and read any story by clicking on it.

   ```typescript:src/app/(main)/explore/page.tsx
   startLine: 4
   endLine: 13
   ```

3. **View a Story**: When viewing a story, you can flip through the pages using the interactive flipbook component.

   ```typescript:src/app/(main)/view-story/[id]/page.tsx
   startLine: 7
   endLine: 25
   ```

4. **Manage User Stories**: Access your dashboard to view stories you've created and manage your credits.

   ```typescript:src/components/dashboard/user-stories-list.tsx
   startLine: 9
   endLine: 40
   ```

## Scripts

The following scripts are available in the `package.json`:

- `dev`: Starts the development server.
- `build`: Builds the application for production.
- `start`: Starts the application in production mode.
- `lint`: Runs ESLint to check for code quality issues.
- `db:push`: Pushes the database schema using Drizzle ORM.
- `db:studio`: Opens the Drizzle ORM studio for database management.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
