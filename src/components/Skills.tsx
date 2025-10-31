import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Code, Wrench, Globe, GraduationCap } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

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
  const skillCategories = [
    { icon: Code, title: 'Programming Languages', items: skills.programming },
    { icon: Code, title: 'Frameworks & Libraries', items: skills.frameworks },
    { icon: Wrench, title: 'Tools & Platforms', items: skills.tools },
    { icon: Globe, title: 'Languages', items: skills.languages }
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((category, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="hover:shadow-lg transition-all h-full">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <category.icon className="text-primary" size={20} />
                  </motion.div>
                  <CardTitle>{category.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item, itemIdx) => (
                    <motion.div
                      key={itemIdx}
                      whileHover={{ scale: 1.1, rotate: 2 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Badge variant="secondary" className="text-sm hover:bg-primary hover:text-primary-foreground transition-colors">
                        {item}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <Card className="hover:shadow-lg transition-all">
          <CardHeader>
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
              >
                <GraduationCap className="text-primary" size={20} />
              </motion.div>
              <CardTitle>Professional Memberships</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {memberships.map((membership, idx) => (
                <motion.li 
                  key={idx} 
                  className="flex items-start gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 4 }}
                >
                  <span className="text-accent mt-1">•</span>
                  <span className="text-sm text-foreground/80">{membership}</span>
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      {training.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Card className="hover:shadow-lg transition-all">
            <CardHeader>
              <div className="flex items-center gap-2">
                <GraduationCap className="text-primary" size={20} />
                <CardTitle>Training & Certifications</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {training.map((course, idx) => (
                  <motion.div 
                    key={idx} 
                    className="border-l-2 border-accent pl-4 hover:border-primary transition-colors"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 4 }}
                  >
                    <h4 className="font-medium text-foreground">{course.name}</h4>
                    {course.organizer && (
                      <p className="text-sm text-muted-foreground">{course.organizer}</p>
                    )}
                    {course.date && (
                      <p className="text-xs text-muted-foreground mt-1">{course.date}</p>
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
