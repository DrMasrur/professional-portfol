# Google Scholar Integration Guide

## Overview

Your academic portfolio website now includes intelligent Google Scholar integration that automatically syncs your publications with AI-powered data extraction. Publications are stored locally and persist across sessions.

## Features

✅ **One-Click Sync**: Click the "Sync Scholar" button to fetch latest publications  
✅ **AI-Powered Extraction**: Uses GPT-4o to intelligently fetch and format publication data  
✅ **Persistent Storage**: Publications saved locally using Spark KV storage  
✅ **Real-time Updates**: Citation counts and metrics updated during sync  
✅ **Offline-First**: Publications available even without network connection  
✅ **Search & Filter**: Full-text search across all publication fields  

## How to Use

### Basic Usage

1. **Navigate to Publications Section**
   - Scroll down to the "Publications" section of the website
   - Or click "Publications" in the navigation menu

2. **Sync Your Publications**
   - Click the "Sync Scholar" button (with Google Scholar icon)
   - Wait for the sync to complete (typically 5-15 seconds)
   - Publications will automatically update with latest data

3. **View Sync Status**
   - Last sync timestamp displayed below the section title
   - Loading animation shows while syncing
   - Success/error notifications appear on completion

### Advanced Features

**Search Publications**
- Use the search box to filter by title, author, journal, or year
- Search works across all fields simultaneously
- Results update in real-time as you type

**Copy Citations**
- Hover over any publication card
- Click the copy icon that appears
- Citation formatted in standard academic style
- Automatically copied to clipboard

**Citation Counts**
- View citation metrics for each publication
- Displayed as badges on publication cards
- Updated each time you sync with Google Scholar

## Technical Details

### Data Storage

Publications are stored using the Spark KV (Key-Value) persistence API:
- **Key**: `scholar-publications`
- **Default**: Falls back to `profile.json` data if sync not performed
- **Format**: Array of publication objects with title, authors, year, journal, etc.

### Sync Process

1. Button click triggers `refreshPublications()` function
2. AI model (GPT-4o) extracts data from Google Scholar profile
3. Response parsed and validated
4. Publications saved to persistent storage
5. UI updates automatically with new data
6. Timestamp recorded for last sync

### Data Structure

Each publication contains:
```typescript
{
  id: string              // Unique identifier
  title: string           // Full publication title
  authors: string         // Comma-separated author list
  year: number           // Publication year
  journal: string        // Journal/venue name
  volume?: string        // Volume number (optional)
  pages?: string         // Page range (optional)
  citations?: number     // Citation count (optional)
  doi?: string          // DOI identifier (optional)
  url?: string          // Publication URL (optional)
}
```

## Customization

### Changing Google Scholar Profile

The Google Scholar profile URL is stored in `src/data/profile.json`:

```json
{
  "research": {
    "googleScholar": "https://bit.ly/3H9LeAl",
    "orcid": "0000-0002-7941-3902"
  }
}
```

Update the `googleScholar` URL to point to your own profile.

### Sync Frequency

Publications are synced on-demand only. To automate syncing:

1. Add a useEffect hook to periodically check for updates
2. Implement a background sync service
3. Set up GitHub Actions to trigger syncs

Example auto-sync (add to App.tsx):
```typescript
useEffect(() => {
  const lastSync = new Date(lastUpdated)
  const daysSinceSync = (Date.now() - lastSync.getTime()) / (1000 * 60 * 60 * 24)
  
  if (daysSinceSync > 7) {
    // Auto-sync if more than 7 days old
    refreshPublications()
  }
}, [])
```

## Troubleshooting

**Sync Failed Error**
- Check your internet connection
- Verify Google Scholar URL is correct in profile.json
- Try again in a few seconds (rate limiting)

**Publications Not Updating**
- Clear browser cache and refresh
- Check browser console for errors
- Verify KV storage is working (check DevTools → Application → Storage)

**Wrong Publications Loaded**
- Click "Sync Scholar" to refresh from your profile
- Ensure correct Google Scholar URL in profile.json
- Check that profile is public and accessible

## Privacy & Security

- No authentication required
- No data sent to external servers (except OpenAI for AI processing)
- Publications stored locally in browser
- Google Scholar profile must be public to sync
- No personal data collected or tracked

## Support

For issues or questions:
1. Check the browser console for error messages
2. Verify profile.json is properly formatted
3. Ensure Google Scholar profile is accessible
4. Try clearing KV storage and re-syncing

## Future Enhancements

Potential improvements for future versions:
- [ ] Background auto-sync every N days
- [ ] Import from ORCID, ResearchGate, etc.
- [ ] Export publications to BibTeX/RIS
- [ ] Publication analytics and trends
- [ ] Collaboration network visualization
- [ ] Alert notifications for new citations
