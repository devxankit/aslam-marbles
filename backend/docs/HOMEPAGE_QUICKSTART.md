# HomePage Backend - Quick Start Guide

## What Was Created

### Backend Files
1. **Model**: `backend/models/HomePage.js` - Enhanced with videos, before/after, and completed projects sections
2. **Controller**: `backend/controllers/homePageController.js` - Added video upload/delete, before/after, and completed projects endpoints
3. **Routes**: `backend/routes/homePageRoutes.js` - Updated with new API endpoints
4. **Seed Script**: `backend/scripts/seedHomePage.js` - Uploads videos/images to Cloudinary and populates database

### Frontend Files
1. **Utils**: `my-project/src/utils/homePageUtils.js` - API utility functions
2. **Component**: `my-project/src/components/home/HomeVideosSection.jsx` - Updated to fetch videos from backend
3. **Page**: `my-project/src/modules/user/pages/HomePage.jsx` - Updated to fetch and display dynamic data

## Quick Setup

### 1. Run the Seed Script
```bash
cd backend
node scripts/seedHomePage.js
```

This will:
- Upload 3 videos from `my-project/src/assets/video/videos/` to Cloudinary
- Upload before/after images to Cloudinary
- Create the HomePage document in MongoDB with all data

### 2. Verify the Data
```bash
# Test the API endpoint
curl http://localhost:5000/api/home-page
```

### 3. Frontend Should Auto-Update
The frontend components will automatically fetch data from the backend and display:
- Videos from Cloudinary (instead of local files)
- Before/After images from Cloudinary
- Completed Projects section with dynamic stats

## API Endpoints Summary

### Public
- `GET /api/home-page` - Get all HomePage data

### Admin (Requires Auth Token)
- `POST /api/home-page` - Update general HomePage data
- `POST /api/home-page/videos` - Upload a video
- `DELETE /api/home-page/videos/:publicId` - Delete a video
- `POST /api/home-page/before-after` - Update before/after images
- `POST /api/home-page/completed-projects` - Update completed projects section

## What's Stored on Cloudinary

All media files are stored on Cloudinary in these folders:
- `home-page/videos/` - Homepage videos (3 videos)
- `home-page/before-after/` - Before and after comparison images
- `home-page/completed-projects/` - Background image for completed projects section
- `home-page/hero/` - Hero section images (if added later)

## Database Structure

```javascript
{
  videosSection: {
    heading: "Welcome to the World aslam marble suppliers",
    videos: [
      { url: "cloudinary_url", publicId: "...", resourceType: "video" }
    ]
  },
  beforeAfterSection: {
    heading: "Before and After",
    description: "Witness the transformation...",
    beforeImage: { url: "cloudinary_url", publicId: "...", alt: "Before Image" },
    afterImage: { url: "cloudinary_url", publicId: "...", alt: "After Image" }
  },
  completedProjectsSection: {
    heading: "COMPLETED CUSTOM PROJECTS",
    backgroundImage: { url: "cloudinary_url", publicId: "...", alt: "..." },
    stats: { projects: 950, cities: 350, yearsExperience: 25 }
  }
}
```

## Troubleshooting

### Videos not showing?
1. Check if seed script ran successfully
2. Verify Cloudinary credentials in `.env`
3. Check browser console for errors
4. Verify API endpoint: `http://localhost:5000/api/home-page`

### Images not loading?
1. Check Cloudinary URLs in database
2. Verify CORS settings allow Cloudinary domain
3. Check network tab in browser dev tools

### Seed script fails?
1. Verify video files exist in `my-project/src/assets/video/videos/`
2. Check Cloudinary credentials
3. Ensure MongoDB is running
4. Check file paths in seed script

## Next Steps

1. Run the seed script to populate the database
2. Refresh the frontend to see dynamic content
3. (Optional) Create admin panel to manage HomePage content
4. (Optional) Add more sections to the HomePage model

For detailed documentation, see `README_HOMEPAGE.md`
