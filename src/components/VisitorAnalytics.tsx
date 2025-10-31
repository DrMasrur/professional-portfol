import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Globe, MapPin, Eye, TrendUp, Users, Clock } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { useKV } from '@github/spark/hooks'

interface VisitorData {
  id: string
  timestamp: number
  location?: {
    country?: string
    city?: string
    region?: string
  }
  referrer?: string
  userAgent?: string
}

interface LocationStats {
  country: string
  count: number
}

export function VisitorAnalytics() {
  const [visitors, setVisitors] = useKV<VisitorData[]>('visitor-analytics', [])
  const [currentVisitor, setCurrentVisitor] = useState<VisitorData | null>(null)
  const [locationStats, setLocationStats] = useState<LocationStats[]>([])

  useEffect(() => {
    const detectVisitor = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/')
        const data = await response.json()
        
        const newVisitor: VisitorData = {
          id: crypto.randomUUID(),
          timestamp: Date.now(),
          location: {
            country: data.country_name || 'Unknown',
            city: data.city || 'Unknown',
            region: data.region || 'Unknown',
          },
          referrer: document.referrer || 'Direct',
          userAgent: navigator.userAgent,
        }

        setCurrentVisitor(newVisitor)
        
        setVisitors((current) => {
          const currentList = current || []
          const updated = [...currentList, newVisitor]
          const last30Days = Date.now() - 30 * 24 * 60 * 60 * 1000
          return updated.filter(v => v.timestamp > last30Days)
        })
      } catch (error) {
        const fallbackVisitor: VisitorData = {
          id: crypto.randomUUID(),
          timestamp: Date.now(),
          location: {
            country: 'Unknown',
            city: 'Unknown',
            region: 'Unknown',
          },
          referrer: document.referrer || 'Direct',
          userAgent: navigator.userAgent,
        }
        setCurrentVisitor(fallbackVisitor)
        setVisitors((current) => {
          const currentList = current || []
          return [...currentList, fallbackVisitor]
        })
      }
    }

    detectVisitor()
  }, [])

  useEffect(() => {
    if (visitors && visitors.length > 0) {
      const countryMap = new Map<string, number>()
      visitors.forEach((visitor) => {
        const country = visitor.location?.country || 'Unknown'
        countryMap.set(country, (countryMap.get(country) || 0) + 1)
      })

      const stats = Array.from(countryMap.entries())
        .map(([country, count]) => ({ country, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10)

      setLocationStats(stats)
    }
  }, [visitors])

  const totalVisitors = visitors?.length || 0
  const uniqueCountries = new Set(visitors?.map(v => v.location?.country) || []).size
  const last7Days = visitors?.filter(v => v.timestamp > Date.now() - 7 * 24 * 60 * 60 * 1000).length || 0
  const last24Hours = visitors?.filter(v => v.timestamp > Date.now() - 24 * 60 * 60 * 1000).length || 0

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div variants={itemVariants}>
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Visitors</CardTitle>
                <Users size={20} className="text-primary" weight="duotone" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{totalVisitors}</div>
              <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Countries</CardTitle>
                <Globe size={20} className="text-secondary" weight="duotone" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{uniqueCountries}</div>
              <p className="text-xs text-muted-foreground mt-1">Unique locations</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">This Week</CardTitle>
                <TrendUp size={20} className="text-accent" weight="duotone" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{last7Days}</div>
              <p className="text-xs text-muted-foreground mt-1">Last 7 days</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Today</CardTitle>
                <Clock size={20} className="text-chart-1" weight="duotone" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{last24Hours}</div>
              <p className="text-xs text-muted-foreground mt-1">Last 24 hours</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center gap-2">
                <MapPin size={24} className="text-primary" weight="duotone" />
                <div>
                  <CardTitle>Top Locations</CardTitle>
                  <CardDescription>Visitors by country</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {locationStats.length > 0 ? (
                  locationStats.map((stat, index) => (
                    <motion.div
                      key={stat.country}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                          {index + 1}
                        </div>
                        <span className="font-medium text-foreground">{stat.country}</span>
                      </div>
                      <Badge variant="secondary" className="font-semibold">
                        {stat.count} {stat.count === 1 ? 'visit' : 'visits'}
                      </Badge>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Eye size={48} className="mx-auto mb-2 opacity-50" weight="duotone" />
                    <p>No visitor data yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Eye size={24} className="text-secondary" weight="duotone" />
                <div>
                  <CardTitle>Current Session</CardTitle>
                  <CardDescription>Your visit information</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {currentVisitor ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border border-border">
                    <div className="flex items-start gap-3 mb-3">
                      <MapPin size={20} className="text-primary mt-0.5" weight="fill" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-muted-foreground">Location</p>
                        <p className="text-base font-semibold text-foreground">
                          {currentVisitor.location?.city}, {currentVisitor.location?.region}
                        </p>
                        <p className="text-sm text-muted-foreground">{currentVisitor.location?.country}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 mb-3">
                      <Globe size={20} className="text-secondary mt-0.5" weight="fill" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-muted-foreground">Referrer</p>
                        <p className="text-base font-semibold text-foreground break-all">
                          {currentVisitor.referrer}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Clock size={20} className="text-accent mt-0.5" weight="fill" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-muted-foreground">Visit Time</p>
                        <p className="text-base font-semibold text-foreground">
                          {new Date(currentVisitor.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
                    <p className="font-medium mb-1">Privacy Note:</p>
                    <p>Visitor data is stored locally in your browser and helps understand audience reach. No personal information is collected beyond basic location and referrer data.</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Users size={48} className="mx-auto mb-2 opacity-50" weight="duotone" />
                  <p>Detecting your location...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
