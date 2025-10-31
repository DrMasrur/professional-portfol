import { useState, useEffect } from 'react'
import profileData from './data/profile.json'
import { usePublications } from './hooks/use-publications'
import { Hero } from './components/Hero'
import { ResearchFocus } from './components/ResearchFocus'
import { ResearchGallery } from './components/ResearchGallery'
import { TechnologyStack } from './components/TechnologyStack'
import { ResearchHighlights } from './components/ResearchHighlights'
import { Education } from './components/Education'
import { Experience } from './components/Experience'
import { Skills } from './components/Skills'
import { Awards } from './components/Awards'
import { Publications } from './components/Publications'
import { Blogs } from './components/Blogs'
import { ContactUs } from './components/ContactUs'
import { ScholarSyncDialog } from './components/ScholarSyncDialog'
import { Separator } from './components/ui/separator'
import { Toaster } from './components/ui/sonner'
import { Button } from './components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp, BookOpen, Article, Envelope, Briefcase, GraduationCap, Lightbulb, Trophy, House, ChartBar } from '@phosphor-icons/react'
import { cn } from './lib/utils'
import { toast } from 'sonner'

function App() {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [publicationsSearchQuery, setPublicationsSearchQuery] = useState('')
  const [activeSection, setActiveSection] = useState('home')
  
  const {
    publications,
    metrics,
    isLoading: isRefreshing,
    lastUpdated,
    error,
    refreshPublications,
  } = usePublications()

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const filteredPublications = (publications || []).filter(pub => {
    if (!publicationsSearchQuery) return true
    const query = publicationsSearchQuery.toLowerCase()
    return (
      pub.title.toLowerCase().includes(query) ||
      pub.authors.toLowerCase().includes(query) ||
      pub.journal.toLowerCase().includes(query) ||
      pub.year.toString().includes(query)
    )
  })
  
  const handleRefreshPublications = async () => {
    const result = await refreshPublications()
    if (result) {
      toast.success('Publications synced successfully from Google Scholar!')
    } else if (error) {
      toast.error(`Failed to sync: ${error}`)
    }
  }

  const menuItems = [
    { id: 'home', label: 'Home', icon: House },
    { id: 'research', label: 'Research', icon: ChartBar },
    { id: 'publications', label: 'Publications', icon: BookOpen },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Lightbulb },
    { id: 'awards', label: 'Awards', icon: Trophy },
    { id: 'blogs', label: 'Blogs', icon: Article },
    { id: 'contact', label: 'Contact', icon: Envelope },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <ScholarSyncDialog />
      
      <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center text-white font-bold text-lg">
                MA
              </div>
              <span className="font-semibold text-foreground hidden sm:inline">Dr. Masrur Ahmed</span>
            </div>
            
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 whitespace-nowrap text-sm font-medium",
                      activeSection === item.id
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "text-foreground hover:bg-muted"
                    )}
                  >
                    <Icon size={18} weight={activeSection === item.id ? "fill" : "regular"} />
                    <span className="hidden md:inline">{item.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </nav>
      
      <AnimatePresence>
        {showBackToTop && (
          <motion.div
            className="fixed bottom-8 right-8 z-40"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              onClick={scrollToTop}
              size="icon"
              className="h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all bg-gradient-to-br from-primary to-secondary"
            >
              <ArrowUp size={24} weight="bold" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <section id="home">
        <Hero data={profileData.personal} contact={profileData.personal.contact} publications={publications || profileData.publications} metrics={metrics} />
      </section>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section id="research" className="scroll-mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 font-[family-name:var(--font-heading)] bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Research Focus
            </h2>
            <ResearchFocus />
          </motion.div>
          
          <Separator className="my-16" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 font-[family-name:var(--font-heading)] bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent">
              Research Highlights
            </h2>
            <ResearchHighlights 
              research={profileData.research} 
              areas={profileData.researchAreas}
              expertise={profileData.expertise}
            />
          </motion.div>
          
          <Separator className="my-16" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 font-[family-name:var(--font-heading)] bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent">
              Research Gallery
            </h2>
            <ResearchGallery />
          </motion.div>
          
          <Separator className="my-16" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 font-[family-name:var(--font-heading)] bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Technology Stack
            </h2>
            <TechnologyStack />
          </motion.div>
        </section>

        <Separator className="my-16" />

        <section id="publications" className="scroll-mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 font-[family-name:var(--font-heading)] bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
              Publications
            </h2>
            <Publications 
              publications={filteredPublications}
              searchQuery={publicationsSearchQuery}
              onSearchChange={setPublicationsSearchQuery}
              totalCount={publications?.length || 0}
              onRefresh={handleRefreshPublications}
              isRefreshing={isRefreshing}
              lastUpdated={lastUpdated}
            />
          </motion.div>
        </section>

        <Separator className="my-16" />

        <section id="experience" className="scroll-mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 font-[family-name:var(--font-heading)] bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
              Professional Experience
            </h2>
            <Experience data={profileData.experience} />
          </motion.div>
        </section>

        <Separator className="my-16" />

        <section id="education" className="scroll-mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 font-[family-name:var(--font-heading)] bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Education
            </h2>
            <Education data={profileData.education} />
          </motion.div>
        </section>

        <Separator className="my-16" />

        <section id="skills" className="scroll-mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 font-[family-name:var(--font-heading)] bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent">
              Skills & Expertise
            </h2>
            <Skills 
              skills={profileData.skills}
              memberships={profileData.memberships}
              training={profileData.training}
            />
          </motion.div>
        </section>

        <Separator className="my-16" />

        <section id="awards" className="scroll-mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 font-[family-name:var(--font-heading)] bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Awards & Recognition
            </h2>
            <Awards awards={profileData.awards} />
          </motion.div>
        </section>

        <Separator className="my-16" />

        <section id="blogs" className="scroll-mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 font-[family-name:var(--font-heading)] bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Blogs & Articles
            </h2>
            <Blogs />
          </motion.div>
        </section>

        <Separator className="my-16" />

        <section id="contact" className="scroll-mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 font-[family-name:var(--font-heading)] bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
              Contact Information
            </h2>
            <ContactUs contact={profileData.personal.contact} />
          </motion.div>
        </section>

        <footer className="py-12 mt-16 text-center text-muted-foreground text-sm border-t border-border">
          <p>© {new Date().getFullYear()} {profileData.personal.name}. All rights reserved.</p>
          <p className="mt-2">Last updated: {new Date().toLocaleDateString()}</p>
        </footer>
      </div>
    </div>
  )
}

export default App
