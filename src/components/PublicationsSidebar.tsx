import { useState } from 'react'
import { Card, CardContent } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { MagnifyingGlass, Copy, Check, BookOpen } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'

interface Publication {
  title: string
  authors: string
  year: number
  journal: string
  volume: string
  pages: string
}

interface PublicationsSidebarProps {
  publications: Publication[]
}

export function PublicationsSidebar({ publications }: PublicationsSidebarProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showAll, setShowAll] = useState(false)

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

  const displayedPublications = showAll ? filteredPublications : filteredPublications.slice(0, 5)

  const formatCitation = (pub: Publication) => {
    return `${pub.authors} (${pub.year}). ${pub.title}. ${pub.journal}, ${pub.volume}, ${pub.pages}.`
  }

  const copyCitation = (pub: Publication, index: number) => {
    const citation = formatCitation(pub)
    navigator.clipboard.writeText(citation).then(() => {
      setCopiedIndex(index)
      toast.success('Citation copied!')
      setTimeout(() => setCopiedIndex(null), 2000)
    })
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
        <Input
          placeholder="Search publications..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 h-9"
        />
      </div>

      {filteredPublications.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-sm text-muted-foreground">
            No publications found.
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {displayedPublications.map((pub, idx) => (
                <motion.div
                  key={`${pub.title}-${idx}`}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2, delay: idx * 0.02 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <Card className="hover:shadow-md transition-all group relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={false}
                    />
                    <CardContent className="p-4 relative z-10">
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <motion.div
                            whileHover={{ rotate: [0, 360] }}
                            transition={{ duration: 0.5 }}
                          >
                            <BookOpen size={16} className="text-primary mt-0.5 flex-shrink-0" />
                          </motion.div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <Badge variant="outline" className="text-xs px-2 py-0 h-5">
                                {pub.year}
                              </Badge>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => copyCitation(pub, idx)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Copy citation"
                              >
                                {copiedIndex === idx ? (
                                  <Check className="text-green-600" size={14} />
                                ) : (
                                  <Copy className="text-muted-foreground hover:text-foreground" size={14} />
                                )}
                              </motion.button>
                            </div>
                            <h4 className="font-medium text-xs leading-snug mb-1.5 group-hover:text-primary transition-colors line-clamp-2">
                              {pub.title}
                            </h4>
                            <p className="text-xs text-muted-foreground line-clamp-1 mb-1">
                              {pub.authors}
                            </p>
                            <p className="text-xs text-foreground/60">
                              <span className="font-medium">{pub.journal}</span>
                              {pub.volume && `, ${pub.volume}`}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredPublications.length > 5 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAll(!showAll)}
              className="w-full"
            >
              {showAll ? 'Show Less' : `Show All ${filteredPublications.length} Publications`}
            </Button>
          )}
        </>
      )}
    </div>
  )
}
