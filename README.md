# AI SaaS Platform

A modern, full-featured AI-powered SaaS application built with Next.js, TypeScript, and cutting-edge web technologies. This platform enables users to create and manage AI agents, schedule video meetings with real-time communication, and access premium features through a subscription model.

## Features

### 🤖 AI Agents
- Create and manage AI agents with customizable configurations
- Real-time agent interaction and monitoring
- Agent lifecycle management (create, read, update, delete)
- Persistent agent storage with comprehensive metadata

### 📞 Video Meetings & Calls
- Real-time video calling powered by Stream.io
- Meeting scheduling and management
- Live transcription with Stream's transcription service
- Meeting status tracking (upcoming, active, completed, cancelled, processing)
- Call recording and replay capabilities

### 💬 Chat Integration
- Real-time messaging with Stream Chat
- Multi-user chat rooms
- Message persistence and history
- Rich message formatting with markdown support

### 🔐 Authentication & Authorization
- Secure authentication with Better Auth
- Multi-provider support (OAuth integration)
- Session management
- Protected routes and role-based access

### 💳 Premium Features & Billing
- Tiered subscription plans
- Payment processing with Polar
- Usage tracking and limits
- Upgrade management interface

### 📊 Dashboard
- Comprehensive user dashboard
- Analytics and metrics
- Agent overview and management
- Meeting history and upcoming events
- Subscription status

## Tech Stack

### Frontend
- **Framework:** [Next.js 15](https://nextjs.org/) - React framework with App Router
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** Custom Radix UI component library
- **State Management:** [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Form Handling:** [React Hook Form](https://react-hook-form.com/) with Zod validation
- **Real-time Communication:** [Stream Chat React SDK](https://getstream.io/), [Stream Video React SDK](https://getstream.io/)

### Backend
- **API:** [tRPC](https://trpc.io/) - Type-safe RPC framework
- **Database:** [PostgreSQL](https://www.postgresql.org/) (via Neon)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication:** [Better Auth](https://better-auth.com/)
- **Payment Processing:** [Polar](https://polar.sh/) SDK
- **Background Jobs:** [Inngest](https://www.inngest.com/)
- **Real-time Video:** Stream.io Video SDK
- **Real-time Chat:** Stream Chat SDK
- **OpenAI Integration:** [OpenAI SDK](https://github.com/openai/node-sdk)

### Development Tools
- **Linting:** ESLint
- **Build Tool:** Next.js built-in build system
- **Package Manager:** pnpm

## Project Structure

```
src/
├── app/                     # Next.js app directory
│   ├── (auth)/             # Authentication pages (sign-in, sign-up)
│   ├── (dashboard)/        # Protected dashboard routes
│   │   ├── agents/        # AI agents management
│   │   ├── meetings/      # Video meetings management
│   │   └── upgrade/       # Premium upgrade page
│   ├── api/               # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   ├── trpc/         # tRPC endpoints
│   │   └── webhook/      # Webhook handlers
│   └── call/             # Video call pages
├── components/            # Reusable React components
│   ├── ui/               # Radix UI based components
│   └── [custom components]
├── db/                    # Database setup
│   ├── index.ts          # DB connection
│   └── schema.ts         # Drizzle ORM schema
├── lib/                   # Utility libraries
│   ├── auth.ts           # Authentication logic
│   ├── auth-client.ts    # Client-side auth
│   ├── stream-video.ts   # Stream video utilities
│   ├── stream-chat.ts    # Stream chat utilities
│   └── utils.ts          # Helper functions
├── modules/              # Feature modules
│   ├── agents/          # Agent feature
│   ├── meetings/        # Meeting feature
│   ├── premium/         # Premium subscription feature
│   ├── auth/            # Auth UI
│   └── call/            # Call UI components
├── trpc/                 # tRPC setup and routers
│   ├── init.ts          # tRPC initialization
│   └── router/          # API route definitions
└── hooks/               # Custom React hooks

public/                  # Static assets
```

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm (package manager)
- PostgreSQL database (Neon)
- Stream.io API keys
- OpenAI API key
- Polar API key (for payments)

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL=postgresql://...

# Authentication
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_secret_key

# Stream.io
NEXT_PUBLIC_STREAM_API_KEY=your_stream_key
STREAM_SECRET=your_stream_secret

# OpenAI
OPENAI_API_KEY=your_openai_key

# Polar (Payments)
POLAR_API_KEY=your_polar_key

# Inngest
INNGEST_EVENT_KEY=your_inngest_key
```

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-saas
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up the database:
```bash
pnpm run db:push
```

4. Start the development server:
```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

```bash
# Development
pnpm run dev          # Start development server

# Database
pnpm run db:push      # Push schema to database
pnpm run db:studio    # Open Drizzle Studio

# Production
pnpm run build        # Build for production
pnpm run start        # Start production server

# Code Quality
pnpm run lint         # Run ESLint

# Mobile Development
pnpm run dev:mobile   # Dev server on port 3000

# Webhook Testing
pnpm run dev:webhook  # Start webhook server with ngrok
```

## Key Features Implementation

### AI Agents
- Agents can be created with custom configurations
- Stored in PostgreSQL via Drizzle ORM
- Managed through tRPC endpoints
- Real-time updates in dashboard

### Video Meetings
- Built on Stream.io Video SDK
- Real-time transcription support
- Meeting status management
- Automatic processing and archival

### Authentication
- Social login support via Better Auth
- Session-based authentication
- Protected API routes
- Role-based access control

### Premium Subscriptions
- Multiple tier support
- Payment processing via Polar
- Usage-based limits
- Automatic billing

## Deployment

The application is ready for deployment on [Vercel](https://vercel.com/) or any Node.js hosting platform.

### Vercel Deployment
```bash
# Push to GitHub, connect repository to Vercel
# Environment variables are automatically synced from your .env.local
```

### Docker Support
The project is ready to be containerized for deployment on cloud platforms like AWS, Google Cloud, or Azure.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## License

This project is private and proprietary.

## Support

For support, please contact the development team or create an issue in the repository.

---

Built with ❤️ using Next.js, TypeScript, and Stream.io
