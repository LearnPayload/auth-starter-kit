# Payload Authkit

A modern authentication starter kit built with Payload CMS, Next.js, and TypeScript. This template provides a solid foundation for building a secure, scalable authentication system for your app.

## Features

- 🔐 Secure authentication system built with Payload CMS
- ⚡ Next.js 15 with App Router
- 🎨 Modern UI with Tailwind CSS and Radix UI components
- 📱 Responsive design
- 📧 Email integration with Nodemailer and Resend
- 📧 Nicely designed email templates out of the box.
- 🗄️ PostgreSQL database support
- 🛡️ TypeScript for type safety

## Prerequisites

- Node.js ^18.20.2 or >=20.9.0
- pnpm ^10
- PostgreSQL database
- Docker (optional)

## Getting Started

1. Clone the repository:

   ```bash
   pnpm dlx degit https://github.com/LearnPayload/auth-starter-kit.git my-payload-app
   cd my-payload-app
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up your environment variables:

   ```bash
   cp .env.example .env
   ```

   Edit the `.env` file with your configuration.

4. Start the development server:
   ```bash
   pnpm dev
   ```

The application will be available at `http://localhost:2222`.

## Development

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm pretty` - Format code with Prettier

## Docker Support

For local development, the project comes with Docker Compose services for MailHog (fake inbox) and Postgres.

```bash
# Build the Docker image
docker-compose build

# Start the services
docker-compose up
```

## Project Structure

```
src/
├── app/              # Next.js app directory
├── components/       # React components
├── config/          # Payload CMS configuration
├── lib/             # Utility functions and shared code
└── types/           # TypeScript type definitions
```

## Authentication Features

- User registration and login
- One-time passwords:
  - Password reset functionality
  - Email verification
- Social authentication (Google, Github)
- Role-based access control (admin and user)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please open an issue in the GitHub repository.
