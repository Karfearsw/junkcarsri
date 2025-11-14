# Design Guidelines: Pawtucket Cash for Cars Lead Generation Website

## Design Approach
**Hybrid Conversion-Optimized Approach**: Drawing inspiration from high-converting service landing pages (HomeAdvisor, Thumbtack) combined with local business trust signals. Focus on clear hierarchy, immediate value communication, and frictionless conversion paths.

## Core Design Elements

### Typography
- **Primary Font**: Inter or DM Sans (modern, trustworthy, highly legible)
- **Hierarchy**:
  - Hero Headline: text-5xl lg:text-6xl font-bold
  - Section Headers: text-3xl lg:text-4xl font-bold
  - Subheadings: text-xl lg:text-2xl font-semibold
  - Body: text-base lg:text-lg
  - Fine Print/Disclaimers: text-sm
- **Urgency Text**: font-semibold with slightly tighter letter-spacing

### Layout System
**Spacing Primitives**: Tailwind units of 3, 4, 6, 8, 12, 16, 20
- Tight spacing (p-3, gap-4): Within cards, form elements
- Medium spacing (p-6, py-8): Component padding
- Generous spacing (py-12, py-16, py-20): Section separation
- Mobile-first responsive: Reduce by 25-33% on mobile (py-20 → py-12)

### Component Library

**Sticky Header**
- Fixed top position, semi-transparent backdrop blur
- Logo left, phone number center-right (large, clickable), "Get Quote" CTA right
- Mobile: Hamburger menu, prominent click-to-call button
- Height: h-16 lg:h-20

**Hero Section**
- Height: min-h-[500px] lg:min-h-[600px] (not full viewport)
- Grid layout: 60/40 split on desktop (content left, supporting visual right)
- Phone number repeated as large, high-contrast button
- Trust badges row below primary CTA
- Mobile: Single column, content first

**Quote Calculator Form**
- Card with subtle shadow and border
- Multi-step feel (even if single page): Year → Make/Model → Condition → Contact
- Large, touch-friendly inputs (h-12)
- Instant quote display: Large number with intentional lowball + "Call for BETTER offer" upsell
- Progress indicator if multi-step

**Trust Signals Bar**
- 4 icons in grid: "24/7 Service" | "Free Towing" | "Licensed & Insured" | "Same Day Payment"
- Icon above, bold title, short description
- bg-gray-50 or subtle background differentiation
- grid-cols-2 md:grid-cols-4

**How It Works Section**
- 3 steps in horizontal cards (desktop) or vertical stack (mobile)
- Large step numbers, icons, brief descriptions
- Arrows or connecting lines between steps

**Testimonials**
- 3-4 cards in grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Star ratings, quote, name, city
- Real photo placeholders (circular avatars)

**FAQ Section**
- Accordion-style expand/collapse
- 4-5 questions addressing: pricing concerns, process, timeline, what cars accepted, towing details
- Clean toggle interaction

**Service Areas List**
- Multi-column layout (3-4 cols desktop, 2 tablet, 1 mobile)
- All Rhode Island cities/towns in alphabetical order for SEO crawling
- Simple text list with separator dots or commas

**CTA Sections** (scattered throughout)
- Primary: Large buttons (h-14), rounded-lg, font-semibold
- Secondary: Outlined or ghost style
- Urgency copy: "Limited Spots Today!" or "Call Now - Operators Standing By"

**Footer**
- Contact info prominent: Email, phone, address
- Quick links, service areas summary
- Trust badges/certifications
- "Powered by AI" tagline

### Interaction Patterns
- Click-to-call phone links throughout (especially mobile)
- Form validation: Real-time with helpful error messages
- Smooth scroll to form sections
- Minimal animations: Fade-ins on scroll for trust signals only

### Images
**Hero Background**: 
- Large, high-quality image of a tow truck picking up a junk car OR happy customer with cash/check
- Subtle overlay (30-40% opacity) to ensure text readability
- Positioned right on desktop, behind content on mobile

**Supporting Images**:
- How It Works: Simple icons (car, phone, money/tow truck)
- Testimonials: Circular avatar placeholders
- Trust badges: Clean icon set (shield, clock, truck, dollar)

**No images needed for**: Form sections, FAQ, service areas list

### Mobile Optimization
- Tap targets minimum 44x44px
- Click-to-call prominently featured
- Simplified navigation (hamburger menu)
- Form inputs optimized for mobile keyboards
- Phone number in sticky header always visible

### Conversion Psychology Elements
- **Urgency**: Time-sensitive language without countdown timers (avoid appearing scammy)
- **Social Proof**: Testimonial count, years in business, cars purchased
- **Loss Aversion**: "Don't lose more value" messaging
- **Simplicity**: Every section reinforces "Fast, Easy, Hassle-Free"
- **Transparency**: Clear process, no hidden fees messaging

### Accessibility
- High contrast for CTAs and phone numbers
- ARIA labels for all interactive elements
- Keyboard navigation for forms
- Clear focus states (ring-2 ring-offset-2)