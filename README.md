<img width="511" alt="image" src="https://github.com/user-attachments/assets/bc558492-d2cc-4962-b71a-40b6d0d1b07b" />

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
├── app/             # Next.js app directory
├── authkit/         # All authkit related features/components
├── components/      # General app components/radix-ui
├── config/          # Payload CMS configuration (collections, fields, etc)
└── lib/             # Utility functions and shared code
```

## Authentication Features (Roadmap)

- [x] User registration and login
- [x] One-time passwords:
  - [x] Password reset functionality
  - [x] Email verification
- [ ] Social authentication
  - [x] Google
  - [x] Github
  - [ ] Facebook
- [x] Role-based access control (admin and user)
- [ ] User profile avatars
  - [x] Default avatars on account create
  - [ ] Change avatar in user settings profile page.
- [ ] Two-factor authentication (Google Authenticator? Authy?)
- [ ] Organizations (Tenants)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please open an issue in the GitHub repository.
