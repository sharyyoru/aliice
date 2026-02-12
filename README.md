# Aliice Landing Page

A modern, responsive landing page for Aliice - Medical ERP + CRM platform.

## Features

- **Hero Section** - Main value proposition with CTA
- **Features** - ERP & CRM capabilities
- **Workflows** - Marketing automation with triggers and actions
- **App Showcase** - Interactive product screenshots
- **Crisalix Integration** - 3D visualization for aesthetic procedures
- **System Setup** - Local/Cloud deployment options with HIPAA compliance
- **Registration Form** - Demo request form with database storage

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- TailwindCSS
- Vercel Postgres
- Resend (Email)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/sharyyoru/aliice.git
cd aliice
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Add your environment variables:
- `POSTGRES_URL` - Vercel Postgres connection string
- `RESEND_API_KEY` - Resend API key for email notifications

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Deployment

This project is configured for deployment on Vercel:

1. Push to GitHub
2. Connect to Vercel
3. Add Vercel Postgres from the Vercel dashboard
4. Add `RESEND_API_KEY` environment variable
5. Deploy

## Environment Variables

| Variable | Description |
|----------|-------------|
| `POSTGRES_URL` | Vercel Postgres connection URL (auto-set by Vercel) |
| `RESEND_API_KEY` | API key from [Resend](https://resend.com) for email notifications |

## License

Proprietary - Aliice
