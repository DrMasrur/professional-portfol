import { useState } from 'react'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Wind, Brain, Drop, Lightning, Atom, Waves, Flask, GraduationCap, TreeEvergreen, ArrowRight } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { ResearchAreaDialog } from './ResearchAreaDialog'
import profileData from '@/data/profile.json'

interface ResearchArea {
  id: string
  title: string
  description: string
  overview: string
  highlight: boolean
  color: string
  papers: string[]
}

export function ResearchFocus() {
  const [selectedArea, setSelectedArea] = useState<ResearchArea | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const researchAreas = profileData.researchFocusAreas as ResearchArea[]
  const highlightedAreas = researchAreas.filter(area => area.highlight)
  const otherAreas = researchAreas.filter(area => !area.highlight)

  const iconMap: Record<string, any> = {
    'air-quality': Wind,
    'deep-learning-hydrology': Brain,
    'water-resources': Drop,
    'climate-energy': Lightning,
    'remote-sensing': Atom,
    'ocean-climate': Waves,
    'materials-engineering': Flask,
    'education-analytics': GraduationCap,
    'environmental-legacy': TreeEvergreen
  }

  const colorMap: Record<string, { gradient: string; iconColor: string; badge: string }> = {
    sky: { gradient: 'from-sky-400 via-blue-500 to-cyan-600', iconColor: 'text-sky-100', badge: 'bg-sky-100 text-sky-700 border-sky-200' },
    purple: { gradient: 'from-purple-400 via-fuchsia-500 to-pink-600', iconColor: 'text-purple-100', badge: 'bg-purple-100 text-purple-700 border-purple-200' },
    emerald: { gradient: 'from-emerald-400 via-green-500 to-teal-600', iconColor: 'text-emerald-100', badge: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
    amber: { gradient: 'from-amber-400 via-orange-500 to-red-500', iconColor: 'text-amber-100', badge: 'bg-amber-100 text-amber-700 border-amber-200' },
    indigo: { gradient: 'from-indigo-400 via-blue-500 to-purple-600', iconColor: 'text-indigo-100', badge: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
    cyan: { gradient: 'from-cyan-400 via-teal-500 to-blue-600', iconColor: 'text-cyan-100', badge: 'bg-cyan-100 text-cyan-700 border-cyan-200' },
    rose: { gradient: 'from-rose-400 via-pink-500 to-red-600', iconColor: 'text-rose-100', badge: 'bg-rose-100 text-rose-700 border-rose-200' },
    violet: { gradient: 'from-violet-400 via-purple-500 to-fuchsia-600', iconColor: 'text-violet-100', badge: 'bg-violet-100 text-violet-700 border-violet-200' },
    slate: { gradient: 'from-slate-400 via-gray-500 to-zinc-600', iconColor: 'text-slate-100', badge: 'bg-slate-100 text-slate-700 border-slate-200' }
  }

  const handleAreaClick = (area: ResearchArea) => {
    setSelectedArea(area)
    setDialogOpen(true)
  }

  const renderAreaCard = (area: ResearchArea, isHighlight: boolean) => {
    const AreaIcon = iconMap[area.id] || Wind
    const colors = colorMap[area.color] || colorMap.sky
    const paperCount = area.papers.length

    return (
      <Card 
        className="group relative overflow-hidden border-2 hover:border-primary/50 transition-all hover:shadow-2xl h-full cursor-pointer"
        onClick={() => handleAreaClick(area)}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-5 group-hover:opacity-10 transition-opacity`} />
        
        <CardContent className="relative p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className={`shrink-0 ${isHighlight ? 'w-16 h-16' : 'w-12 h-12'} rounded-xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
              <AreaIcon className={colors.iconColor} size={isHighlight ? 32 : 24} weight="duotone" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className={`${isHighlight ? 'text-xl' : 'text-base'} font-semibold text-foreground leading-tight group-hover:text-primary transition-colors`}>
                  {area.title}
                </h3>
                <Badge variant="outline" className={`${colors.badge} shrink-0 font-semibold`}>
                  {paperCount}
                </Badge>
              </div>
            </div>
          </div>
          
          <p className={`${isHighlight ? 'text-sm' : 'text-xs'} text-muted-foreground leading-relaxed mb-4`}>
            {area.description}
          </p>

          <Button variant="ghost" size="sm" className="w-full group/btn">
            View Publications
            <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <section className="py-12 md:py-16">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 font-[family-name:var(--font-heading)]">
            Research Focus Areas
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Pioneering work at the intersection of artificial intelligence, climate science, and environmental monitoring
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <div className="h-1 w-8 bg-gradient-to-r from-primary to-accent rounded-full" />
            Major Research Streams
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {highlightedAreas.map((area, idx) => (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                {renderAreaCard(area, true)}
              </motion.div>
            ))}
          </div>
        </div>

        {otherAreas.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
              <div className="h-1 w-6 bg-gradient-to-r from-muted-foreground to-muted rounded-full" />
              Additional Research Areas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherAreas.map((area, idx) => (
                <motion.div
                  key={area.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  viewport={{ once: true }}
                >
                  {renderAreaCard(area, false)}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </section>

      <ResearchAreaDialog 
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        area={selectedArea}
        publications={profileData.publications}
      />
    </>
  )
}
