import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Briefcase, MapPin, Clock } from '@phosphor-icons/react'
import { Badge } from './ui/badge'

interface ExperienceItem {
  title: string
  organization: string
  location?: string
  period: string
  duration?: string
  type?: string
  description: string
  highlights: string[]
  supervisor?: string
  supervisors?: {
    academic?: string
    industry?: string
  }
  skills?: string[]
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
          {exp.period.includes('Present') && (
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
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <CardTitle className="text-xl mb-1">{exp.title}</CardTitle>
                  {exp.type && (
                    <Badge variant="secondary" className="text-xs">
                      {exp.type}
                    </Badge>
                  )}
                </div>
                <CardDescription className="text-base font-medium">{exp.organization}</CardDescription>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} />
                    <span>{exp.period}</span>
                    {exp.duration && <span className="text-muted-foreground/70">· {exp.duration}</span>}
                  </div>
                  {exp.location && (
                    <div className="flex items-center gap-1.5">
                      <MapPin size={14} />
                      <span>{exp.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground/80">{exp.description}</p>
            
            {exp.supervisor && (
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Principal Supervisor:</span> {exp.supervisor}
              </p>
            )}
            
            {exp.supervisors && (
              <div className="text-sm text-muted-foreground space-y-1">
                {exp.supervisors.academic && (
                  <p><span className="font-medium">Academic Supervisor:</span> {exp.supervisors.academic}</p>
                )}
                {exp.supervisors.industry && (
                  <p><span className="font-medium">Industry Supervisor:</span> {exp.supervisors.industry}</p>
                )}
              </div>
            )}
            
            {exp.skills && exp.skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-foreground/70">Skills:</span>
                {exp.skills.map((skill, sIdx) => (
                  <Badge key={sIdx} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            )}
            
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
