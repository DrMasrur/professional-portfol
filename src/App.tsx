import { useState, useMemo } from 'react'
import profileData from './data/profile.json'
import { Hero } from './components/Hero'
import { ResearchHighlights } from './components/ResearchHighlights'
import { Education } from './components/Education'
import { Experience } from './components/Experience'
import { Skills } from './components/Skills'
import { Publications } from './components/Publications'
import { Awards } from './components/Awards'
import { Separator } from './components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { Toaster } from './components/ui/sonner'

function App() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPublications = useMemo(() => {
    if (!searchQuery) return profileData.publications
    const query = searchQuery.toLowerCase()
    return profileData.publications.filter(pub => 
      pub.title.toLowerCase().includes(query) ||
      pub.authors.toLowerCase().includes(query) ||
      pub.journal.toLowerCase().includes(query) ||
      pub.year.toString().includes(query)
    )
  }, [searchQuery])

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <Hero data={profileData.personal} contact={profileData.personal.contact} />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="py-16 md:py-20">
          <ResearchHighlights 
            research={profileData.research} 
            areas={profileData.researchAreas}
            expertise={profileData.expertise}
          />
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

        <Separator className="my-12" />

        <section className="py-16 md:py-20">
          <Publications 
            publications={filteredPublications}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            totalCount={profileData.publications.length}
          />
        </section>

        <footer className="py-12 text-center text-muted-foreground text-sm">
          <p>© {new Date().getFullYear()} {profileData.personal.name}. All rights reserved.</p>
          <p className="mt-2">Last updated: {new Date().toLocaleDateString()}</p>
        </footer>
      </main>
    </div>
  )
}

export default App
