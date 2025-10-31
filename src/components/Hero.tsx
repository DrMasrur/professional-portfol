import { Envelope, LinkedinLogo, Brain, Cpu, Network, CloudArrowUp, ChartLine, Database, Sparkle } from '@phosphor-icons/react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import profileImage from '@/assets/images/profile.jpg'

interface HeroProps {
  data: {
    name: string
    title: string
    tagline: string
    bio: string
  }
  contact: {
    phone: string
    email: string
    workEmail: string
    linkedin: string
  }
}

export function Hero({ data, contact }: HeroProps) {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const floatingElements = [
    { Icon: Brain, size: 64, className: 'top-20 left-[10%] text-primary/20', delay: 0, duration: 8 },
    { Icon: CloudArrowUp, size: 72, className: 'top-32 right-[15%] text-accent/30', delay: 0.3, duration: 10 },
    { Icon: Cpu, size: 56, className: 'bottom-40 left-[15%] text-primary/15', delay: 0.6, duration: 9 },
    { Icon: Network, size: 68, className: 'bottom-32 right-[20%] text-accent/20', delay: 0.9, duration: 11 },
    { Icon: Database, size: 60, className: 'top-1/2 right-[8%] text-primary/25', delay: 1.2, duration: 7 },
    { Icon: ChartLine, size: 52, className: 'top-1/3 left-[5%] text-accent/25', delay: 1.5, duration: 8.5 }
  ]

  const keywords = [
    'Machine Learning',
    'Deep Learning', 
    'Climate Science',
    'Hydrology',
    'Air Quality',
    'Data Science'
  ]

  return (
    <section ref={heroRef} className="relative min-h-[85vh] bg-gradient-to-br from-background via-secondary/30 to-accent/10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_var(--primary)_0%,_transparent_50%)] opacity-[0.03]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_var(--accent)_0%,_transparent_50%)] opacity-[0.04]" />
      
      <div className="absolute inset-0 pointer-events-none">
        {floatingElements.map(({ Icon, size, className, delay, duration }, idx) => (
          <motion.div
            key={idx}
            className={`absolute ${className}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -30, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              opacity: { duration: 0.8, delay },
              scale: { duration: 0.8, delay },
              y: { 
                duration, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay 
              },
              rotate: { 
                duration: duration * 1.2, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay 
              }
            }}
          >
            <Icon size={size} weight="duotone" />
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 pb-16 md:pt-28 md:pb-24"
        style={{ y, opacity }}
      >
        <div className="grid grid-cols-1 gap-12">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-6 text-center"
            >
              <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-sm font-medium">
                <Sparkle className="mr-2 inline" size={16} weight="fill" />
                Available for Collaboration
              </Badge>
            </motion.div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-6">
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <motion.div
                  className="absolute -inset-2 bg-gradient-to-br from-primary/30 via-accent/30 to-primary/30 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <motion.div 
                  className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden shadow-2xl ring-4 ring-primary/20"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 z-10"
                    animate={{
                      opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <img 
                    src={profileImage} 
                    alt={data.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </motion.div>

              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground text-center md:text-left font-[family-name:var(--font-heading)] leading-tight"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {data.name}
                <span className="block text-primary mt-2">{data.title}</span>
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-6 text-center max-w-4xl mx-auto"
            >
              <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-medium">
                {data.tagline}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-8 flex justify-center"
            >
              <div className="flex flex-wrap gap-2 justify-center">
                {keywords.map((keyword, idx) => (
                  <motion.span
                    key={keyword}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.7 + idx * 0.1 }}
                  >
                    <Badge variant="outline" className="px-3 py-1.5 text-sm hover:bg-primary/10 transition-colors">
                      {keyword}
                    </Badge>
                  </motion.span>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="flex flex-wrap gap-3 mb-8 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Button 
                variant="default" 
                size="lg" 
                asChild 
                className="hover:scale-105 hover:shadow-lg transition-all"
              >
                <a href={`mailto:${contact.email}`}>
                  <Envelope className="mr-2" size={20} />
                  Get in Touch
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                asChild 
                className="hover:scale-105 hover:shadow-md transition-all"
              >
                <a href={`https://${contact.linkedin}`} target="_blank" rel="noopener noreferrer">
                  <LinkedinLogo className="mr-2" size={20} />
                  LinkedIn
                </a>
              </Button>
            </motion.div>

            <motion.p 
              className="text-base md:text-lg text-foreground/70 leading-relaxed max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              {data.bio}
            </motion.p>

            <div className="mt-12 flex flex-wrap gap-6 justify-center">
              <motion.div
                className="bg-card/95 backdrop-blur-sm rounded-2xl shadow-xl p-4 border border-border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Brain size={28} weight="duotone" className="text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">1000+</div>
                    <div className="text-xs text-muted-foreground">Citations</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-card/95 backdrop-blur-sm rounded-2xl shadow-xl p-4 border border-border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <ChartLine size={28} weight="duotone" className="text-accent" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">h-16</div>
                    <div className="text-xs text-muted-foreground">Index</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  )
}
