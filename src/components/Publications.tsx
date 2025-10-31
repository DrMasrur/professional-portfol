import { useState } from 'react'
import { Card, CardContent } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { MagnifyingGlass, Copy, Check } from '@phosphor-icons/react'
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

interface PublicationsProps {
  publications: Publication[]
  searchQuery: string
  onSearchChange: (query: string) => void
  totalCount: number
}

export function Publications({ publications, searchQuery, onSearchChange, totalCount }: PublicationsProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [showAll, setShowAll] = useState(false)

  const displayedPublications = showAll ? publications : publications.slice(0, 10)

  const formatCitation = (pub: Publication) => {
    return `${pub.authors} (${pub.year}). ${pub.title}. ${pub.journal}, ${pub.volume}, ${pub.pages}.`
  }

  const copyCitation = (pub: Publication, index: number) => {
    const citation = formatCitation(pub)
    navigator.clipboard.writeText(citation).then(() => {
      setCopiedIndex(index)
      toast.success('Citation copied to clipboard')
      setTimeout(() => setCopiedIndex(null), 2000)
    })
  }

  return (
    <div className="space-y-6">
      <motion.div 
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground font-[family-name:var(--font-heading)]">
          Publications
          <Badge variant="secondary" className="ml-3 text-base">
            {publications.length} {publications.length !== totalCount ? `of ${totalCount}` : ''}
          </Badge>
        </h2>
        
        <motion.div 
          className="relative w-full sm:w-80"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <Input
            placeholder="Search publications..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </motion.div>
      </motion.div>

      {publications.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No publications found matching your search.
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <>
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {displayedPublications.map((pub, idx) => (
                <motion.div
                  key={`${pub.title}-${idx}`}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: idx * 0.03 }}
                >
                  <Card className="hover:shadow-lg transition-all group hover:scale-[1.01]">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start gap-3">
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              transition={{ type: "spring", stiffness: 400 }}
                            >
                              <Badge variant="outline" className="mt-0.5">
                                {pub.year}
                              </Badge>
                            </motion.div>
                            <div>
                              <h3 className="font-medium text-foreground leading-snug mb-2 group-hover:text-primary transition-colors">
                                {pub.title}
                              </h3>
                              <p className="text-sm text-muted-foreground mb-1">
                                {pub.authors}
                              </p>
                              <p className="text-sm text-foreground/70">
                                <span className="font-medium">{pub.journal}</span>
                                {pub.volume && `, ${pub.volume}`}
                                {pub.pages && `, ${pub.pages}`}
                              </p>
                            </div>
                          </div>
                        </div>
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1, scale: 1.1 }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => copyCitation(pub, idx)}
                            title="Copy citation"
                          >
                            <motion.div
                              initial={false}
                              animate={{ scale: copiedIndex === idx ? [1, 1.2, 1] : 1 }}
                              transition={{ duration: 0.3 }}
                            >
                              {copiedIndex === idx ? (
                                <Check className="text-green-600" size={20} />
                              ) : (
                                <Copy size={20} />
                              )}
                            </motion.div>
                          </Button>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {publications.length > 10 && (
            <motion.div 
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button
                variant="outline"
                onClick={() => setShowAll(!showAll)}
                className="hover:scale-105 transition-transform"
              >
                {showAll ? 'Show Less' : `Show All ${publications.length} Publications`}
              </Button>
            </motion.div>
          )}
        </>
      )}
    </div>
  )
}
