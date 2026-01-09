# HomePage Backend Implementation

## Overview
This document describes the complete backend implementation for the HomePage, including models, controllers, routes, and seeding scripts.

## Database Schema

### HomePage Model (`models/HomePage.js`)

The HomePage model stores all dynamic content for the home page:

```javascript
{
  // Hero Section
  heroSection: {
    images: [{ url, publicId, alt }],
    title, subtitle, description, ctaText, ctaLink
  },
  
  // Videos Section - "Welcome to the World aslam marble suppliers"
  videosSection: {
    heading: String,
    videos: [{ url, publicId, resourceType }]
  },
  
  // Before and After Section
  beforeAfterSection: {
    heading: String,
    description: String,
    beforeImage: { url, publicId, alt },
    afterImage: { url, publicId, alt }
  },
  
  // Completed Custom Projects Section
  completedProjectsSection: {
    heading: String,
    backgroundImage: { url, publicId, alt },
    stats: { projects, cities, yearsExperience }
  },
  
  // Other sections...
}
```

## API Endpoints

### Public Routes

#### GET `/api/home-page`
Fetches the active HomePage data.

**Response:**
```json
{
  "success": true,
  "data": { /* HomePage object */ }
}
```

### Admin Routes (Requires Authentication)

#### POST `/api/home-page`
Updates general HomePage data.

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "heroSection": { /* hero data */ },
  "stats": { /* stats data */ }
}
```

#### POST `/api/home-page/videos`
Uploads a video to the videos section.

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "videoFile": "data:video/mp4;base64,..." // Base64 encoded video
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "heading": "Welcome to the World aslam marble suppliers",
    "videos": [{ "url": "...", "publicId": "...", "resourceType": "video" }]
  }
}
```

#### DELETE `/api/home-page/videos/:publicId`
Deletes a video from the videos section.

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response:**
```json
{
  "success": true,
  "message": "Video deleted successfully"
}
```

#### POST `/api/home-page/before-after`
Updates before/after images.

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "beforeImage": "data:image/jpeg;base64,...",
  "afterImage": "data:image/png;base64,...",
  "heading": "Before and After",
  "description": "Witness the transformation..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "heading": "Before and After",
    "description": "...",
    "beforeImage": { "url": "...", "publicId": "...", "alt": "Before Image" },
    "afterImage": { "url": "...", "publicId": "...", "alt": "After Image" }
  }
}
```

#### POST `/api/home-page/completed-projects`
Updates the completed projects section.

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "backgroundImage": "data:image/jpeg;base64,...",
  "heading": "COMPLETED CUSTOM PROJECTS",
  "stats": {
    "projects": 950,
    "cities": 350,
    "yearsExperience": 25
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "heading": "COMPLETED CUSTOM PROJECTS",
    "backgroundImage": { "url": "...", "publicId": "...", "alt": "..." },
    "stats": { "projects": 950, "cities": 350, "yearsExperience": 25 }
  }
}
```

## Cloudinary Integration

All media files (videos and images) are stored on Cloudinary:

### Folder Structure
```
home-page/
├── hero/          # Hero section images
├── videos/        # Homepage videos
├── before-after/  # Before and after comparison images
├── completed-projects/  # Completed projects background image
└── about/         # About section images
```

### Video Upload Configuration
```javascript
{
  folder: 'home-page/videos',
  resource_type: 'video',
  chunk_size: 6000000 // 6MB chunks for large videos
}
```

## Seeding the Database

### Running the Seed Script

To populate the database with initial data:

```bash
cd backend
node scripts/seedHomePage.js
```

### What the Seed Script Does

1. **Uploads Videos to Cloudinary**
   - Reads video files from `my-project/src/assets/video/videos/`
   - Uploads each video to Cloudinary
   - Stores Cloudinary URLs in the database

2. **Uploads Before/After Images**
   - Reads images from `my-project/src/assets/ourcreation/pooja room/before&after/`
   - Uploads to Cloudinary
   - Stores URLs in the database

3. **Sets Default Values**
   - Completed projects background image (already on Cloudinary)
   - Statistics (950 projects, 350 cities, 25 years)
   - Default headings and descriptions

### Seed Script Output
```
Connected to MongoDB
Starting HomePage seeding...
Uploading videos to Cloudinary...
Uploading video 1/3...
Video 1 uploaded successfully
Uploading video 2/3...
Video 2 uploaded successfully
Uploading video 3/3...
Video 3 uploaded successfully
Uploading before/after images to Cloudinary...
Before image uploaded successfully
After image uploaded successfully
HomePage seeded successfully!
- Uploaded 3 videos
- Before image: Uploaded
- After image: Uploaded
```

## Frontend Integration

### Utility Functions (`utils/homePageUtils.js`)

```javascript
import { fetchHomePageData } from '../utils/homePageUtils'

// Fetch HomePage data
const data = await fetchHomePageData()

// Admin functions (require authentication token)
await updateHomePageData(data, token)
await uploadHomePageVideo(videoFile, token)
await deleteHomePageVideo(publicId, token)
await updateBeforeAfterImages({ beforeImage, afterImage }, token)
await updateCompletedProjects({ backgroundImage, stats }, token)
```

### Component Updates

#### HomeVideosSection
- Fetches videos from backend API
- Falls back to local videos if API fails
- Shows loading state while fetching

#### HomePage
- Fetches all HomePage data on mount
- Dynamically renders:
  - Completed projects section (background image + stats)
  - Before/after section (images + text)
  - Videos section (handled by HomeVideosSection)

## File Structure

```
backend/
├── models/
│   └── HomePage.js                    # HomePage schema
├── controllers/
│   └── homePageController.js          # CRUD operations
├── routes/
│   └── homePageRoutes.js              # API routes
└── scripts/
    └── seedHomePage.js                # Database seeding

frontend/
├── src/
│   ├── utils/
│   │   └── homePageUtils.js           # API utility functions
│   ├── components/
│   │   └── home/
│   │       └── HomeVideosSection.jsx  # Videos component
│   └── modules/
│       └── user/
│           └── pages/
│               └── HomePage.jsx        # Main page component
```

## Environment Variables

Ensure these are set in `backend/.env`:

```env
MONGODB_URI=mongodb://...
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Testing

### Test the API

1. **Get HomePage Data:**
```bash
curl http://localhost:5000/api/home-page
```

2. **Upload Video (Admin):**
```bash
curl -X POST http://localhost:5000/api/home-page/videos \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"videoFile": "data:video/mp4;base64,..."}'
```

3. **Update Before/After Images (Admin):**
```bash
curl -X POST http://localhost:5000/api/home-page/before-after \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"beforeImage": "data:image/jpeg;base64,...", "afterImage": "data:image/png;base64,..."}'
```

## Notes

- All images and videos are stored on Cloudinary, not locally
- The database only stores URLs and public IDs
- Old images/videos are automatically deleted from Cloudinary when replaced
- The frontend has fallback values if the API fails
- Videos are uploaded in chunks (6MB) to handle large files
- All admin routes require authentication

## Future Enhancements

1. Add video thumbnail generation
2. Implement video compression before upload
3. Add image optimization (automatic format conversion, resizing)
4. Add caching for frequently accessed data
5. Implement CDN for faster content delivery
