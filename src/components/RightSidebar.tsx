import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { PublicationsSidebar } from './PublicationsSidebar'
import { Blogs } from './Blogs'
import { ContactUs } from './ContactUs'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Article, Envelope } from '@phosphor-icons/react'

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
  const [activeTab, setActiveTab] = useState('publications')

  const getCounts = () => ({
    publications: publications.length,
    blogs: 5,
    contact: null
  })

  const counts = getCounts()

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="lg:sticky lg:top-6 h-fit"
    >
      <Card className="overflow-hidden border-primary/20 shadow-lg backdrop-blur-sm bg-card/95">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 rounded-none border-b bg-muted/30">
            <TabsTrigger 
              value="publications" 
              className="data-[state=active]:bg-background relative gap-1.5 flex-col sm:flex-row py-3"
            >
              <div className="flex items-center gap-1.5">
                <BookOpen size={16} />
                <span className="hidden sm:inline">Publications</span>
                <span className="sm:hidden">Pubs</span>
              </div>
              <AnimatePresence mode="wait">
                {counts.publications > 0 && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  >
                    <Badge variant="secondary" className="h-5 min-w-[20px] px-1.5 text-xs">
                      {counts.publications}
                    </Badge>
                  </motion.div>
                )}
              </AnimatePresence>
              {activeTab === 'publications' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </TabsTrigger>
            <TabsTrigger 
              value="blogs" 
              className="data-[state=active]:bg-background relative gap-1.5 flex-col sm:flex-row py-3"
            >
              <div className="flex items-center gap-1.5">
                <Article size={16} />
                <span>Blogs</span>
              </div>
              <AnimatePresence mode="wait">
                {counts.blogs > 0 && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  >
                    <Badge variant="secondary" className="h-5 min-w-[20px] px-1.5 text-xs">
                      {counts.blogs}
                    </Badge>
                  </motion.div>
                )}
              </AnimatePresence>
              {activeTab === 'blogs' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </TabsTrigger>
            <TabsTrigger 
              value="contact" 
              className="data-[state=active]:bg-background relative gap-1.5 flex-col sm:flex-row py-3"
            >
              <div className="flex items-center gap-1.5">
                <Envelope size={16} />
                <span>Contact</span>
              </div>
              {activeTab === 'contact' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </TabsTrigger>
          </TabsList>

          <div className="max-h-[calc(100vh-12rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
            <AnimatePresence mode="wait">
              <TabsContent value="publications" className="p-4 m-0">
                {activeTab === 'publications' && (
                  <motion.div
                    key="publications"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <PublicationsSidebar publications={publications} />
                  </motion.div>
                )}
              </TabsContent>

              <TabsContent value="blogs" className="p-4 m-0">
                {activeTab === 'blogs' && (
                  <motion.div
                    key="blogs"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Blogs />
                  </motion.div>
                )}
              </TabsContent>

              <TabsContent value="contact" className="p-4 m-0">
                {activeTab === 'contact' && (
                  <motion.div
                    key="contact"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ContactUs contact={contact} />
                  </motion.div>
                )}
              </TabsContent>
            </AnimatePresence>
          </div>
        </Tabs>
      </Card>
    </motion.div>
  )
}
