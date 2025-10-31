import { useState } from 'react'
import { Card, CardContent, CardHeader } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { motion, AnimatePresence } from 'framer-motion'
import { MagnifyingGlass, ArrowSquareOut, Calendar, Clock } from '@phosphor-icons/react'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  readTime: string
  tags: string[]
  link?: string
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Deep Learning Applications in Climate Science',
    excerpt: 'Exploring how deep learning models are revolutionizing climate prediction and environmental monitoring.',
    date: '2024-01-15',
    readTime: '8 min',
    tags: ['AI', 'Climate', 'Deep Learning'],
    link: '#'
  },
  {
    id: '2',
    title: 'Hybrid Models for Hydrological Forecasting',
    excerpt: 'A comprehensive guide to developing and implementing hybrid machine learning models for water resource prediction.',
    date: '2023-12-20',
    readTime: '12 min',
    tags: ['Hydrology', 'ML', 'Forecasting'],
    link: '#'
  },
  {
    id: '3',
    title: 'Bias Correction in Air Quality Modeling',
    excerpt: 'Techniques and methodologies for improving the accuracy of air quality predictions using advanced statistical methods.',
    date: '2023-11-10',
    readTime: '10 min',
    tags: ['Air Quality', 'Statistics', 'Modeling'],
    link: '#'
  },
  {
    id: '4',
    title: 'Machine Learning for Water Resources Management',
    excerpt: 'Practical applications of ML algorithms in sustainable water resources planning and management.',
    date: '2023-10-05',
    readTime: '9 min',
    tags: ['Water Resources', 'ML', 'Sustainability'],
    link: '#'
  },
  {
    id: '5',
    title: 'Understanding Climate Extremes with AI',
    excerpt: 'How artificial intelligence is helping us better understand and predict extreme weather events.',
    date: '2023-09-18',
    readTime: '7 min',
    tags: ['Climate', 'AI', 'Weather'],
    link: '#'
  }
]

export function Blogs() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)))

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = !searchQuery || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesTag = !selectedTag || post.tags.includes(selectedTag)
    
    return matchesSearch && matchesTag
  })

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="relative">
          <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedTag === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedTag(null)}
            className="h-7 text-xs"
          >
            All
          </Button>
          {allTags.map(tag => (
            <Button
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className="h-7 text-xs"
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredPosts.map((post, idx) => (
            <motion.div
              key={post.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, delay: idx * 0.02 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="hover:shadow-md transition-all group cursor-pointer hover:border-primary/50 relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={false}
                />
                <CardHeader className="p-4 pb-3 relative z-10">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-medium text-sm leading-snug group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <motion.div
                      whileHover={{ rotate: 45, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <ArrowSquareOut 
                        className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-0.5" 
                        size={16} 
                      />
                    </motion.div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0 space-y-3 relative z-10">
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs px-2 py-0 h-5">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardContent className="py-12 text-center text-sm text-muted-foreground">
                No blog posts found matching your search.
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}
