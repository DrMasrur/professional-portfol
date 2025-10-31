import { useState } from 'react'
import { Card, CardContent } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { MagnifyingGlass, Copy, Check } from '@phosphor-icons/react'
import { toast } from 'sonner'

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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground font-[family-name:var(--font-heading)]">
          Publications
          <Badge variant="secondary" className="ml-3 text-base">
            {publications.length} {publications.length !== totalCount ? `of ${totalCount}` : ''}
          </Badge>
        </h2>
        
        <div className="relative w-full sm:w-80">
          <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <Input
            placeholder="Search publications..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {publications.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No publications found matching your search.
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="space-y-4">
            {displayedPublications.map((pub, idx) => (
              <Card key={idx} className="hover:shadow-md transition-shadow group">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start gap-3">
                        <Badge variant="outline" className="mt-0.5">
                          {pub.year}
                        </Badge>
                        <div>
                          <h3 className="font-medium text-foreground leading-snug mb-2">
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
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyCitation(pub, idx)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Copy citation"
                    >
                      {copiedIndex === idx ? (
                        <Check className="text-green-600" size={20} />
                      ) : (
                        <Copy size={20} />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {publications.length > 10 && (
            <div className="text-center">
              <Button
                variant="outline"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? 'Show Less' : `Show All ${publications.length} Publications`}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
