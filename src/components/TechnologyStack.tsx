import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'

export function TechnologyStack() {
  const technologies = [
    {
      category: 'Deep Learning',
      color: 'bg-purple-500',
      items: ['LSTM', 'GRU', 'CNN-LSTM', 'Hybrid Models', 'Neural Networks']
    },
    {
      category: 'Machine Learning',
      color: 'bg-green-500',
      items: ['Random Forest', 'SVR', 'MARS', 'Ensemble Methods', 'Feature Selection']
    },
    {
      category: 'Air Quality & Climate',
      color: 'bg-blue-500',
      items: ['AQI Forecasting', 'Emission Modeling', 'Climate Extremes', 'Bias Correction']
    },
    {
      category: 'Frameworks & Tools',
      color: 'bg-orange-500',
      items: ['TensorFlow', 'PyTorch', 'Python', 'R', 'AWS', 'Azure']
    }
  ]

  return (
    <section className="py-12 md:py-16">
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 font-[family-name:var(--font-heading)]">
          Technology & Methods
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Cutting-edge tools and techniques for environmental AI research
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {technologies.map((tech, idx) => (
          <Card key={idx} className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-3 h-3 rounded-full ${tech.color}`} />
                <h3 className="font-semibold text-foreground text-sm">
                  {tech.category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {tech.items.map((item, itemIdx) => (
                  <Badge 
                    key={itemIdx} 
                    variant="secondary" 
                    className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
