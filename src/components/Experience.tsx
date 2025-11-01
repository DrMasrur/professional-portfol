import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Briefcase, MapPin, Clock, Buildings } from '@phosphor-icons/react'
import { Badge } from './ui/badge'
import { motion } from 'framer-motion'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible'

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

interface GroupedExperience {
  organization: string
  location?: string
  roles: ExperienceItem[]
  overallPeriod: string
  totalDuration: string
}

function calculateTotalDuration(roles: ExperienceItem[]): string {
  let totalMonths = 0
  roles.forEach(role => {
    if (role.duration) {
      const match = role.duration.match(/(\d+)\s*yrs?\s*(\d+)?\s*mos?|(\d+)\s*mos?|(\d+)\s*yrs?/)
      if (match) {
        const years = parseInt(match[1] || match[4] || '0')
        const months = parseInt(match[2] || match[3] || '0')
        totalMonths += (years * 12) + months
      }
    }
  })
  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12
  if (years > 0 && months > 0) {
    return `${years} yr${years > 1 ? 's' : ''} ${months} mo${months > 1 ? 's' : ''}`
  } else if (years > 0) {
    return `${years} yr${years > 1 ? 's' : ''}`
  } else {
    return `${months} mo${months > 1 ? 's' : ''}`
  }
}

function getOverallPeriod(roles: ExperienceItem[]): string {
  const sortedRoles = [...roles].sort((a, b) => {
    const aStart = a.period.split('–')[0].trim()
    const bStart = b.period.split('–')[0].trim()
    return aStart.localeCompare(bStart)
  })
  const firstPeriod = sortedRoles[0].period.split('–')[0].trim()
  const lastPeriod = sortedRoles[sortedRoles.length - 1].period.split('–')[1]?.trim() || sortedRoles[sortedRoles.length - 1].period
  return `${firstPeriod} – ${lastPeriod}`
}

export function Experience({ data }: ExperienceProps) {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({})
  
  const groupedData: (ExperienceItem | GroupedExperience)[] = []
  const organizationMap = new Map<string, ExperienceItem[]>()
  
  if (data && Array.isArray(data)) {
    data.forEach(exp => {
      if (!organizationMap.has(exp.organization)) {
        organizationMap.set(exp.organization, [])
      }
      organizationMap.get(exp.organization)!.push(exp)
    })
    
    organizationMap.forEach((roles, org) => {
      if (roles.length > 1) {
        groupedData.push({
          organization: org,
          location: roles[0].location,
          roles: roles,
          overallPeriod: getOverallPeriod(roles),
          totalDuration: calculateTotalDuration(roles)
        })
      } else {
        groupedData.push(roles[0])
      }
    })
  }
  
  const toggleGroup = (org: string) => {
    setOpenGroups(prev => ({ ...prev, [org]: !prev[org] }))
  }
  
  return (
    <div className="relative space-y-6">
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary hidden md:block" />
      
      {groupedData.map((item, idx) => {
        const isGrouped = 'roles' in item
        
        if (isGrouped) {
          const group = item as GroupedExperience
          const isOpen = openGroups[group.organization] ?? false
          
          return (
            <motion.div
              key={`group-${idx}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="relative hover:shadow-xl transition-all md:ml-16 group">
                <motion.div 
                  className="absolute -left-16 top-8 hidden md:flex items-center justify-center w-12 h-12 bg-secondary rounded-full ring-4 ring-background"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Buildings className="text-secondary-foreground" size={20} />
                </motion.div>
                <Collapsible open={isOpen} onOpenChange={() => toggleGroup(group.organization)}>
                  <CollapsibleTrigger className="w-full">
                    <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors rounded-t-lg">
                      <div className="flex items-start gap-4 md:gap-0">
                        <motion.div 
                          className="md:hidden p-3 bg-secondary/10 rounded-lg"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <Buildings className="text-secondary" size={20} />
                        </motion.div>
                        <div className="flex-1 text-left">
                          <div className="flex items-start justify-between gap-2 flex-wrap">
                            <CardTitle className="text-xl mb-1 group-hover:text-secondary transition-colors">
                              {group.organization}
                            </CardTitle>
                            <Badge variant="secondary" className="text-xs">
                              {group.roles.length} Roles
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                              <Clock size={14} />
                              <span>{group.overallPeriod}</span>
                              <span className="text-muted-foreground/70">· {group.totalDuration}</span>
                            </div>
                            {group.location && (
                              <div className="flex items-center gap-1.5">
                                <MapPin size={14} />
                                <span>{group.location}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="pt-0 space-y-4">
                      {group.roles.map((role, roleIdx) => (
                        <motion.div
                          key={roleIdx}
                          className="relative border-l-2 border-accent/30 pl-4 py-3 hover:border-accent transition-colors"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: roleIdx * 0.05 }}
                        >
                          <div className="absolute -left-2 top-5 w-3 h-3 rounded-full bg-accent" />
                          <div className="flex items-start justify-between gap-2 flex-wrap mb-2">
                            <h4 className="font-semibold text-foreground">{role.title}</h4>
                            {role.type && (
                              <Badge variant="outline" className="text-xs">
                                {role.type}
                              </Badge>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mb-2">
                            <div className="flex items-center gap-1.5">
                              <Clock size={14} />
                              <span>{role.period}</span>
                              {role.duration && <span className="text-muted-foreground/70">· {role.duration}</span>}
                            </div>
                          </div>
                          {role.description && (
                            <p className="text-sm text-foreground/70 mb-2">{role.description}</p>
                          )}
                          {role.highlights.length > 0 && (
                            <ul className="space-y-1 mt-2">
                              {role.highlights.map((highlight, hIdx) => (
                                <li key={hIdx} className="flex items-start gap-2 text-sm text-foreground/60">
                                  <span className="text-accent mt-0.5">•</span>
                                  <span>{highlight}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </motion.div>
                      ))}
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            </motion.div>
          )
        } else {
          const exp = item as ExperienceItem
          return (
            <motion.div
              key={`single-${idx}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="relative hover:shadow-xl transition-all md:ml-16 hover:scale-[1.02] group">
                {exp.period.includes('Present') && (
                  <motion.div 
                    className="absolute top-0 right-0 bg-accent text-accent-foreground px-3 py-1 text-xs font-medium rounded-bl-lg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    Current
                  </motion.div>
                )}
                <motion.div 
                  className="absolute -left-16 top-8 hidden md:flex items-center justify-center w-12 h-12 bg-primary rounded-full ring-4 ring-background"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Briefcase className="text-primary-foreground" size={20} />
                </motion.div>
                <CardHeader>
                  <div className="flex items-start gap-4 md:gap-0">
                    <motion.div 
                      className="md:hidden p-3 bg-primary/10 rounded-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Briefcase className="text-primary" size={20} />
                    </motion.div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <CardTitle className="text-xl mb-1 group-hover:text-primary transition-colors">{exp.title}</CardTitle>
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
                        <motion.div
                          key={sIdx}
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <Badge variant="outline" className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors">
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  )}
                  
                  {exp.highlights.length > 0 && (
                    <ul className="space-y-2">
                      {exp.highlights.map((highlight, hIdx) => (
                        <motion.li 
                          key={hIdx} 
                          className="flex items-start gap-2 text-sm text-foreground/70"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: hIdx * 0.05 }}
                          viewport={{ once: true }}
                        >
                          <span className="text-accent mt-0.5">•</span>
                          <span>{highlight}</span>
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )
        }
      })}
    </div>
  )
}
