import { useState } from 'react'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Publications } from './Publications'
import { Blogs } from './Blogs'
import { ContactUs } from './ContactUs'
import { motion, PanInfo, useMotionValue, useTransform } from 'framer-motion'
import { BookOpen, Article, Envelope, X, ArrowsOut } from '@phosphor-icons/react'
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
  const [fullPageSection, setFullPageSection] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  
  const y = useMotionValue(0)
  const opacity = useTransform(y, [0, 100], [1, 0])

  const openFullPage = (sectionId: string) => {
    setFullPageSection(sectionId)
  }

  const closeFullPage = () => {
    setFullPageSection(null)
    setSearchQuery('')
  }

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.y > 100 || info.velocity.y > 500) {
      closeFullPage()
    }
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
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="lg:sticky lg:top-6 h-fit space-y-1.5 w-20"
      >
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
          >
            <Card 
              className="overflow-hidden border-primary/20 shadow-sm backdrop-blur-sm bg-card/95 cursor-pointer transition-all hover:shadow-lg hover:border-primary/40 hover:-translate-y-0.5 group"
              onClick={() => openFullPage(card.id)}
            >
              <motion.div 
                className={`bg-gradient-to-br ${card.gradient} p-2.5 flex flex-col items-center justify-center gap-1.5 relative`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div 
                  className="h-10 w-10 rounded-lg bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-sm"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <card.icon size={20} className={card.iconColor} weight="duotone" />
                </motion.div>
                
                {card.count !== null && (
                  <Badge variant="secondary" className="h-4 min-w-[20px] px-1 text-[10px] font-bold">
                    {card.count}
                  </Badge>
                )}
                
                <motion.div
                  className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  whileHover={{ scale: 1.2 }}
                >
                  <div className="bg-background rounded-full p-0.5 shadow-md">
                    <ArrowsOut size={12} className="text-primary" />
                  </div>
                </motion.div>
              </motion.div>
            </Card>
          </motion.div>
        ))}
        
        <motion.div
          className="pt-1 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-[9px] text-muted-foreground leading-tight">
            Click to expand
          </p>
        </motion.div>
      </motion.div>

      <Dialog open={!!fullPageSection} onOpenChange={closeFullPage}>
        <DialogContent className="max-w-[95vw] w-full h-[95vh] overflow-hidden p-0 gap-0">
          <motion.div
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            onDragEnd={handleDragEnd}
            style={{ y, opacity }}
            className="flex flex-col h-full"
          >
            <div className="lg:hidden w-12 h-1 bg-muted-foreground/30 rounded-full mx-auto mt-2 mb-1" />
            
            <DialogHeader className="px-6 pt-4 lg:pt-6 pb-4 border-b border-border relative flex-shrink-0">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-2xl lg:text-3xl font-semibold font-[family-name:var(--font-heading)]">
                  {cards.find(c => c.id === fullPageSection)?.title}
                </DialogTitle>
                <motion.button
                  onClick={closeFullPage}
                  className="h-10 w-10 rounded-full flex items-center justify-center hover:bg-accent transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  aria-label="Close"
                >
                  <X size={24} className="text-muted-foreground" />
                </motion.button>
              </div>
            </DialogHeader>
            
            <Tabs value={fullPageSection || 'publications'} onValueChange={setFullPageSection} className="flex-1 flex flex-col overflow-hidden min-h-0">
              <TabsList className="mx-6 mt-4 w-fit flex-shrink-0">
                {cards.map((card) => (
                  <TabsTrigger key={card.id} value={card.id}>
                    <card.icon size={18} className="mr-2" />
                    <span className="hidden sm:inline">{card.tabLabel}</span>
                    <span className="sm:hidden">{card.title}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="publications" className="flex-1 overflow-y-auto px-6 pb-6 mt-4 min-h-0">
                <Publications
                  publications={filteredPublications}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  totalCount={publications.length}
                />
              </TabsContent>

              <TabsContent value="blogs" className="flex-1 overflow-y-auto px-6 pb-6 mt-4 min-h-0">
                <Blogs />
              </TabsContent>

              <TabsContent value="contact" className="flex-1 overflow-y-auto px-6 pb-6 mt-4 min-h-0">
                <ContactUs contact={contact} />
              </TabsContent>
            </Tabs>
          </motion.div>
        </DialogContent>
      </Dialog>
    </>
  )
}
