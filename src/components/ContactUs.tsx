import { useState } from 'react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { motion } from 'framer-motion'
import { EnvelopeSimple, LinkedinLogo, PaperPlaneTilt, CheckCircle } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface ContactInfo {
  phone: string
  email: string
  workEmail: string
  linkedin: string
}

interface ContactUsProps {
  contact: ContactInfo
}

export function ContactUs({ contact }: ContactUsProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    setIsSubmitted(true)
    toast.success('Message sent successfully!')
    
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' })
      setIsSubmitted(false)
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="space-y-4">
      <Card className="border-primary/20">
        <CardContent className="p-4 space-y-3">
          <div className="space-y-2">
            <motion.a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors group relative overflow-hidden"
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div 
                className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors relative z-10"
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <EnvelopeSimple size={18} className="text-primary" />
              </motion.div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">Personal Email</p>
                <p className="text-sm font-medium truncate">{contact.email}</p>
              </div>
            </motion.a>

            <motion.a
              href={`mailto:${contact.workEmail}`}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors group relative overflow-hidden"
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div 
                className="h-9 w-9 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors relative z-10"
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <EnvelopeSimple size={18} className="text-accent" />
              </motion.div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">Work Email</p>
                <p className="text-sm font-medium truncate">{contact.workEmail}</p>
              </div>
            </motion.a>

            <motion.a
              href={`https://${contact.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors group relative overflow-hidden"
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div 
                className="h-9 w-9 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors relative z-10"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <LinkedinLogo size={18} className="text-blue-600" weight="fill" />
              </motion.div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">LinkedIn</p>
                <p className="text-sm font-medium truncate">{contact.linkedin}</p>
              </div>
            </motion.a>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h3 className="font-medium text-sm mb-3">Quick Message</h3>
          
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
              >
                <CheckCircle size={48} className="text-green-600 mx-auto mb-3" weight="fill" />
              </motion.div>
              <p className="text-sm font-medium text-foreground">Message Sent!</p>
              <p className="text-xs text-muted-foreground mt-1">I'll get back to you soon.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <Input
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="h-9"
                />
              </div>
              
              <div>
                <Input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="h-9"
                />
              </div>
              
              <div>
                <Input
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="h-9"
                />
              </div>
              
              <div>
                <Textarea
                  name="message"
                  placeholder="Your message..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="min-h-[100px] resize-none"
                />
              </div>
              
              <Button type="submit" className="w-full" size="sm">
                <PaperPlaneTilt size={16} className="mr-2" />
                Send Message
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
