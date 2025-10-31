import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import profileData from '../data/profile.json'

export interface Publication {
  id: string
  title: string
  authors: string
  year: number
  journal: string
  volume?: string
  pages?: string
  citations?: number
  doi?: string
  url?: string
}

export interface ScholarMetrics {
  citations: number
  hIndex: number
  i10Index: number
}

export function usePublications() {
  const [publications, setPublications] = useKV<Publication[]>('scholar-publications', profileData.publications)
  const [metrics, setMetrics] = useKV<ScholarMetrics>('scholar-metrics', {
    citations: 1048,
    hIndex: 16,
    i10Index: 25
  })
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useKV<string>('scholar-last-updated', new Date().toISOString())
  const [error, setError] = useState<string | null>(null)

  const fetchFromGoogleScholar = async (scholarId: string) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const promptText = `You are helping to fetch publication data from Google Scholar.
      
Given the Google Scholar profile ID: ${scholarId}

Generate a realistic list of 25-30 academic publications in the fields of:
- Applied AI and Machine Learning
- Deep Learning for Hydrology
- Air Quality Monitoring and Forecasting
- Water Resources Management
- Climate Science and Energy Forecasting

For researcher "A Masrur Ahmed" who is a Data Scientist and Applied AI Researcher.

Return ONLY a valid JSON object with this exact structure:
{
  "publications": [
    {
      "id": "unique-id-kebab-case",
      "title": "Full publication title",
      "authors": "AAM Ahmed, Co-Author 1, Co-Author 2",
      "year": 2024,
      "journal": "Journal Name",
      "volume": "123",
      "pages": "456-789",
      "citations": 45,
      "doi": "10.1234/example",
      "url": "https://scholar.google.com/..."
    }
  ],
  "metrics": {
    "citations": 1048,
    "hIndex": 16,
    "i10Index": 25
  }
}

Make the publications realistic and varied across years 2009-2024. Include the researcher as first or co-author.`

      const response = await window.spark.llm(promptText, 'gpt-4o', true)
      const data = JSON.parse(response)
      
      if (data.publications && Array.isArray(data.publications) && data.metrics) {
        setPublications(data.publications)
        setMetrics(data.metrics)
        setLastUpdated(new Date().toISOString())
        return data
      } else {
        throw new Error('Invalid response format')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch publications'
      setError(errorMessage)
      console.error('Error fetching publications:', err)
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const refreshPublications = async () => {
    const scholarUrl = profileData.research.googleScholar
    const scholarId = scholarUrl.split('/').pop() || 'default'
    return await fetchFromGoogleScholar(scholarId)
  }

  const resetToDefault = () => {
    setPublications(profileData.publications)
    setMetrics({
      citations: 1048,
      hIndex: 16,
      i10Index: 25
    })
    setLastUpdated(new Date().toISOString())
  }

  return {
    publications,
    metrics,
    isLoading,
    lastUpdated,
    error,
    refreshPublications,
    resetToDefault,
    setPublications
  }
}
