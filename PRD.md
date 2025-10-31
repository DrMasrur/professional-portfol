# Planning Guide

A comprehensive academic portfolio website showcasing Dr. Masrur Ahmed's research profile, publications, and professional experience with JSON-driven content management for easy updates.

**Experience Qualities**: 
1. **Professional** - Projects academic credibility through clean typography and organized information hierarchy that reflects scholarly excellence
2. **Accessible** - Makes complex research achievements digestible through clear visual structure and progressive information disclosure
3. **Dynamic** - Content flows naturally with smooth transitions that guide visitors through the narrative of an accomplished researcher

**Complexity Level**: Light Application (multiple features with basic state)
- Multiple sections displaying different aspects of professional profile with JSON-based content management that allows non-technical updates to all information through simple data file editing.

## Essential Features

**JSON Data Management**
- Functionality: Store all profile data (education, experience, publications, skills) in a JSON file that drives the entire UI
- Purpose: Enable easy content updates without touching code - edit JSON to update website
- Trigger: Data loaded on app initialization
- Progression: JSON file parsed → Data structures created → Components render with data → Updates to JSON instantly reflect on reload
- Success criteria: Changing any value in JSON file updates the corresponding UI element

**Google Scholar Integration**
- Functionality: AI-powered sync with Google Scholar profile to automatically fetch and update publications
- Purpose: Keep publication list current without manual JSON editing - one-click sync from Google Scholar
- Trigger: Click "Sync Scholar" button in Publications section
- Progression: Button clicked → Loading state shown → AI extracts publications from Scholar profile → Publications updated in persistent storage → Success notification → UI updates with new data
- Success criteria: Publications fetch successfully, persist across sessions, and display with citation counts and full metadata

**Hero Section with Professional Identity**
- Functionality: Display name, title, contact information, and professional photo placeholder
- Purpose: Immediate professional impression with all key contact methods
- Trigger: Page load
- Progression: Hero appears → Key credentials visible → Contact links accessible
- Success criteria: All contact information clearly displayed and professional presence established

**Education & Experience Timeline**
- Functionality: Chronological display of academic credentials and work history
- Purpose: Showcase career progression and institutional affiliations
- Trigger: Scroll into view or tab selection
- Progression: Timeline appears → Items displayed chronologically → Details expand on interaction
- Success criteria: Clear visual hierarchy showing career progression with dates, institutions, and responsibilities

**Research Highlights & Metrics**
- Functionality: Display research metrics (citations, h-index, i10-index), memberships, and key research areas
- Purpose: Establish research impact through quantifiable metrics
- Trigger: Visible in dedicated section
- Progression: Metrics displayed with visual emphasis → Research areas listed → Links to profiles
- Success criteria: Research impact immediately clear through prominent metric display

**Interactive Research Focus Areas with Paper Linking**
- Functionality: Categorized research focus areas (4 major highlights + additional areas) with linked publications that open in detailed dialog view
- Purpose: Organize research output by theme and make it easy to explore related work
- Trigger: Click on any research focus area card
- Progression: Focus area clicked → Dialog opens → Overview displayed → Related papers listed with citations → Papers browsable
- Success criteria: All papers properly categorized, clicking area shows relevant publications with full details

**Publications List**
- Functionality: Searchable/filterable list of academic publications with full citations and Google Scholar integration
- Purpose: Showcase research output, enable easy reference access, and keep publications automatically synced
- Trigger: Navigate to publications section, search, or click "Sync Scholar" button
- Progression: Publications displayed → Filter/search applied → Results update → Citations accessible → Sync Scholar clicked → AI fetches latest publications → Publications updated and persisted
- Success criteria: All publications easily browsable with working search functionality and one-click Google Scholar sync

**Skills & Technical Competencies**
- Functionality: Organized display of programming languages, frameworks, tools, and domain expertise
- Purpose: Quickly communicate technical capabilities to potential collaborators/employers
- Trigger: Scroll to skills section
- Progression: Skills appear grouped by category → Visual indicators show proficiency
- Success criteria: All technical skills clearly categorized and scannable

**Visitor Analytics Dashboard**
- Functionality: Track and display visitor statistics including total visits, unique countries, recent activity, and geographic distribution with location detection
- Purpose: Provide insights into global reach and audience engagement to demonstrate research impact
- Trigger: Automatic on page load (tracks current visitor) and section scroll
- Progression: Visitor location detected → Data persisted → Stats calculated → Cards display metrics (total, countries, weekly, daily) → Top locations ranked → Current session details shown
- Success criteria: Real-time visitor tracking with 30-day retention, location data properly aggregated, and privacy notice displayed

## Edge Case Handling
- **Empty JSON fields**: Display placeholder text or hide section if data missing
- **Long publication lists**: Implement pagination or "show more" to prevent overwhelming scroll
- **Broken external links**: Graceful handling with visual indicators for link status
- **Mobile overflow**: Ensure long technical terms and citations wrap properly on small screens
- **Missing research metrics**: Display available metrics only, hide missing ones

## Design Direction
The design should evoke modern professional dynamism with vibrant yet sophisticated colors - clean, engaging, and contemporary like a forward-thinking tech company or innovative research institution. A balanced interface with colorful gradients and smooth animations creates visual interest while maintaining professionalism.

## Color Selection
Triadic color scheme with vibrant blue, teal, and golden yellow creating an energetic, professional, and modern feel.

