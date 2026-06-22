# Multi-Tenant Subdomain Platform

A production-ready multi-tenant SaaS platform built with Next.js 15 that allows users to create custom subdomains with emoji identities. Perfect for demos, portfolios, side projects, and multi-tenant SaaS experiments.

## What This App Does

This platform enables anyone to quickly claim a unique subdomain and personalize it with an emoji. Users can:
This platform enables anyone to quickly claim a unique subdomain and personalize it with an emoji. Users can:

- **Create custom subdomains** - Choose a memorable name (e.g., `yourname.platform.com`)
- **Add emoji identity** - Pick an emoji that represents their brand or personality
- **Get instant setup** - No complex configuration, the page goes live immediately
- **Manage via admin dashboard** - View and delete subdomains from a central interface

## How It's Useful for Users

### For Developers & Startups
- **Quick prototyping** - Spin up tenant-ready subdomains in seconds for testing multi-tenant architectures
- **SaaS experiments** - Test multi-tenant SaaS ideas without building from scratch
- **Portfolio sites** - Create personalized landing pages for projects or clients
- **Campaign landing pages** - Deploy marketing pages on custom subdomains instantly

### For Businesses
- **Brand presence** - Establish unique subdomains for different products or campaigns
- **Customer portals** - Give each customer their own branded space
- **Multi-tenant ready** - Built on Next.js with isolated subdomains, ready to scale
- **Cost-effective** - Uses serverless architecture with Redis for efficient data storage

### For Individuals
- **Personal branding** - Claim a unique subdomain that represents you
- **Side projects** - Quickly launch and showcase personal projects
- **Easy sharing** - Share your custom subdomain with others
- **No technical skills needed** - Simple form-based creation process

## Key Features

- ✅ **Custom Subdomain Routing** - Next.js middleware handles subdomain detection and routing
- ✅ **Emoji Identity System** - Each subdomain gets a custom emoji for visual branding
- ✅ **Instant Setup** - Create and launch subdomains in under a minute
- ✅ **Admin Dashboard** - Manage all subdomains from a central interface
- ✅ **Multi-Tenant Architecture** - Isolated subdomains with shared components
- ✅ **Redis Storage** - Fast, scalable data storage with Upstash Redis
- ✅ **Responsive Design** - Beautiful UI that works on all devices
- ✅ **Local Development Support** - Test subdomains on localhost
- ✅ **Production Ready** - Optimized for Vercel deployment with wildcard domains

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Database**: [Upstash Redis](https://upstash.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Package Manager**: pnpm

## Project Structure

```
platforms/
├── app/
│   ├── admin/              # Admin dashboard for managing subdomains
│   ├── s/[subdomain]/      # Dynamic subdomain pages
│   ├── actions.ts          # Server actions for creating/deleting subdomains
│   ├── page.tsx            # Landing page with features and testimonials
│   └── layout.tsx          # Root layout
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── testimonials.tsx     # Testimonial sections
│   ├── site-header.tsx     # Navigation header
│   └── site-footer.tsx     # Footer component
├── lib/
│   ├── redis.ts            # Redis client configuration
│   ├── subdomains.ts       # Subdomain validation and data functions
│   └── utils.ts            # Utility functions
└── middleware.ts           # Subdomain routing middleware
```

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- pnpm (recommended) or npm/yarn
- Upstash Redis account (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd platforms
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```
   KV_REST_API_URL=your_redis_url
   KV_REST_API_TOKEN=your_redis_token
   ```
   
   Get these credentials from [Upstash Redis](https://upstash.com/)

4. **Start the development server**
   ```bash
   pnpm dev
   ```

5. **Access the application**
   - Main site: http://localhost:3000
   - Admin panel: http://localhost:3000/admin
   - Example tenant: http://test.localhost:3000

## How It Works

### Subdomain Creation Flow

1. User enters a subdomain name and emoji on the landing page
2. Server validates the input (alphanumeric + hyphens for subdomain, emoji for icon)
3. Checks if subdomain is already taken
4. Stores data in Redis with key pattern `subdomain:{name}`
5. Redirects user to their new subdomain

### Subdomain Routing

The middleware (`middleware.ts`) handles routing:
- Detects subdomain from the host header
- Rewrites requests to `/s/[subdomain]` for tenant pages
- Blocks admin access from subdomains
- Supports local development, production, and Vercel preview deployments

### Data Storage

Subdomain data is stored in Redis:
```javascript
{
  subdomain: "example",
  emoji: "🚀",
  createdAt: 1234567890
}
```

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Custom Domain Setup

To use your own domain:

1. Add your root domain to Vercel project settings
2. Configure wildcard DNS: `*.yourdomain.com` → Vercel
3. Update `ROOT_DOMAIN` in your environment variables
4. Redeploy

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `KV_REST_API_URL` | Upstash Redis URL | Yes |
| `KV_REST_API_TOKEN` | Upstash Redis token | Yes |
| `ROOT_DOMAIN` | Your root domain (optional, defaults to platform) | No |
| `PROTOCOL` | http or https (auto-detected) | No |

## Usage Examples

### Creating a Subdomain

1. Visit the homepage
2. Enter a name (e.g., "myproject")
3. Choose an emoji (e.g., "🎯")
4. Click "Create your subdomain"
5. You'll be redirected to `myproject.platform.com`

### Managing Subdomains

1. Visit `/admin`
2. View all created subdomains
3. Click the trash icon to delete a subdomain
4. Click "Visit subdomain" to view a tenant's page

## Development Tips

- **Local subdomains**: Use `http://[name].localhost:3000` for testing
- **Redis debugging**: Check Upstash dashboard for stored data
- **Middleware logs**: Add console.log in `middleware.ts` for routing debug
- **Component reuse**: Components in `components/ui/` can be used across tenant pages

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.
