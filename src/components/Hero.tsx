import { Envelope, LinkedinLogo, Phone } from '@phosphor-icons/react'
import { Button } from './ui/button'
import { Avatar, AvatarFallback } from './ui/avatar'

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

  return (
    <section className="bg-gradient-to-b from-secondary to-background py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <Avatar className="w-32 h-32 md:w-40 md:h-40 ring-4 ring-primary/10">
            <AvatarFallback className="text-4xl md:text-5xl bg-primary text-primary-foreground font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-2 font-[family-name:var(--font-heading)]">
              {data.name}, {data.title}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-6">
              {data.tagline}
            </p>
            
            <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-6">
              <Button variant="default" size="sm" asChild>
                <a href={`mailto:${contact.email}`}>
                  <Envelope className="mr-2" />
                  Email
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href={`tel:${contact.phone}`}>
                  <Phone className="mr-2" />
                  Phone
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href={`https://${contact.linkedin}`} target="_blank" rel="noopener noreferrer">
                  <LinkedinLogo className="mr-2" />
                  LinkedIn
                </a>
              </Button>
            </div>

            <p className="text-base text-foreground/80 leading-relaxed max-w-3xl">
              {data.bio}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