- **Primary Color**: Vibrant Blue `oklch(0.55 0.20 250)` - Communicates innovation, trust, and modern professionalism with higher saturation for visual impact
- **Secondary Color**: Fresh Teal `oklch(0.60 0.18 180)` - Adds dynamic energy and contemporary feel, complementing the primary while maintaining professionalism
- **Accent Color**: Bright Golden Yellow `oklch(0.65 0.22 50)` - Creates excitement and highlights key elements with warm, inviting energy
- **Foreground/Background Pairings**: 
  - Background (Light Blue-tinted White `oklch(0.98 0.01 240)`): Rich Dark Text `oklch(0.20 0.03 250)` - Ratio 15.2:1 ✓
  - Card (Pure White `oklch(1 0 0)`): Rich Dark Text `oklch(0.20 0.03 250)` - Ratio 16.1:1 ✓
  - Primary (Vibrant Blue `oklch(0.55 0.20 250)`): White text `oklch(0.99 0.01 250)` - Ratio 6.8:1 ✓
  - Secondary (Fresh Teal `oklch(0.60 0.18 180)`): White text `oklch(0.99 0.01 250)` - Ratio 5.9:1 ✓
  - Accent (Bright Yellow `oklch(0.65 0.22 50)`): White text `oklch(0.99 0.01 250)` - Ratio 4.9:1 ✓
  - Muted (Soft Blue-Gray `oklch(0.96 0.01 240)`): Medium text `oklch(0.48 0.03 250)` - Ratio 7.1:1 ✓

## Font Selection
Google Fonts: Inter for its exceptional readability and modern academic feel, paired with Crimson Pro for elegant heading contrast that adds scholarly gravitas.

- **Typographic Hierarchy**: 
  - H1 (Name): Crimson Pro SemiBold/48px/tight letter spacing - Commands attention while remaining refined
  - H2 (Section Headers): Inter Bold/32px/normal - Clear delineation of content areas
  - H3 (Subsections): Inter SemiBold/24px/normal - Organizes information within sections
  - H4 (Job Titles/Degrees): Inter Medium/18px/tight - Emphasizes credentials
  - Body (Descriptions): Inter Regular/16px/relaxed line-height 1.6 - Maximum readability for technical content
  - Caption (Dates/Metadata): Inter Regular/14px/wide letter spacing - Subtle contextual information
  - Citation (Publications): Inter Regular/15px/line-height 1.7 - Optimized for scanning references

## Animations
Dynamic, smooth animations that enhance engagement and create a modern, lively feel - gradient shifts, smooth scrolling, and responsive hover states that reflect innovation and forward-thinking while remaining professional.

- **Purposeful Meaning**: Gradient backgrounds subtly animate to create living surfaces; smooth scroll-to-section navigation with offset for sticky header; section headers fade in as they enter viewport to maintain engagement; menu items have smooth active state transitions with color fills
- **Hierarchy of Movement**: Navigation menu items transition smoothly between states with color and scale; gradient text in headers creates visual interest; cards lift and glow on hover; staggered fade-ins for section content; floating animations for decorative elements

## Component Selection

- **Components**: 
  - Card for education/experience items and research highlights with colorful gradient borders on hover
  - Top sticky navigation menu with smooth scroll-to-section behavior
  - Badge for skills, programming languages, and awards with gradient backgrounds
  - Separator for visual breaks between major sections
  - Button with gradient backgrounds for CTAs and interactive elements
  - Input with colorful focus rings for search functionality
  - Avatar with gradient border for professional photo
  - ScrollArea for contained lists that might overflow
  - Gradient text headings using background-clip for visual interest
  
- **Customizations**: 
  - Custom Navigation component with sticky header and scroll-to-section functionality
  - Custom gradient backgrounds and borders throughout
  - Logo initials component with multi-color gradient background
  - Enhanced hover states with scale and shadow effects
  - Gradient text for section headings
  - Animated back-to-top button with gradient background
  
- **States**: 
  - Navigation items: Default (transparent), Hover (muted background), Active (gradient primary fill with shadow)
  - Buttons: Default (gradient background), Hover (elevated with enhanced glow), Active (pressed scale)
  - Cards: Default (white with subtle border), Hover (elevated shadow with colorful border glow)
  - Inputs: Default (light border), Focus (colorful ring matching primary)
  
- **Icon Selection**: 
  - House for home/hero section
  - ChartBar for research overview
  - BookOpen for publications
  - Article for blogs
  - Envelope for email contact
  - LinkedinLogo for professional network
  - GraduationCap for education
  - Briefcase for work experience
  - Lightbulb for skills
  - Trophy for awards
  - Users for visitor analytics section
  - Globe, MapPin, Eye, TrendUp, Clock for analytics metrics
  - ArrowUp for back to top
  
- **Spacing**: 
  - Section padding: py-8 md:py-12 for comfortable spacing
  - Container max-width: max-w-7xl for wide, modern layout
  - Card gaps: gap-6 md:gap-8 for clear separation
  - Content padding: p-6 md:p-8 within cards
  - Navigation height: h-16 for prominent top menu
  - Scroll offset: 80px to account for sticky header
  
- **Mobile**: 
  - Horizontal scrolling navigation menu on small screens
  - Icon-only navigation items on mobile, full labels on desktop
  - Stack sections vertically with adjusted padding
  - Gradient text remains visible and impactful
  - Enhanced touch targets for navigation (min 44x44px)
  - Back-to-top button repositioned for thumb access
