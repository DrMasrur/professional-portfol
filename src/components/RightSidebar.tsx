import { useState } from 'react'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { PublicationsSidebar } from './PublicationsSidebar'
import { Publications } from './Publications'
import { Blogs } from './Blogs'
import { ContactUs } from './ContactUs'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Article, Envelope, CaretDown, X, ArrowsOut } from '@phosphor-icons/react'
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

interface RightSidebarProps {
  publications: Publication[]
  contact: ContactInfo
}

export function RightSidebar({ publications, contact }: RightSidebarProps) {
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [fullPageSection, setFullPageSection] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const toggleCard = (cardName: string) => {
    setExpandedCard(expandedCard === cardName ? null : cardName)
  }

  const openFullPage = (sectionId: string) => {
    setFullPageSection(sectionId)
    setExpandedCard(null)
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
      content: <PublicationsSidebar publications={publications} />
    },
    {
      id: 'blogs',
      title: 'Blogs',
      icon: Article,
      count: 5,
      gradient: 'from-accent/20 to-accent/5',
      iconColor: 'text-accent',
      content: <Blogs />
    },
    {
      id: 'contact',
      title: 'Contact',
      icon: Envelope,
      count: null,
      gradient: 'from-blue-500/20 to-blue-500/5',
      iconColor: 'text-blue-600',
      content: <ContactUs contact={contact} />
    }
  ]

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="lg:sticky lg:top-6 h-fit space-y-4"
      >
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
          >
            <Card 
              className={`overflow-hidden border-primary/20 shadow-lg backdrop-blur-sm bg-card/95 cursor-pointer transition-all hover:shadow-xl ${
                expandedCard === card.id ? 'ring-2 ring-primary/30' : ''
              }`}
              onClick={() => toggleCard(card.id)}
            >
              <motion.div 
                className={`bg-gradient-to-br ${card.gradient} p-4 flex items-center justify-between`}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3">
                  <motion.div 
                    className="h-12 w-12 rounded-xl bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-md"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <card.icon size={24} className={card.iconColor} weight="duotone" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">{card.title}</h3>
                    {card.count !== null && (
                      <p className="text-xs text-muted-foreground">
                        {card.count} {card.count === 1 ? 'item' : 'items'}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {card.id === 'publications' && (
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation()
                        openFullPage(card.id)
                      }}
                      className="h-8 w-8 hover:bg-background/60"
                      title="Open full page"
                    >
                      <ArrowsOut size={18} className="text-muted-foreground" />
                    </Button>
                  )}
                  {card.count !== null && (
                    <Badge variant="secondary" className="h-6 min-w-[24px] px-2 text-sm font-bold">
                      {card.count}
                    </Badge>
                  )}
                  <motion.div
                    animate={{ rotate: expandedCard === card.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CaretDown size={20} className="text-muted-foreground" />
                  </motion.div>
                </div>
              </motion.div>

              <AnimatePresence>
                {expandedCard === card.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-4 border-t border-border/50 max-h-[60vh] overflow-y-auto">
                      <motion.div
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        {card.content}
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <Dialog open={fullPageSection === 'publications'} onOpenChange={closeFullPage}>
        <DialogContent className="max-w-7xl h-[90vh] overflow-hidden p-0">
          <div className="flex flex-col h-full">
            <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-3xl font-semibold font-[family-name:var(--font-heading)]">
                  Publications
                </DialogTitle>
              </div>
            </DialogHeader>
            
            <Tabs defaultValue="publications" className="flex-1 flex flex-col overflow-hidden">
              <TabsList className="mx-6 mt-4 w-fit">
                <TabsTrigger value="publications">
                  <BookOpen size={18} className="mr-2" />
                  Publications ({publications.length})
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
