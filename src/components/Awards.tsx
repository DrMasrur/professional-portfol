import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Trophy } from '@phosphor-icons/react'

interface AwardsProps {
  awards: string[]
}

export function Awards({ awards }: AwardsProps) {
  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-8 font-[family-name:var(--font-heading)]">
        Honours & Awards
      </h2>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Trophy className="text-accent" size={24} />
            <CardTitle>Recognition & Achievements</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {awards.map((award, idx) => (
              <div 
                key={idx} 
                className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <Trophy className="text-accent mt-0.5 flex-shrink-0" size={20} />
                <span className="text-sm text-foreground/80">{award}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
