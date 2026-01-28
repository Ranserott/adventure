# Adventure Cactus Coffee - E-commerce Platform

Premium e-commerce platform for specialty coffee from Puerto Natales, Chile.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Icons**: Lucide-React

## Brand Colors

- **Primary**: `#022601` - Deep Forest
- **Secondary**: `#7DBF73` - Cactus Leaf
- **Accent**: `#A67246` - Earth/Coffee
- **Neutral**: `#D9D9D9` - Mist

## Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or cloud)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your database URL:
   ```
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
   ```

3. **Set up the database**
   ```bash
   npx prisma migrate dev --name init
   npx prisma db seed
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

## Project Structure

```
advencac/
├── app/
│   ├── about/page.tsx          # About/brand story page
│   ├── cart/page.tsx           # Cart page
│   ├── checkout/page.tsx       # Checkout flow
│   ├── shop/[slug]/page.tsx    # Product detail pages
│   ├── shop/page.tsx           # Product listing
│   ├── api/                    # API routes
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page
├── components/
│   ├── cart/                   # Cart components
│   ├── layout/                 # Navbar & Footer
│   ├── product/                # Product-related components
│   └── ui/                     # Reusable UI components
├── lib/                        # Utilities
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── seed.ts                 # Seed data
└── public/images/              # Static assets
```

## Features

- **Product Catalog**: Browse coffee, equipment, and merchandise
- **Category Filtering**: Filter products by category
- **Shopping Cart**: Persistent cart with localStorage
- **Checkout**: Order placement system
- **Brand Story**: About page with company history
- **Responsive Design**: Mobile-first design

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Database Management

- `npx prisma studio` - Open Prisma Studio (database GUI)
- `npx prisma migrate dev` - Create and apply migrations
- `npx prisma db seed` - Seed database with initial data
- `npx prisma generate` - Generate Prisma Client
