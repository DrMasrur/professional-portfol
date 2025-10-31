import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog'
import { Badge } from './ui/badge'
import { Card, CardContent } from './ui/card'
import { ScrollArea } from './ui/scroll-area'
import { BookOpen, Quotes } from '@phosphor-icons/react'

interface Publication {
  id: string
  title: string
  authors: string
  year: number
  journal: string
  volume: string
  pages: string
  citations?: number
}

interface ResearchArea {
  id: string
  title: string
  description: string
  overview: string
  color: string
  papers: string[]
}

interface ResearchAreaDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  area: ResearchArea | null
  publications: Publication[]
}

export function ResearchAreaDialog({ open, onOpenChange, area, publications }: ResearchAreaDialogProps) {
  if (!area) return null

  const areaPapers = publications.filter(pub => area.papers.includes(pub.id))
  const totalCitations = areaPapers.reduce((sum, paper) => sum + (paper.citations || 0), 0)

  const colorMap: Record<string, { gradient: string; badge: string; icon: string }> = {
    sky: { gradient: 'from-sky-400 via-blue-500 to-cyan-600', badge: 'bg-sky-100 text-sky-800 border-sky-200', icon: 'text-sky-600' },
    purple: { gradient: 'from-purple-400 via-fuchsia-500 to-pink-600', badge: 'bg-purple-100 text-purple-800 border-purple-200', icon: 'text-purple-600' },
    emerald: { gradient: 'from-emerald-400 via-green-500 to-teal-600', badge: 'bg-emerald-100 text-emerald-800 border-emerald-200', icon: 'text-emerald-600' },
    amber: { gradient: 'from-amber-400 via-orange-500 to-red-500', badge: 'bg-amber-100 text-amber-800 border-amber-200', icon: 'text-amber-600' },
    indigo: { gradient: 'from-indigo-400 via-blue-500 to-purple-600', badge: 'bg-indigo-100 text-indigo-800 border-indigo-200', icon: 'text-indigo-600' },
    cyan: { gradient: 'from-cyan-400 via-teal-500 to-blue-600', badge: 'bg-cyan-100 text-cyan-800 border-cyan-200', icon: 'text-cyan-600' },
    rose: { gradient: 'from-rose-400 via-pink-500 to-red-600', badge: 'bg-rose-100 text-rose-800 border-rose-200', icon: 'text-rose-600' },
    violet: { gradient: 'from-violet-400 via-purple-500 to-fuchsia-600', badge: 'bg-violet-100 text-violet-800 border-violet-200', icon: 'text-violet-600' },
    slate: { gradient: 'from-slate-400 via-gray-500 to-zinc-600', badge: 'bg-slate-100 text-slate-800 border-slate-200', icon: 'text-slate-600' }
  }

  const colors = colorMap[area.color] || colorMap.sky

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] p-0">
        <div className={`h-2 w-full bg-gradient-to-r ${colors.gradient}`} />
        
        <div className="px-6 pt-6 pb-4">
          <DialogHeader>
            <div className="flex items-start justify-between gap-4 mb-2">
              <DialogTitle className="text-2xl md:text-3xl font-semibold leading-tight pr-8">
                {area.title}
              </DialogTitle>
              <div className="flex gap-2 shrink-0">
                <Badge variant="outline" className={`${colors.badge} font-semibold px-3 py-1`}>
                  {areaPapers.length} {areaPapers.length === 1 ? 'Paper' : 'Papers'}
                </Badge>
                {totalCitations > 0 && (
                  <Badge variant="outline" className="bg-muted font-semibold px-3 py-1">
                    <Quotes className="mr-1 h-3 w-3" weight="bold" />
                    {totalCitations}
                  </Badge>
                )}
              </div>
            </div>
            <DialogDescription className="text-base leading-relaxed pt-2">
              {area.overview}
            </DialogDescription>
          </DialogHeader>
        </div>

        <ScrollArea className="px-6 pb-6 max-h-[calc(85vh-180px)]">
          <div className="space-y-3">
            {areaPapers.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  <BookOpen className="mx-auto mb-2 h-8 w-8 opacity-50" />
                  <p>No publications found in this research area.</p>
                </CardContent>
              </Card>
            ) : (
              areaPapers.map((paper) => (
                <Card key={paper.id} className="group hover:shadow-md transition-all border-l-4 hover:border-l-primary">
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <div className="shrink-0 pt-1">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${colors.gradient} flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity`}>
                          <BookOpen className="h-4 w-4 text-white" weight="duotone" />
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground leading-tight mb-2 group-hover:text-primary transition-colors">
                          {paper.title}
                        </h4>
                        
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                          {paper.authors}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                          <Badge variant="secondary" className="font-medium">
                            {paper.year}
                          </Badge>
                          <span className="italic">{paper.journal}</span>
                          {paper.volume && <span>Vol. {paper.volume}</span>}
                          {paper.pages && <span>pp. {paper.pages}</span>}
                          {paper.citations !== undefined && paper.citations > 0 && (
                            <Badge variant="outline" className="ml-auto font-semibold">
                              <Quotes className="mr-1 h-3 w-3" weight="fill" />
                              {paper.citations}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
