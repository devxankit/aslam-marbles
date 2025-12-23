# Artist Module - Complete Backend Implementation

## Overview
This module provides complete backend functionality for the "Our Artist" page, including image management through Cloudinary, database operations, and admin panel integration.

## Features
- ✅ **Dynamic Content Management**: Admin can update all page content
- ✅ **Cloudinary Integration**: Images are stored in Cloudinary for optimal performance
- ✅ **Hero Image Management**: Upload and manage main hero image
- ✅ **Gallery Management**: Add, update, delete gallery images
- ✅ **Content Sections**: Dynamic text sections with ordering
- ✅ **Visit Store Section**: Customizable call-to-action section
- ✅ **API Integration**: RESTful API endpoints for all operations
- ✅ **Admin Panel**: Complete management interface

## Database Schema

### Artist Model
```javascript
{
  heroImage: { url, publicId },
  title: String,
  description: String,
  galleryImages: [{ url, publicId, alt, order }],
  sections: [{ title, content, order }],
  visitStoreSection: {
    image: { url, publicId },
    buttonText: String,
    buttonLink: String
  },
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoints

### Public Routes
- `GET /api/artists` - Get artist page data

### Admin Routes (Protected)
- `PUT /api/artists` - Update basic information
- `POST /api/artists/hero-image` - Update hero image
- `POST /api/artists/gallery` - Add gallery image
- `PUT /api/artists/gallery/:imageId` - Update gallery image
- `DELETE /api/artists/gallery/:imageId` - Delete gallery image
- `POST /api/artists/visit-store` - Update visit store section

## File Structure
```
backend/
├── models/Artist.js                    # Database model
├── controllers/artistController.js     # Business logic
├── routes/artists.js                   # API routes
├── middlewares/artistUpload.js         # File upload middleware
├── scripts/seedArtists.js             # Database seeding script
└── utils/cloudinary.js               # Cloudinary configuration

frontend/
├── modules/admin/pages/ArtistManagementPage.jsx  # Admin interface
├── modules/user/pages/ArtisansOfTilakPage.jsx    # Public page
└── utils/artistUtils.js                          # API utilities
```

## Setup Instructions

### 1. Environment Variables
Ensure these are set in your `.env` file:
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
# OR
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name
```

### 2. Install Dependencies
```bash
cd backend
npm install
```

### 3. Seed Database
```bash
# Seed artist data with images from assets folder
npm run seed:artists
```

### 4. Start Server
```bash
npm run dev
```

## Image Management

### Cloudinary Folders
- `artist/hero` - Hero images
- `artist/gallery` - Gallery images  
- `artist/visit-store` - Visit store images

### Image Upload Process
1. Images are uploaded to Cloudinary
2. URLs and public IDs are stored in database
3. Old images are automatically deleted when replaced
4. Images are optimized and served via Cloudinary CDN

## Admin Panel Usage

### Access
Navigate to `/admin/aslam-house/our-artist` in the admin panel.

### Features
1. **Basic Information**: Update title and description
2. **Hero Image**: Upload main page image
3. **Content Sections**: Add/edit/remove text sections
4. **Gallery Management**: Add/remove gallery images
5. **Visit Store Section**: Customize CTA section

## Frontend Integration

### API Usage
```javascript
import { fetchArtistData } from '../../../utils/artistUtils'

const data = await fetchArtistData()
```

### Dynamic Content
The frontend automatically falls back to static assets if API data is unavailable, ensuring the page always works.

## Seeding Script Details

### What it does:
1. Connects to MongoDB
2. Uploads images from `my-project/src/assets/house of marble/our artist/` to Cloudinary
3. Creates database record with Cloudinary URLs
4. Populates content sections with default text

### Images processed:
- `Artisan.jpeg` → Hero image
- `slide1.jpeg`, `slide2.jpeg`, `slide3.jpeg`, `slide4.webp` → Gallery
- `visite store.png` → Visit store section

### Run seeding:
```bash
cd backend
npm run seed:artists
```

## Error Handling
- Graceful fallbacks for missing images
- Comprehensive error messages
- Automatic cleanup of orphaned Cloudinary images
- Loading states in frontend

## Security
- Protected admin routes with JWT authentication
- File type validation for uploads
- File size limits (10MB)
- Input sanitization and validation

## Performance
- Images served via Cloudinary CDN
- Optimized database queries
- Compression middleware
- Efficient image transformations

## Troubleshooting

### Common Issues:
1. **Images not uploading**: Check Cloudinary credentials
2. **Seeding fails**: Verify image paths exist
3. **API errors**: Check MongoDB connection
4. **Frontend not updating**: Clear browser cache

### Debug Commands:
```bash
# Check if images exist
ls "my-project/src/assets/house of marble/our artist/"

# Test Cloudinary connection
node -e "require('./utils/cloudinary').cloudinary.api.ping().then(console.log)"

# Check database connection
node -e "require('./config/db')('your-mongodb-uri')"
```

## Next Steps
1. Run the seeding script to populate initial data
2. Test the admin panel functionality
3. Verify frontend displays dynamic content
4. Customize content through admin interface

## Support
For issues or questions, check the error logs and ensure all dependencies are properly installed and configured.
