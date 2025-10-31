import { motion } from 'framer-motion'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { BookOpen, TrendUp, Sparkle } from '@phosphor-icons/react'
import { useMemo } from 'react'

interface Publication {
  id?: string
  title: string
  authors: string
  year: number
  journal: string
  volume?: string
  pages?: string
  citations?: number
}

interface PublicationsTimelineProps {
  publications: Publication[]
}

export function PublicationsTimeline({ publications }: PublicationsTimelineProps) {
  const timelineData = useMemo(() => {
    const yearGroups = publications.reduce((acc, pub) => {
      if (!acc[pub.year]) {
        acc[pub.year] = []
      }
      acc[pub.year].push(pub)
      return acc
    }, {} as Record<number, Publication[]>)

    const sortedYears = Object.keys(yearGroups)
      .map(Number)
      .sort((a, b) => b - a)

    return sortedYears.map(year => ({
      year,
      count: yearGroups[year].length,
      publications: yearGroups[year],
      totalCitations: yearGroups[year].reduce((sum, pub) => sum + (pub.citations || 0), 0),
    }))
  }, [publications])

  const stats = useMemo(() => {
    const totalPubs = publications.length
    const totalCitations = publications.reduce((sum, pub) => sum + (pub.citations || 0), 0)
    const years = publications.map(p => p.year)
    const firstYear = Math.min(...years)
    const lastYear = Math.max(...years)
    const yearsActive = lastYear - firstYear + 1
    const avgPerYear = (totalPubs / yearsActive).toFixed(1)

    return { totalPubs, totalCitations, firstYear, lastYear, yearsActive, avgPerYear }
  }, [publications])

  const maxCount = Math.max(...timelineData.map(d => d.count))

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-primary/10">
                  <BookOpen size={24} weight="duotone" className="text-primary" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-foreground">{stats.totalPubs}</div>
                  <div className="text-sm text-muted-foreground">Total Publications</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-accent/10">
                  <TrendUp size={24} weight="duotone" className="text-accent" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-foreground">{stats.avgPerYear}</div>
                  <div className="text-sm text-muted-foreground">Publications/Year</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-secondary/10">
                  <Sparkle size={24} weight="duotone" className="text-secondary" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-foreground">{stats.totalCitations}</div>
                  <div className="text-sm text-muted-foreground">Total Citations</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-primary/10 to-accent/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-primary/10">
                  <BookOpen size={24} weight="duotone" className="text-primary" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-foreground">{stats.yearsActive}</div>
                  <div className="text-sm text-muted-foreground">Years Active</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <BookOpen size={24} weight="duotone" className="text-primary" />
            Publication Timeline ({stats.firstYear} - {stats.lastYear})
          </h3>
          
          <div className="space-y-4">
            {timelineData.map((yearData, index) => {
              const barWidth = (yearData.count / maxCount) * 100
              const isRecent = yearData.year >= new Date().getFullYear() - 2

              return (
                <motion.div
                  key={yearData.year}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 text-right">
                      <span className={`text-lg font-bold ${isRecent ? 'text-primary' : 'text-foreground'}`}>
                        {yearData.year}
                      </span>
                    </div>

                    <div className="flex-1 relative">
                      <div className="h-12 bg-muted/30 rounded-lg overflow-hidden relative">
                        <motion.div
                          className={`h-full rounded-lg ${
                            isRecent
                              ? 'bg-gradient-to-r from-primary via-secondary to-accent'
                              : 'bg-gradient-to-r from-primary/60 to-secondary/60'
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${barWidth}%` }}
                          transition={{ duration: 0.8, delay: index * 0.05 + 0.2 }}
                        />
                        
                        <div className="absolute inset-0 flex items-center justify-between px-4">
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant={isRecent ? "default" : "secondary"}
                              className={`font-bold ${isRecent ? 'bg-primary-foreground text-primary' : ''}`}
                            >
                              {yearData.count} {yearData.count === 1 ? 'Publication' : 'Publications'}
                            </Badge>
                            {yearData.totalCitations > 0 && (
                              <Badge variant="outline" className="text-xs">
                                {yearData.totalCitations} citations
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        whileHover={{ opacity: 1, height: 'auto' }}
                        className="absolute left-0 right-0 top-14 z-10 hidden group-hover:block"
                      >
                        <Card className="shadow-lg border-primary/20">
                          <CardContent className="p-4 max-h-96 overflow-y-auto">
                            <div className="space-y-3">
                              {yearData.publications.map((pub, pubIndex) => (
                                <div
                                  key={pubIndex}
                                  className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                                >
                                  <div className="text-sm font-semibold text-foreground line-clamp-2 mb-1">
                                    {pub.title}
                                  </div>
                                  <div className="text-xs text-muted-foreground mb-1">
                                    {pub.journal}
                                  </div>
                                  <div className="flex items-center gap-2 text-xs">
                                    <Badge variant="secondary" className="text-xs">
                                      {pub.year}
                                    </Badge>
                                    {pub.citations !== undefined && pub.citations > 0 && (
                                      <Badge variant="outline" className="text-xs">
                                        {pub.citations} citations
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </div>

                    <div className="w-12 text-center">
                      <div className="text-2xl font-bold text-primary">
                        {yearData.count}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-muted-foreground">
        <p>Hover over each year to see publication details</p>
      </div>
    </div>
  )
}
