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
- Functionality: Searchable/filterable list of academic publications with full citations
- Purpose: Showcase research output and enable easy reference access
- Trigger: Navigate to publications section or search
- Progression: Publications displayed → Filter/search applied → Results update → Citations accessible
- Success criteria: All publications easily browsable with working search functionality

**Skills & Technical Competencies**
- Functionality: Organized display of programming languages, frameworks, tools, and domain expertise
- Purpose: Quickly communicate technical capabilities to potential collaborators/employers
- Trigger: Scroll to skills section
- Progression: Skills appear grouped by category → Visual indicators show proficiency
- Success criteria: All technical skills clearly categorized and scannable

## Edge Case Handling
- **Empty JSON fields**: Display placeholder text or hide section if data missing
- **Long publication lists**: Implement pagination or "show more" to prevent overwhelming scroll
- **Broken external links**: Graceful handling with visual indicators for link status
- **Mobile overflow**: Ensure long technical terms and citations wrap properly on small screens
- **Missing research metrics**: Display available metrics only, hide missing ones

## Design Direction
The design should evoke academic sophistication and data-driven precision - clean, professional, and modern like a refined research institution's faculty page. A minimal interface best serves the purpose, allowing the impressive credentials to take center stage without visual competition.

## Color Selection
Complementary color scheme with deep professional blue paired with warm accent to create trust and approachability.

- **Primary Color**: Deep Academic Blue `oklch(0.35 0.08 250)` - Communicates trust, intelligence, and professionalism reminiscent of scholarly institutions
- **Secondary Colors**: Light Neutral `oklch(0.96 0.005 250)` for backgrounds providing breathing room, Soft Gray `oklch(0.65 0.01 250)` for supporting text
- **Accent Color**: Warm Amber `oklch(0.68 0.15 65)` for highlighting achievements and interactive elements, creating energy without overwhelming
- **Foreground/Background Pairings**: 
  - Background (Soft White `oklch(0.99 0.002 250)`): Dark Text `oklch(0.25 0.02 250)` - Ratio 13.8:1 ✓
  - Card (White `oklch(1 0 0)`): Dark Text `oklch(0.25 0.02 250)` - Ratio 14.2:1 ✓
  - Primary (Deep Blue `oklch(0.35 0.08 250)`): White text `oklch(0.99 0.002 250)` - Ratio 9.4:1 ✓
  - Accent (Warm Amber `oklch(0.68 0.15 65)`): Dark text `oklch(0.25 0.02 250)` - Ratio 4.6:1 ✓
  - Muted (Light Gray `oklch(0.95 0.005 250)`): Medium text `oklch(0.50 0.03 250)` - Ratio 6.2:1 ✓

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
Subtle, purposeful animations that enhance professionalism - gentle fades and slides that guide attention without distraction, reflecting the measured precision of scientific inquiry.

- **Purposeful Meaning**: Smooth scrolling between sections suggests fluid knowledge transfer; cards that gently lift on hover indicate interactivity while maintaining dignity
- **Hierarchy of Movement**: Hero elements fade in sequentially (name → title → contact) to build narrative; section reveals triggered by scroll position to maintain engagement; publication list items stagger for scanability

## Component Selection

- **Components**: 
  - Card for education/experience items and research highlights with subtle shadow on hover
  - Tabs for switching between different content views (Experience/Education/Skills)
  - Badge for skills, programming languages, and awards with accent color
  - Separator for visual breaks between major sections
  - Button for external links (Google Scholar, LinkedIn, ORCID) with primary styling
  - Input with search icon for publication filtering
  - Avatar for professional photo placeholder
  - ScrollArea for contained lists that might overflow
  
- **Customizations**: 
  - Custom Timeline component connecting experience/education cards with vertical line
  - Custom PublicationCard with citation formatting and copy-to-clipboard functionality
  - Custom MetricDisplay for research statistics with large numbers and visual emphasis
  
- **States**: 
  - Buttons: Default (primary blue), Hover (darker blue with lift), Active (pressed state), Disabled (grayed for inactive links)
  - Cards: Default (white with subtle border), Hover (elevated shadow with slight scale), Selected (accent border for filtered items)
  - Inputs: Default (light border), Focus (accent ring), Filled (darker text)
  
- **Icon Selection**: 
  - Envelope for email contact
  - LinkedinLogo for professional network
  - GraduationCap for education
  - Briefcase for work experience
  - Flask or Atom for research
  - FileText for publications
  - Code for programming skills
  - MagnifyingGlass for search
  - Copy for citation copying
  
- **Spacing**: 
  - Section padding: py-16 md:py-24 for generous breathing room
  - Container max-width: max-w-6xl for optimal reading line length
  - Card gaps: gap-6 md:gap-8 for clear separation
  - Content padding: p-6 md:p-8 within cards
  - Element margins: mb-4 for related content, mb-8 for distinct blocks
  
- **Mobile**: 
  - Stack sections vertically on mobile with increased touch targets (min-h-12)
  - Timeline switches from side-by-side to vertical single-column flow
  - Tabs convert to full-width stacked buttons for easy thumb access
  - Publication cards expand to full width with adjusted padding
  - Hero text sizes scale down (H1: 32px mobile vs 48px desktop)
  - Navigation becomes sticky header with hamburger menu (if needed)
  - Contact buttons stack vertically on small screens
