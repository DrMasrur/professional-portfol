import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { ChartBar, GraduationCap } from '@phosphor-icons/react'

interface ResearchHighlightsProps {
  research: {
    orcid: string
    googleScholar: string
    metrics: {
      citations: number
      hIndex: number
      i10Index: number
    }
    roles: string[]
  }
  areas: string[]
  expertise: string[]
}

export function ResearchHighlights({ research, areas, expertise }: ResearchHighlightsProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-8 font-[family-name:var(--font-heading)]">
          Research Impact
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Citations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl md:text-5xl font-bold text-primary">{research.metrics.citations}</span>
                <ChartBar className="text-muted-foreground" size={24} />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">h-index</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl md:text-5xl font-bold text-primary">{research.metrics.hIndex}</span>
                <GraduationCap className="text-muted-foreground" size={24} />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">i10-index</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl md:text-5xl font-bold text-primary">{research.metrics.i10Index}</span>
                <ChartBar className="text-muted-foreground" size={24} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          <Button variant="outline" asChild>
            <a href={research.googleScholar} target="_blank" rel="noopener noreferrer">
              Google Scholar Profile
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href={`https://orcid.org/${research.orcid}`} target="_blank" rel="noopener noreferrer">
              ORCID: {research.orcid}
            </a>
          </Button>
        </div>

        {research.roles.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Editorial Roles</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {research.roles.map((role, idx) => (
                  <li key={idx} className="text-foreground/80">{role}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Research Areas</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {areas.map((area, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span className="text-sm text-foreground/80">{area}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Core Expertise</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {expertise.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span className="text-sm text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
