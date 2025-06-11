# Time Zone Converter - Apple Liquid Glass UI

A modern, elegant time zone converter web application featuring Apple's Liquid Glass UI design aesthetic. Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

![Time Zone Converter](https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=1200&h=600&fit=crop&crop=faces)

## ✨ Features

### Core Functionality
- 🌍 **Real-time time zone conversion** between 20+ major world cities
- ⏰ **Live clock updates** every second with smooth animations
- ➕ **Add/remove time zones** dynamically with intuitive controls
- 🔍 **Fuzzy search** for finding cities and time zones quickly
- 📅 **Current date and time display** with multiple format options
- 🌅 **Automatic DST handling** with visual indicators

### Design Features
- 🎨 **Apple Liquid Glass UI** - Glassmorphism effects with frosted glass backgrounds
- ✨ **Smooth animations** - Micro-interactions and hover effects with Framer Motion
- 🎯 **Modern typography** - Clean Inter font family with proper hierarchy
- 🌗 **Dark/Light/System mode** - Intelligent theme switching
- 📱 **Fully responsive** - Mobile-first design that works on all devices
- 🔄 **Translucent cards** - Semi-transparent containers with backdrop blur

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tentendev/time-zone-converter-liquid-glass.git
   cd time-zone-converter-liquid-glass
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom glassmorphism utilities
- **Animations**: Framer Motion
- **Time Zone Logic**: date-fns-tz for accurate time zone handling
- **Search**: Fuse.js for fuzzy search functionality
- **Icons**: Lucide React
- **Deployment**: Optimized for Vercel

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles and CSS variables
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx           # Main application page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   │   ├── Button.tsx    # Glassmorphic button component
│   │   ├── Card.tsx      # Glass card with variants
│   │   ├── Input.tsx     # Glass input component
│   │   └── Switch.tsx    # Animated toggle switch
│   ├── layout/           # Layout components
│   │   └── Header.tsx    # Application header
│   ├── MainClock.tsx     # Large primary clock display
│   ├── TimeZoneCard.tsx  # Individual timezone card
│   ├── TimeZoneGrid.tsx  # Grid layout for timezones
│   ├── TimeZoneSearch.tsx # Search and add functionality
│   └── ThemeToggle.tsx   # Theme switching component
├── hooks/                # Custom React hooks
│   ├── useLocalStorage.ts # Local storage persistence
│   ├── useTheme.ts       # Theme management
│   ├── useTimeZones.ts   # Timezone state management
│   └── useSearch.ts      # Search functionality
├── types/                # TypeScript type definitions
│   └── timezone.ts       # Timezone-related types
├── utils/                # Utility functions
│   ├── timezones.ts      # Popular timezone definitions
│   └── time.ts           # Time formatting and calculations
└── lib/
    └── utils.ts          # Utility functions (cn helper)
```

## 🚀 Deployment

### Vercel (Recommended)
1. **Push to GitHub/GitLab/Bitbucket**
2. **Import project in Vercel**
3. **Deploy automatically** - Zero configuration needed

### Manual Deployment
```bash
npm run build
npm start
```

## 📱 Key Features

- **Glassmorphism Design**: Beautiful frosted glass effects with backdrop blur
- **Real-time Updates**: Live clock synchronization across all time zones
- **Smart Search**: Fuzzy search with instant results
- **Theme Support**: Dark, light, and system theme detection
- **Responsive**: Optimized for all screen sizes
- **Performance**: Optimized for 60fps animations and fast loading

Built with ❤️ using modern web technologies and Apple's design principles.
