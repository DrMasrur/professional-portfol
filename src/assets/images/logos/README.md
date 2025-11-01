# Institution Logos

This directory contains logo files for various institutions (universities, companies, etc.) used throughout the portfolio.

## Adding New Logos

1. Place your logo file (SVG, PNG, or JPG) in this directory
2. Update the corresponding entry in `/src/data/profile.json`
3. Add the `logo` field with the path: `/src/assets/images/logos/your-logo.svg`

## Example

```json
{
  "degree": "PhD in Applied Artificial Intelligence",
  "institution": "University of Southern Queensland, Australia",
  "period": "2019 – 2022",
  "thesis": "...",
  "logo": "/src/assets/images/logos/usq.svg"
}
```

## Current Logos

- `usq.svg` - University of Southern Queensland
- `sust.svg` - Shahjalal University of Science & Technology
- `unimelb.svg` - University of Melbourne
- `nsw-dcceew.svg` - NSW Department of Climate Change, Energy, the Environment and Water
- `cs-energy.svg` - CS Energy
- `leading-university.svg` - Leading University

## Recommended Logo Specifications

- **Format**: SVG (preferred) or PNG with transparent background
- **Size**: Square aspect ratio (e.g., 100x100px)
- **File size**: Keep under 50KB for optimal performance
- **Colors**: Use official brand colors when possible

## Replacing Placeholder Logos

The current logos are simple placeholders. To use official institution logos:

1. Obtain the logo from the institution's official brand guidelines
2. Ensure you have permission to use the logo
3. Replace the corresponding file in this directory
4. Test the appearance in both the Education and Experience sections
