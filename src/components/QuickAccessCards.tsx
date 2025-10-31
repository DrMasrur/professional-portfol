import { useState } from 'react'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { PublicationsSidebar } from './PublicationsSidebar'
import { Publications } from './Publications'
import { Blogs } from './Blogs'
import { ContactUs } from './ContactUs'
import { motion } from 'framer-motion'
import { BookOpen, Article, Envelope, ArrowsOut } from '@phosphor-icons/react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs'

interface Publication {
  title: string
  authors: string
  year: number
  journal: string
  volume: string
  pages: string
}

interface ContactInfo {
  phone: string
  email: string
  workEmail: string
  linkedin: string
}

interface QuickAccessCardsProps {
  publications: Publication[]
  contact: ContactInfo
}

export function QuickAccessCards({ publications, contact }: QuickAccessCardsProps) {
  const [fullPageSection, setFullPageSection] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const openFullPage = (sectionId: string) => {
    setFullPageSection(sectionId)
  }

  const closeFullPage = () => {
    setFullPageSection(null)
    setSearchQuery('')
  }

  const filteredPublications = publications.filter(pub => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      pub.title.toLowerCase().includes(query) ||
      pub.authors.toLowerCase().includes(query) ||
      pub.journal.toLowerCase().includes(query) ||
      pub.year.toString().includes(query)
    )
  })

  const cards = [
    {
      id: 'publications',
      title: 'Publications',
      icon: BookOpen,
      count: publications.length,
      gradient: 'from-primary/20 to-primary/5',
      iconColor: 'text-primary',
      tabLabel: `Publications (${publications.length})`
    },
    {
      id: 'blogs',
      title: 'Blogs',
      icon: Article,
      count: 5,
      gradient: 'from-accent/20 to-accent/5',
      iconColor: 'text-accent',
      tabLabel: 'Blogs'
    },
    {
      id: 'contact',
      title: 'Contact',
      icon: Envelope,
      count: null,
      gradient: 'from-blue-500/20 to-blue-500/5',
      iconColor: 'text-blue-600',
      tabLabel: 'Contact'
    }
  ]

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="flex flex-wrap gap-3 justify-center"
      >
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
          >
            <Card 
              className="overflow-hidden border-primary/20 shadow-lg backdrop-blur-sm bg-card/95 cursor-pointer transition-all hover:shadow-xl hover:scale-105"
              onClick={() => openFullPage(card.id)}
            >
              <motion.div 
                className={`bg-gradient-to-br ${card.gradient} p-4 min-w-[180px]`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div 
                      className="h-10 w-10 rounded-xl bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-md"
                    >
                      <card.icon size={20} className={card.iconColor} weight="duotone" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">{card.title}</h3>
                      {card.count !== null && (
                        <p className="text-xs text-muted-foreground">
                          {card.count} {card.count === 1 ? 'item' : 'items'}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation()
                      openFullPage(card.id)
                    }}
                    className="h-8 w-8 hover:bg-background/60"
                    title="Open full view"
                  >
                    <ArrowsOut size={16} className="text-muted-foreground" />
                  </Button>
                </div>
              </motion.div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <Dialog open={!!fullPageSection} onOpenChange={closeFullPage}>
        <DialogContent className="max-w-7xl h-[90vh] overflow-hidden p-0">
          <div className="flex flex-col h-full">
            <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-3xl font-semibold font-[family-name:var(--font-heading)]">
                  {cards.find(c => c.id === fullPageSection)?.title}
                </DialogTitle>
              </div>
            </DialogHeader>
            
            <Tabs value={fullPageSection || 'publications'} onValueChange={setFullPageSection} className="flex-1 flex flex-col overflow-hidden">
              <TabsList className="mx-6 mt-4 w-fit">
                {cards.map((card) => (
                  <TabsTrigger key={card.id} value={card.id}>
                    <card.icon size={18} className="mr-2" />
                    {card.tabLabel}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="publications" className="flex-1 overflow-y-auto px-6 pb-6 mt-4">
                <Publications
                  publications={filteredPublications}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  totalCount={publications.length}
                />
              </TabsContent>

              <TabsContent value="blogs" className="flex-1 overflow-y-auto px-6 pb-6 mt-4">
                <Blogs />
              </TabsContent>

              <TabsContent value="contact" className="flex-1 overflow-y-auto px-6 pb-6 mt-4">
                <ContactUs contact={contact} />
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
