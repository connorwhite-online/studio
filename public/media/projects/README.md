# Project Assets

This folder contains all assets for project showcases.

## Structure

Each project has its own folder named after the project ID (e.g., `tyb-onboarding`, `sqft-platform`).

### Required Assets per Project

Each project folder should contain:

- **cover.png** - 500px × 300px cover image with 16px border radius
- **logo.png** - 30px × 30px logo with 8px border radius
- Additional project-specific images as needed

## Asset Guidelines

### Cover Images
- Dimensions: 500px wide × 300px tall
- Format: PNG or JPG
- Border radius: 16px (applied in CSS)
- File name: `cover.png` or `cover.jpg`

### Logos
- Dimensions: 30px × 30px
- Format: PNG (with transparency if needed)
- Border radius: 8px (applied in CSS)
- File name: `logo.png`

### Additional Images
- Name descriptively (e.g., `feature-dashboard.png`, `mobile-view.jpg`)
- Optimize for web (compress images)
- Use consistent naming conventions

## Current Projects

1. **tyb-onboarding** - Track Your Budget Onboarding Experience
2. **sqft-platform** - SQFT Real Estate Platform
3. **webgl-gallery** - Interactive 3D WebGL Gallery

## Adding a New Project

1. Create a new folder with the project ID: `/public/media/projects/[project-id]/`
2. Add the required assets (cover.png, logo.png)
3. Update `/app/data/projects.ts` with the new project data
4. Create a new component in `/app/components/projects/[project-id].tsx`
5. Update the `getProjectContent` function in `/app/components/ProjectOverlay/index.tsx`

