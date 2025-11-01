import { Envelope, LinkedinLogo, Brain, ChartLine, Sparkle, X, GithubLogo } from '@phosphor-icons/react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { motion, useScroll, useTransform, PanInfo, useMotionValue } from 'framer-motion'
import { useRef, useState } from 'react'
import profileImage from '@/assets/images/profile.jpg'
import { QuickAccessCards } from './QuickAccessCards'
import { Dialog, DialogContent } from './ui/dialog'

interface Publication {
  title: string
  authors: string
  year: number
  journal: string
  volume?: string
  pages?: string
}

interface ScholarMetrics {
  citations: number
  hIndex: number
  i10Index: number
}

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
  publications: Publication[]
  metrics?: ScholarMetrics
  isLoadingMetrics?: boolean
}

export function Hero({ data, contact, publications, metrics, isLoadingMetrics }: HeroProps) {
  const [showProfileDialog, setShowProfileDialog] = useState(false)
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const dialogY = useMotionValue(0)
  const dialogOpacity = useTransform(dialogY, [0, 100], [1, 0])

  const handleDialogDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.y > 100 || info.velocity.y > 500) {
      setShowProfileDialog(false)
    }
  }

  const keywords = [
    'Machine Learning',
    'Deep Learning', 
    'Climate Science',
    'Hydrology',
    'Air Quality',
    'Data Science'
  ]

  return (
    <section ref={heroRef} className="relative bg-gradient-to-br from-background via-background to-muted overflow-hidden border-b border-border">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--primary)_0%,_transparent_50%)] opacity-[0.08]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--secondary)_0%,_transparent_50%)] opacity-[0.08]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--accent)_0%,_transparent_70%)] opacity-[0.05]" />
      
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 md:py-20"
        style={{ y, opacity }}
      >
        <div className="grid grid-cols-1 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
              <motion.div
                className="relative cursor-pointer flex-shrink-0"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                onClick={() => setShowProfileDialog(true)}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  className="relative w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden shadow-xl ring-2 ring-primary/20 hover:ring-primary/40 transition-all duration-300"
                  transition={{ duration: 0.2 }}
                  whileHover={{ boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 mix-blend-overlay" />
                  <img 
                    src={profileImage} 
                    alt={data.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </motion.div>

              <div className="flex-1 min-w-0">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mb-3"
                >
                  <Badge variant="secondary" className="px-3 py-1 text-xs font-medium">
                    <Sparkle className="mr-1.5 inline" size={14} weight="fill" />
                    Available for Collaboration
                  </Badge>
                </motion.div>

                <motion.h1 
                  className="text-3xl md:text-4xl font-bold text-foreground font-[family-name:var(--font-heading)] leading-tight mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                >
                  {data.name}
                </motion.h1>

                <motion.p
                  className="text-lg md:text-xl text-primary font-semibold font-[family-name:var(--font-heading)] mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {data.title}
                </motion.p>

                <motion.p
                  className="text-base text-muted-foreground leading-relaxed mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                >
                  {data.tagline}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mb-6"
                >
                  <div className="flex flex-wrap gap-2">
                    {keywords.map((keyword, idx) => (
                      <Badge key={keyword} variant="outline" className="px-2.5 py-1 text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex flex-wrap gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.45 }}
                >
                  <Button 
                    variant="default" 
                    size="default"
                    asChild 
                    className="shadow-md bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all duration-300"
                  >
                    <a href={`mailto:${contact.email}`}>
                      <Envelope className="mr-2" size={18} weight="fill" />
                      Get in Touch
                    </a>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="default"
                    asChild
                    className="border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                  >
                    <a href="https://drmasrur.github.io" target="_blank" rel="noopener noreferrer">
                      <GithubLogo className="mr-2" size={18} weight="fill" />
                      Website
                    </a>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="default"
                    asChild
                    className="border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                  >
                    <a href={`https://${contact.linkedin}`} target="_blank" rel="noopener noreferrer">
                      <LinkedinLogo className="mr-2" size={18} weight="fill" />
                      LinkedIn
                    </a>
                  </Button>
                </motion.div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mb-8"
            >
              <p className="text-sm text-foreground/80 leading-relaxed">
                {data.bio}
              </p>
            </motion.div>

            <div>
              <QuickAccessCards publications={publications} contact={contact} />
            </div>
          </motion.div>
        </div>
      </motion.div>

      <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <motion.div
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            onDragEnd={handleDialogDragEnd}
            style={{ y: dialogY, opacity: dialogOpacity }}
            className="space-y-8"
          >
            <div className="lg:hidden w-12 h-1 bg-muted-foreground/30 rounded-full mx-auto -mt-2 mb-4" />
            
            <motion.button
              onClick={() => setShowProfileDialog(false)}
              className="absolute top-4 right-4 lg:top-6 lg:right-6 h-10 w-10 rounded-full flex items-center justify-center hover:bg-accent transition-colors z-50 lg:hidden"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400 }}
              aria-label="Close"
            >
              <X size={24} className="text-muted-foreground" />
            </motion.button>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-br from-primary/30 via-accent/30 to-primary/30 rounded-full blur-2xl"
                  animate={{
                    scale: [1, 1.15, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-2xl ring-8 ring-primary/20">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 z-10"
                    animate={{
                      opacity: [0.2, 0.5, 0.2]
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
                </div>
              </motion.div>

              <div className="flex-1 text-center md:text-left space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground font-[family-name:var(--font-heading)] leading-tight">
                    {data.name}
                  </h2>
                  <p className="text-2xl md:text-3xl text-primary font-semibold mt-3 font-[family-name:var(--font-heading)]">
                    {data.title}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Badge variant="secondary" className="mb-4 px-4 py-2 text-base">
                    <Sparkle className="mr-2 inline" size={18} weight="fill" />
                    Available for Collaboration
                  </Badge>
                </motion.div>

                <motion.p
                  className="text-xl md:text-2xl text-muted-foreground font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {data.tagline}
                </motion.p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {keywords.map((keyword, idx) => (
                  <Badge key={keyword} variant="outline" className="px-4 py-2 text-base">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-secondary/50 rounded-2xl p-6 border border-border"
            >
              <h3 className="text-xl font-semibold mb-4 text-foreground">About</h3>
              <p className="text-lg text-foreground/80 leading-relaxed">
                {data.bio}
              </p>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-4 justify-center md:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Button 
                variant="default" 
                size="lg" 
                asChild 
                className="hover:scale-105 hover:shadow-lg transition-all"
              >
                <a href={`mailto:${contact.email}`}>
                  <Envelope className="mr-2" size={22} />
                  Get in Touch
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                asChild 
                className="hover:scale-105 hover:shadow-md transition-all"
              >
                <a href="https://drmasrur.github.io" target="_blank" rel="noopener noreferrer">
                  <GithubLogo className="mr-2" size={22} />
                  Website
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                asChild 
                className="hover:scale-105 hover:shadow-md transition-all"
              >
                <a href={`https://${contact.linkedin}`} target="_blank" rel="noopener noreferrer">
                  <LinkedinLogo className="mr-2" size={22} />
                  LinkedIn
                </a>
              </Button>
            </motion.div>

            <motion.div
              key={`dialog-metrics-${metrics?.citations}-${metrics?.hIndex}`}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className="bg-card rounded-2xl shadow-xl p-6 border border-border">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Brain size={36} weight="duotone" className="text-primary" />
                  </div>
                  <div>
                    {isLoadingMetrics ? (
                      <>
                        <div className="h-10 w-32 bg-muted animate-pulse rounded mb-2" />
                        <div className="h-4 w-20 bg-muted animate-pulse rounded" />
                      </>
                    ) : (
                      <>
                        <div className="text-4xl font-bold text-foreground">{metrics?.citations?.toLocaleString() || '1000+'}</div>
                        <div className="text-sm text-muted-foreground">Citations</div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-2xl shadow-xl p-6 border border-border">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center">
                    <ChartLine size={36} weight="duotone" className="text-accent" />
                  </div>
                  <div>
                    {isLoadingMetrics ? (
                      <>
                        <div className="h-10 w-36 bg-muted animate-pulse rounded mb-2" />
                        <div className="h-4 w-20 bg-muted animate-pulse rounded" />
                      </>
                    ) : (
                      <>
                        <div className="text-4xl font-bold text-foreground">{metrics?.hIndex || 16}</div>
                        <div className="text-sm text-muted-foreground">h-index</div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
