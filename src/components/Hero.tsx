import { Envelope, LinkedinLogo, Phone, Wind, Cloud, Brain, Cpu, Network, CloudArrowUp } from '@phosphor-icons/react'
import { Button } from './ui/button'
import { Avatar, AvatarFallback } from './ui/avatar'
import { motion } from 'framer-motion'

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
  const initials = data.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)

  const floatingIcons = [
    { Icon: Wind, size: 48, position: 'top-10 left-10', delay: 0 },
    { Icon: CloudArrowUp, size: 56, position: 'top-20 right-20', delay: 0.2 },
    { Icon: Brain, size: 64, position: 'bottom-20 left-1/4', delay: 0.4 },
    { Icon: Cpu, size: 52, position: 'bottom-32 right-1/3', delay: 0.6 },
    { Icon: Network, size: 48, position: 'top-1/2 right-10', delay: 0.8 }
  ]

  return (
    <section className="relative bg-gradient-to-b from-secondary to-background py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        {floatingIcons.map(({ Icon, size, position, delay }, idx) => (
          <motion.div
            key={idx}
            className={`absolute ${position}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              opacity: { duration: 0.5, delay },
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 7, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <Icon size={size} weight="duotone" />
          </motion.div>
        ))}
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Avatar className="w-32 h-32 md:w-40 md:h-40 ring-4 ring-primary/10 hover:ring-primary/30 transition-all">
              <AvatarFallback className="text-4xl md:text-5xl bg-primary text-primary-foreground font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
          </motion.div>

          <div className="flex-1 text-center md:text-left">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-2 font-[family-name:var(--font-heading)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {data.name}, {data.title}
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {data.tagline}
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-3 justify-center md:justify-start mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button variant="default" size="sm" asChild className="hover:scale-105 transition-transform">
                <a href={`mailto:${contact.email}`}>
                  <Envelope className="mr-2" />
                  Email
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild className="hover:scale-105 transition-transform">
                <a href={`tel:${contact.phone}`}>
                  <Phone className="mr-2" />
                  Phone
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild className="hover:scale-105 transition-transform">
                <a href={`https://${contact.linkedin}`} target="_blank" rel="noopener noreferrer">
                  <LinkedinLogo className="mr-2" />
                  LinkedIn
                </a>
              </Button>
            </motion.div>

            <motion.p 
              className="text-base text-foreground/80 leading-relaxed max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {data.bio}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  )
}
