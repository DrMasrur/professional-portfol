import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Briefcase } from '@phosphor-icons/react'

interface ExperienceItem {
  title: string
  organization: string
  period: string
  description: string
  highlights: string[]
}

interface ExperienceProps {
  data: ExperienceItem[]
}

export function Experience({ data }: ExperienceProps) {
  return (
    <div className="relative space-y-6">
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border hidden md:block" />
      
      {data.map((exp, idx) => (
        <Card key={idx} className="relative hover:shadow-lg transition-all md:ml-16">
          {idx === 0 && (
            <div className="absolute top-0 right-0 bg-accent text-accent-foreground px-3 py-1 text-xs font-medium rounded-bl-lg">
              Current
            </div>
          )}
          <div className="absolute -left-16 top-8 hidden md:flex items-center justify-center w-12 h-12 bg-primary rounded-full ring-4 ring-background">
            <Briefcase className="text-primary-foreground" size={20} />
          </div>
          <CardHeader>
            <div className="flex items-start gap-4 md:gap-0">
              <div className="md:hidden p-3 bg-primary/10 rounded-lg">
                <Briefcase className="text-primary" size={20} />
              </div>
              <div className="flex-1">
                <CardTitle className="text-xl mb-1">{exp.title}</CardTitle>
                <CardDescription className="text-base">{exp.organization}</CardDescription>
                <p className="text-sm text-muted-foreground mt-1">{exp.period}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/80 mb-4">{exp.description}</p>
            {exp.highlights.length > 0 && (
              <ul className="space-y-2">
                {exp.highlights.map((highlight, hIdx) => (
                  <li key={hIdx} className="flex items-start gap-2 text-sm text-foreground/70">
                    <span className="text-accent mt-0.5">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
