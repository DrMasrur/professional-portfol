import { motion } from 'framer-motion'
import airQualityImg from '@/assets/images/air-quality.svg'
import emissionsImg from '@/assets/images/emissions.svg'
import aiImg from '@/assets/images/ai-neural-network.svg'
import mlImg from '@/assets/images/machine-learning.svg'

export function ResearchGallery() {
  const images = [
    {
      src: airQualityImg,
      title: 'Air Quality Monitoring',
      description: 'Advanced AQI prediction with satellite data',
      gradient: 'from-blue-500/10 to-cyan-500/10'
    },
    {
      src: emissionsImg,
      title: 'Emission Analysis',
      description: 'ML-powered emission modeling and forecasting',
      gradient: 'from-slate-500/10 to-gray-500/10'
    },
    {
      src: aiImg,
      title: 'Deep Learning',
      description: 'Neural network architectures for climate science',
      gradient: 'from-purple-500/10 to-pink-500/10'
    },
    {
      src: mlImg,
      title: 'Machine Learning',
      description: 'Ensemble methods for environmental predictions',
      gradient: 'from-green-500/10 to-emerald-500/10'
    }
  ]

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-background to-secondary/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 font-[family-name:var(--font-heading)]">
            Research Visualization
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Visual representations of key research domains in environmental AI and data science
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {images.map((image, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${image.gradient} border-2 border-border hover:border-primary/50 transition-all hover:shadow-2xl`}>
                <div className="aspect-[4/3] bg-white/50 p-6">
                  <img 
                    src={image.src} 
                    alt={image.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-xl font-semibold mb-2">
                      {image.title}
                    </h3>
                    <p className="text-sm text-white/90">
                      {image.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
