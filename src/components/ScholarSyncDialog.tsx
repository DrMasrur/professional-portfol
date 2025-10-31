import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { GoogleLogo, CheckCircle, Info } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { useKV } from '@github/spark/hooks'

export function ScholarSyncDialog() {
  const [hasSeenDialog, setHasSeenDialog] = useKV<boolean>('scholar-sync-dialog-seen', false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!hasSeenDialog) {
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [hasSeenDialog])

  const handleClose = () => {
    setIsOpen(false)
    setHasSeenDialog(() => true)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center">
              <GoogleLogo size={24} weight="bold" className="text-white" />
            </div>
            Google Scholar Integration
          </DialogTitle>
          <DialogDescription className="text-base">
            Keep your publications automatically synced with your Google Scholar profile
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex items-start gap-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
            <Info size={24} className="text-primary flex-shrink-0 mt-0.5" weight="duotone" />
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">How it works</h4>
              <p className="text-sm text-muted-foreground">
                Click the "Sync Scholar" button in the Publications section to fetch the latest publications
                from Google Scholar using AI-powered data extraction. Your publications will be stored locally
                and persist across sessions.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <CheckCircle size={20} weight="duotone" className="text-secondary" />
              Key Features
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground ml-7">
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                <span>Automatically fetch new publications from your Google Scholar profile</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                <span>Citation counts and metrics updated in real-time</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                <span>Publications persist locally - no data loss between sessions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                <span>Manual refresh control - sync whenever you want</span>
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="mt-0.5">TIP</Badge>
              <p className="text-sm text-muted-foreground">
                Scroll down to the Publications section and click the 
                <span className="inline-flex items-center gap-1 mx-1 px-2 py-0.5 rounded bg-background border border-border text-xs font-medium">
                  <GoogleLogo size={14} weight="bold" />
                  Sync Scholar
                </span>
                button to try it now!
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleClose} className="w-full sm:w-auto">
            Got it, thanks!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
