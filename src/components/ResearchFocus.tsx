import { Card, CardContent } from './ui/card'
import { Wind, CloudArrowUp, Brain, TreeStructure, ChartLineUp, Atom } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import airQualityImg from '@/assets/images/air-quality.svg'
import emissionsImg from '@/assets/images/emissions.svg'
import aiImg from '@/assets/images/ai-neural-network.svg'
import mlImg from '@/assets/images/machine-learning.svg'

export function ResearchFocus() {
  const focusAreas = [
    {
      icon: Wind,
      title: 'Air Quality Monitoring',
      description: 'Advanced forecasting models for air quality index prediction using satellite-derived hydro-climatological variables',
      gradient: 'from-sky-400 via-blue-500 to-cyan-600',
      iconColor: 'text-sky-100',
      image: airQualityImg
    },
    {
      icon: CloudArrowUp,
      title: 'Emission Modeling',
      description: 'Developing ML and DL models for emission analysis and atmospheric condition insights at DCCEEW',
      gradient: 'from-slate-400 via-gray-500 to-zinc-600',
      iconColor: 'text-slate-100',
      image: emissionsImg
    },
    {
      icon: Brain,
      title: 'Deep Learning',
      description: 'Hybrid deep learning architectures including LSTM, GRU, CNN-LSTM for environmental predictions',
      gradient: 'from-purple-400 via-fuchsia-500 to-pink-600',
      iconColor: 'text-purple-100',
      image: aiImg
    },
    {
      icon: TreeStructure,
      title: 'Machine Learning',
      description: 'Applied ML techniques with ensemble methods, random forests, and support vector machines for climate analysis',
      gradient: 'from-emerald-400 via-green-500 to-teal-600',
      iconColor: 'text-emerald-100',
      image: mlImg
    }
  ]

  return (
    <section className="py-12 md:py-16">
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 font-[family-name:var(--font-heading)]">
          Research Focus Areas
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Pioneering work at the intersection of artificial intelligence, climate science, and environmental monitoring
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {focusAreas.map((area, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="group relative overflow-hidden border-2 hover:border-primary/50 transition-all hover:shadow-2xl h-full">
              <div className={`absolute inset-0 bg-gradient-to-br ${area.gradient} opacity-5 group-hover:opacity-10 transition-opacity`} />
              
              <CardContent className="relative p-0">
                <div className="w-full h-48 overflow-hidden bg-gradient-to-br from-secondary to-background">
                  <img 
                    src={area.image} 
                    alt={area.title}
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br ${area.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      <area.icon className={area.iconColor} size={32} weight="duotone" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {area.title}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {area.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
