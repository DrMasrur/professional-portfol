import { motion } from 'framer-motion'
import { Card, CardContent } from './ui/card'
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
  const stats = useMemo(() => {
    const totalPubs = publications.length
    const totalCitations = publications.reduce((sum, pub) => sum + (pub.citations || 0), 0)
    const years = publications.map(p => p.year)
    const firstYear = Math.min(...years)
    const lastYear = Math.max(...years)
    const yearsActive = lastYear - firstYear + 1
    const avgPerYear = (totalPubs / yearsActive).toFixed(1)

    return { totalPubs, totalCitations, yearsActive, avgPerYear }
  }, [publications])

  return (
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
  )
}
