import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { ChartBar, GraduationCap, Wind, Cloud, Brain, ChartLineUp, Cpu, TreeStructure, Globe, CloudArrowUp } from '@phosphor-icons/react'
import airQualityImg from '@/assets/images/air-quality.svg'
import emissionsImg from '@/assets/images/emissions.svg'
import aiImg from '@/assets/images/ai-neural-network.svg'
import mlImg from '@/assets/images/machine-learning.svg'
import { motion } from 'framer-motion'

interface ResearchHighlightsProps {
  research: {
    orcid: string
    googleScholar: string
    metrics: {
      citations: number
      hIndex: number
      i10Index: number
    }
    roles: string[]
  }
  areas: string[]
  expertise: string[]
}

export function ResearchHighlights({ research, areas, expertise }: ResearchHighlightsProps) {
  const researchIcons = [
    { icon: Wind, title: 'Air Quality', gradient: 'from-blue-400 to-cyan-500', image: airQualityImg },
    { icon: CloudArrowUp, title: 'Emissions', gradient: 'from-gray-400 to-slate-500', image: emissionsImg },
    { icon: Brain, title: 'Deep Learning', gradient: 'from-purple-400 to-pink-500', image: aiImg },
    { icon: TreeStructure, title: 'Machine Learning', gradient: 'from-green-400 to-emerald-500', image: mlImg },
  ]

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {researchIcons.map((item, idx) => (
          <motion.div 
            key={idx}
            className="relative group cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity rounded-xl blur-xl from-primary/20 to-accent/20" />
            <Card className="relative border-2 hover:border-primary/50 transition-all hover:shadow-xl overflow-hidden">
              <motion.div 
                className="absolute inset-0 opacity-20"
                whileHover={{ opacity: 0.30, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <CardContent className="relative p-6 flex flex-col items-center gap-3">
                <motion.div 
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <item.icon className="text-white" size={20} weight="duotone" />
                </motion.div>
                <span className="text-sm font-semibold text-center text-foreground">{item.title}</span>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div>
        {research.roles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Editorial Roles</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {research.roles.map((role, idx) => (
                    <motion.li 
                      key={idx} 
                      className="text-foreground/80"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      viewport={{ once: true }}
                    >
                      {role}
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <motion.div 
          className="flex flex-wrap gap-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Button variant="outline" asChild className="hover:scale-105 transition-transform">
            <a href={research.googleScholar} target="_blank" rel="noopener noreferrer">
              Google Scholar Profile
            </a>
          </Button>
          <Button variant="outline" asChild className="hover:scale-105 transition-transform">
            <a href={`https://orcid.org/${research.orcid}`} target="_blank" rel="noopener noreferrer">
              ORCID: {research.orcid}
            </a>
          </Button>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { title: 'Research Areas', items: areas },
          { title: 'Core Expertise', items: expertise }
        ].map((section, sIdx) => (
          <motion.div
            key={sIdx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: sIdx * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="hover:shadow-lg transition-all h-full">
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {section.items.map((item, idx) => (
                    <motion.li 
                      key={idx} 
                      className="flex items-start gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      viewport={{ once: true }}
                      whileHover={{ x: 4 }}
                    >
                      <span className="text-accent mt-1">•</span>
                      <span className="text-sm text-foreground/80">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
