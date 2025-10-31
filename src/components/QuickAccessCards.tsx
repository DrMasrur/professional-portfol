import { useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Publications } from './Publications'
import { Blogs } from './Blogs'
import { ContactUs } from './ContactUs'
import { motion } from 'framer-motion'
import { BookOpen, Article, Envelope } from '@phosphor-icons/react'
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
      gradient: 'from-primary via-primary/60 to-primary/20',
      iconColor: 'text-primary',
      tabLabel: `Publications (${publications.length})`
    },
    {
      id: 'blogs',
      title: 'Blogs',
      icon: Article,
      count: 5,
      gradient: 'from-secondary via-secondary/60 to-secondary/20',
      iconColor: 'text-secondary',
      tabLabel: 'Blogs'
    },
    {
      id: 'contact',
      title: 'Contact',
      icon: Envelope,
      count: null,
      gradient: 'from-accent via-accent/60 to-accent/20',
      iconColor: 'text-accent',
      tabLabel: 'Contact'
    }
  ]

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex flex-wrap gap-3"
      >
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
          >
            <Button
              variant="outline"
              size="sm"
              className="h-auto px-4 py-2.5 hover:shadow-md hover:scale-105 transition-all duration-300 border-2"
              onClick={() => openFullPage(card.id)}
            >
              <card.icon size={18} className={`mr-2 ${card.iconColor}`} weight="fill" />
              <span className="text-sm font-semibold">{card.title}</span>
              {card.count !== null && (
                <Badge variant="secondary" className="ml-2 h-5 px-2 text-xs bg-gradient-to-r from-primary/20 to-secondary/20">
                  {card.count}
                </Badge>
              )}
            </Button>
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
