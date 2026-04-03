# PT. MANDIRIJAYA MULTI PERKASA — Company Profile

Official company profile website for PT. MANDIRIJAYA MULTI PERKASA, a contractor specializing in aluminium, glass, and general construction services.

## Tech Stack

- **React 19** — UI framework
- **Vite 7** — Build tool
- **Tailwind CSS 4** — Styling
- **React Router DOM 7** — Client-side routing
- **Supabase** — Database, Authentication, Storage
- **Lucide React** — Icons

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Environment Setup

Create a `.env.local` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── Animation.jsx
│   ├── Footer.jsx
│   ├── Icons.jsx
│   ├── Navbar.jsx
│   └── ProtectedRoute.jsx
├── context/            # React context providers
│   ├── AuthContext.jsx
│   └── CompanyContext.jsx
├── layouts/            # Page layouts
│   └── AdminLayout.jsx
├── lib/                # External library configurations
│   └── supabase.js
├── pages/
│   ├── about/          # About Us pages
│   ├── admin/          # Admin dashboard pages
│   ├── services/       # Service pages
│   ├── Contact.jsx
│   ├── Gallery.jsx
│   ├── Home.jsx
│   └── ProjectDetail.jsx
└── App.jsx
```

## Features

- **Public Pages**: Home, About, Services, Gallery, Project Details, Contact
- **Admin Dashboard**: Manage projects, update company info, view dashboard
- **Authentication**: Supabase Auth with protected admin routes
- **Image Storage**: Supabase Storage for project images
- **Responsive Design**: Mobile-first with Tailwind CSS

## Admin Panel

The website includes a password-protected admin dashboard for managing content.

- **Access URL**: `https://TegarHarisDD.github.io/CompanyProfileMandirijayaMultiPerkasa/#/admin/login`
- **Login**: Use your Supabase-registered email and password

### Admin Capabilities
- **Project Manager** — Add, edit, and delete portfolio projects with image uploads
- **Contact Manager** — Update company name, phone, email, address, and Google Maps embed
- **Dashboard** — Overview of your company data

## Security

- Environment variables excluded from version control
- Row Level Security (RLS) enforced on Supabase tables
- Brute force protection on login (5 attempts → 60s lockout)
- File upload validation (type, size, extension)
- iframe sandbox and URL validation for embedded maps
- Generic error messages to prevent information leakage

## Deployment

Build the project and deploy the `dist/` folder to any static hosting provider (Netlify, Vercel, GitHub Pages, etc.).

```bash
npm run build
```

## License

Private — All rights reserved.
