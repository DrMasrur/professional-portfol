import { useState, useEffect } from 'react'
import profileData from './data/profile.json'
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
import { Separator } from './components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { Toaster } from './components/ui/sonner'
import { Button } from './components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp, BookOpen, Article, Envelope, Briefcase, GraduationCap, Lightbulb, Trophy } from '@phosphor-icons/react'
import { cn } from './lib/utils'

function App() {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [publicationsSearchQuery, setPublicationsSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('publications')
  const [isMenuSticky, setIsMenuSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500)
      setIsMenuSticky(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const filteredPublications = profileData.publications.filter(pub => {
    if (!publicationsSearchQuery) return true
    const query = publicationsSearchQuery.toLowerCase()
    return (
      pub.title.toLowerCase().includes(query) ||
      pub.authors.toLowerCase().includes(query) ||
      pub.journal.toLowerCase().includes(query) ||
      pub.year.toString().includes(query)
    )
  })

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      
      <div className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        isMenuSticky ? "bg-background/95 backdrop-blur-sm border-b border-border shadow-sm" : ""
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full h-14 bg-transparent justify-start gap-2 border-b-0 p-0">
              <TabsTrigger 
                value="publications" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-2 rounded-md"
              >
                <BookOpen size={18} className="mr-2" />
                <span className="hidden sm:inline">Publications</span>
                <span className="sm:hidden">Pubs</span>
              </TabsTrigger>
              <TabsTrigger 
                value="blogs"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-2 rounded-md"
              >
                <Article size={18} className="mr-2" />
                Blogs
              </TabsTrigger>
              <TabsTrigger 
                value="contact"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-2 rounded-md"
              >
                <Envelope size={18} className="mr-2" />
                Contact
              </TabsTrigger>
              <TabsTrigger 
                value="experience"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-2 rounded-md"
              >
                <Briefcase size={18} className="mr-2" />
                <span className="hidden sm:inline">Experience</span>
                <span className="sm:hidden">Exp</span>
              </TabsTrigger>
              <TabsTrigger 
                value="education"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-2 rounded-md"
              >
                <GraduationCap size={18} className="mr-2" />
                <span className="hidden sm:inline">Education</span>
                <span className="sm:hidden">Edu</span>
              </TabsTrigger>
              <TabsTrigger 
                value="skills"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-2 rounded-md"
              >
                <Lightbulb size={18} className="mr-2" />
                Skills
              </TabsTrigger>
              <TabsTrigger 
                value="awards"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-2 rounded-md"
              >
                <Trophy size={18} className="mr-2" />
                Awards
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
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
              className="h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-shadow"
            >
              <ArrowUp size={24} />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <Hero data={profileData.personal} contact={profileData.personal.contact} publications={profileData.publications} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8">
          <main className="w-full">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsContent value="publications" className="mt-8">
                <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-8 font-[family-name:var(--font-heading)]">
                  Publications
                </h2>
                <Publications 
                  publications={filteredPublications}
                  searchQuery={publicationsSearchQuery}
                  onSearchChange={setPublicationsSearchQuery}
                  totalCount={profileData.publications.length}
                />
              </TabsContent>
              
              <TabsContent value="blogs" className="mt-8">
                <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-8 font-[family-name:var(--font-heading)]">
                  Blogs & Articles
                </h2>
                <Blogs />
              </TabsContent>
              
              <TabsContent value="contact" className="mt-8">
                <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-8 font-[family-name:var(--font-heading)]">
                  Contact Information
                </h2>
                <ContactUs contact={profileData.personal.contact} />
              </TabsContent>
              
              <TabsContent value="experience" className="mt-8">
                <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-8 font-[family-name:var(--font-heading)]">
                  Professional Experience
                </h2>
                <Experience data={profileData.experience} />
              </TabsContent>
              
              <TabsContent value="education" className="mt-8">
                <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-8 font-[family-name:var(--font-heading)]">
                  Education
                </h2>
                <Education data={profileData.education} />
              </TabsContent>
              
              <TabsContent value="skills" className="mt-8">
                <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-8 font-[family-name:var(--font-heading)]">
                  Skills & Expertise
                </h2>
                <Skills 
                  skills={profileData.skills}
                  memberships={profileData.memberships}
                  training={profileData.training}
                />
              </TabsContent>
              
              <TabsContent value="awards" className="mt-8">
                <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-8 font-[family-name:var(--font-heading)]">
                  Awards & Recognition
                </h2>
                <Awards awards={profileData.awards} />
              </TabsContent>
            </Tabs>

            <Separator className="my-12" />
            <section className="py-16 md:py-20">
              <ResearchFocus />
            </section>

            <Separator className="my-12" />

            <section className="py-16 md:py-20">
              <ResearchHighlights 
                research={profileData.research} 
                areas={profileData.researchAreas}
                expertise={profileData.expertise}
              />
            </section>

            <Separator className="my-12" />

            <section className="py-16 md:py-20">
              <ResearchGallery />
            </section>

            <Separator className="my-12" />

            <section className="py-16 md:py-20">
              <TechnologyStack />
            </section>

            <footer className="py-12 text-center text-muted-foreground text-sm">
              <p>© {new Date().getFullYear()} {profileData.personal.name}. All rights reserved.</p>
              <p className="mt-2">Last updated: {new Date().toLocaleDateString()}</p>
            </footer>
          </main>
        </div>
      </div>
    </div>
  )
}

export default App
