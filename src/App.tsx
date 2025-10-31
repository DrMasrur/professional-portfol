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
import { ArrowUp, BookOpen, Article, Envelope } from '@phosphor-icons/react'

function App() {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [publicationsSearchQuery, setPublicationsSearchQuery] = useState('')

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
            <section className="py-16 md:py-20">
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-8 font-[family-name:var(--font-heading)]">
                Resources & Contact
              </h2>
              <Tabs defaultValue="publications" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="publications">
                    <BookOpen size={18} className="mr-2" />
                    <span className="hidden sm:inline">Publications ({profileData.publications.length})</span>
                    <span className="sm:hidden">Pubs</span>
                  </TabsTrigger>
                  <TabsTrigger value="blogs">
                    <Article size={18} className="mr-2" />
                    Blogs
                  </TabsTrigger>
                  <TabsTrigger value="contact">
                    <Envelope size={18} className="mr-2" />
                    Contact
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="publications">
                  <Publications 
                    publications={filteredPublications}
                    searchQuery={publicationsSearchQuery}
                    onSearchChange={setPublicationsSearchQuery}
                    totalCount={profileData.publications.length}
                  />
                </TabsContent>
                <TabsContent value="blogs">
                  <Blogs />
                </TabsContent>
                <TabsContent value="contact">
                  <ContactUs contact={profileData.personal.contact} />
                </TabsContent>
              </Tabs>
            </section>

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

            <Separator className="my-12" />

            <section className="py-16 md:py-20">
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-8 font-[family-name:var(--font-heading)]">
                Professional Journey
              </h2>
              <Tabs defaultValue="experience" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                </TabsList>
                <TabsContent value="experience">
                  <Experience data={profileData.experience} />
                </TabsContent>
                <TabsContent value="education">
                  <Education data={profileData.education} />
                </TabsContent>
                <TabsContent value="skills">
                  <Skills 
                    skills={profileData.skills}
                    memberships={profileData.memberships}
                    training={profileData.training}
                  />
                </TabsContent>
              </Tabs>
            </section>

            <Separator className="my-12" />

            <section className="py-16 md:py-20">
              <Awards awards={profileData.awards} />
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
