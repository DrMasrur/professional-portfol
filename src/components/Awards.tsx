import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Trophy } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface AwardsProps {
  awards: string[]
}

export function Awards({ awards }: AwardsProps) {
  return (
    <div>
      <motion.h2 
        className="text-3xl md:text-4xl font-semibold text-foreground mb-8 font-[family-name:var(--font-heading)]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Honours & Awards
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
      >
        <Card className="border-2 hover:shadow-xl transition-all">
          <CardHeader>
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
              >
                <Trophy className="text-accent" size={24} />
              </motion.div>
              <CardTitle>Recognition & Achievements</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {awards.map((award, idx) => (
                <motion.div 
                  key={idx} 
                  className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-default"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, x: 4 }}
                >
                  <Trophy className="text-accent mt-0.5 flex-shrink-0" size={20} />
                  <span className="text-sm text-foreground/80">{award}</span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
