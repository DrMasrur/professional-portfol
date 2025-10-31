import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Code, Wrench, Globe, GraduationCap } from '@phosphor-icons/react'

interface SkillsProps {
  skills: {
    programming: string[]
    frameworks: string[]
    tools: string[]
    languages: string[]
  }
  memberships: string[]
  training: Array<{
    name: string
    organizer: string
    date: string
  }>
}

export function Skills({ skills, memberships, training }: SkillsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Code className="text-primary" size={20} />
              <CardTitle>Programming Languages</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {skills.programming.map((lang, idx) => (
                <Badge key={idx} variant="secondary" className="text-sm">
                  {lang}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Code className="text-primary" size={20} />
              <CardTitle>Frameworks & Libraries</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {skills.frameworks.map((fw, idx) => (
                <Badge key={idx} variant="secondary" className="text-sm">
                  {fw}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Wrench className="text-primary" size={20} />
              <CardTitle>Tools & Platforms</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {skills.tools.map((tool, idx) => (
                <Badge key={idx} variant="secondary" className="text-sm">
                  {tool}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="text-primary" size={20} />
              <CardTitle>Languages</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {skills.languages.map((lang, idx) => (
                <Badge key={idx} variant="secondary" className="text-sm">
                  {lang}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <GraduationCap className="text-primary" size={20} />
            <CardTitle>Professional Memberships</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {memberships.map((membership, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span className="text-sm text-foreground/80">{membership}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {training.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <GraduationCap className="text-primary" size={20} />
              <CardTitle>Training & Certifications</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {training.map((course, idx) => (
                <div key={idx} className="border-l-2 border-accent pl-4">
                  <h4 className="font-medium text-foreground">{course.name}</h4>
                  {course.organizer && (
                    <p className="text-sm text-muted-foreground">{course.organizer}</p>
                  )}
                  {course.date && (
                    <p className="text-xs text-muted-foreground mt-1">{course.date}</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
