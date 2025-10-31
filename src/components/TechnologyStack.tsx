import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import aiImg from '@/assets/images/ai-neural-network.svg'
import mlImg from '@/assets/images/machine-learning.svg'
import airQualityImg from '@/assets/images/air-quality.svg'
import emissionsImg from '@/assets/images/emissions.svg'
import { motion } from 'framer-motion'

export function TechnologyStack() {
  const technologies = [
    {
      category: 'Deep Learning',
      color: 'bg-purple-500',
      items: ['LSTM', 'GRU', 'CNN-LSTM', 'Hybrid Models', 'Neural Networks'],
      image: aiImg,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      category: 'Machine Learning',
      color: 'bg-green-500',
      items: ['Random Forest', 'SVR', 'MARS', 'Ensemble Methods', 'Feature Selection'],
      image: mlImg,
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      category: 'Air Quality & Climate',
      color: 'bg-blue-500',
      items: ['AQI Forecasting', 'Emission Modeling', 'Climate Extremes', 'Bias Correction'],
      image: airQualityImg,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      category: 'Frameworks & Tools',
      color: 'bg-orange-500',
      items: ['TensorFlow', 'PyTorch', 'Python', 'R', 'AWS', 'Azure'],
      image: emissionsImg,
      gradient: 'from-orange-500 to-amber-500'
    }
  ]

  return (
    <section className="py-12 md:py-16">
      <motion.div 
        className="mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 font-[family-name:var(--font-heading)]">
          Technology & Methods
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Cutting-edge tools and techniques for environmental AI research
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {technologies.map((tech, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
          >
            <Card className="group border-2 hover:border-primary/50 transition-all hover:shadow-2xl overflow-hidden relative h-full">
              <motion.div 
                className="absolute inset-0 opacity-10"
                whileHover={{ opacity: 0.20, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={tech.image} 
                  alt={tech.category}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <CardContent className="relative p-6">
                <div className="flex items-center gap-3 mb-4">
                  <motion.div 
                    className={`w-3 h-3 rounded-full ${tech.color}`}
                    whileHover={{ scale: 1.5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  />
                  <h3 className="font-semibold text-foreground text-sm">
                    {tech.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tech.items.map((item, itemIdx) => (
                    <motion.div
                      key={itemIdx}
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Badge 
                        variant="secondary" 
                        className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                      >
                        {item}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
