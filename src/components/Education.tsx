import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { GraduationCap } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface EducationItem {
  degree: string
  institution: string
  period: string
  thesis: string
  logo?: string
}

interface EducationProps {
  data: EducationItem[]
}

export function Education({ data }: EducationProps) {
  return (
    <div className="space-y-6">
      {data.map((edu, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          viewport={{ once: true }}
        >
          <Card className="relative overflow-hidden hover:shadow-xl transition-all group hover:scale-[1.01]">
            {idx === 0 && (
              <motion.div 
                className="absolute top-0 right-0 bg-accent text-accent-foreground px-3 py-1 text-xs font-medium rounded-bl-lg"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                Latest
              </motion.div>
            )}
            <CardHeader>
              <div className="flex items-start gap-4">
                <motion.div 
                  className="p-3 bg-primary/10 rounded-lg flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {edu.logo ? (
                    <img 
                      src={edu.logo} 
                      alt={`${edu.institution} logo`}
                      className="w-12 h-12 object-contain"
                    />
                  ) : (
                    <GraduationCap className="text-primary" size={24} />
                  )}
                </motion.div>
                <div className="flex-1">
                  <CardTitle className="text-xl mb-1 group-hover:text-primary transition-colors">{edu.degree}</CardTitle>
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
        </motion.div>
      ))}
    </div>
  )
}
