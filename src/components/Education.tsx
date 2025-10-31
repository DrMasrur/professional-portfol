import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { GraduationCap } from '@phosphor-icons/react'

interface EducationItem {
  degree: string
  institution: string
  period: string
  thesis: string
}

interface EducationProps {
  data: EducationItem[]
}

export function Education({ data }: EducationProps) {
  return (
    <div className="space-y-6">
      {data.map((edu, idx) => (
        <Card key={idx} className="relative overflow-hidden hover:shadow-lg transition-all">
          {idx === 0 && (
            <div className="absolute top-0 right-0 bg-accent text-accent-foreground px-3 py-1 text-xs font-medium rounded-bl-lg">
              Latest
            </div>
          )}
          <CardHeader>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <GraduationCap className="text-primary" size={24} />
              </div>
              <div className="flex-1">
                <CardTitle className="text-xl mb-1">{edu.degree}</CardTitle>
                <CardDescription className="text-base">{edu.institution}</CardDescription>
                <p className="text-sm text-muted-foreground mt-1">{edu.period}</p>
              </div>
            </div>
          </CardHeader>
          {edu.thesis && (
            <CardContent>
              <p className="text-sm text-foreground/70">
                <span className="font-medium">Thesis:</span> {edu.thesis}
              </p>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  )
}
