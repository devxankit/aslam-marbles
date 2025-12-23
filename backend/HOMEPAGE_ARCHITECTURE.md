# HomePage Backend Architecture

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                          FRONTEND (React)                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌──────────────────┐      ┌──────────────────┐                    │
│  │   HomePage.jsx   │      │ HomeVideosSection│                    │
│  │                  │      │      .jsx        │                    │
│  │  - Fetches data  │      │                  │                    │
│  │  - Displays      │      │  - Fetches videos│                    │
│  │    sections      │      │  - Shows loading │                    │
│  └────────┬─────────┘      └────────┬─────────┘                    │
│           │                         │                               │
│           └─────────┬───────────────┘                               │
│                     │                                               │
│           ┌─────────▼──────────┐                                    │
│           │ homePageUtils.js   │                                    │
│           │                    │                                    │
│           │ - fetchHomePageData()                                   │
│           │ - uploadVideo()                                         │
│           │ - updateBeforeAfter()                                   │
│           │ - updateCompletedProjects()                             │
│           └─────────┬──────────┘                                    │
│                     │                                               │
└─────────────────────┼───────────────────────────────────────────────┘
                      │
                      │ HTTP Requests
                      │
┌─────────────────────▼───────────────────────────────────────────────┐
│                       BACKEND (Node.js/Express)                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    Routes (homePageRoutes.js)                 │  │
│  │                                                                │  │
│  │  GET    /api/home-page                    [Public]           │  │
│  │  POST   /api/home-page                    [Admin]            │  │
│  │  POST   /api/home-page/videos             [Admin]            │  │
│  │  DELETE /api/home-page/videos/:publicId   [Admin]            │  │
│  │  POST   /api/home-page/before-after       [Admin]            │  │
│  │  POST   /api/home-page/completed-projects [Admin]            │  │
│  └────────────────────────┬─────────────────────────────────────┘  │
│                           │                                          │
│  ┌────────────────────────▼─────────────────────────────────────┐  │
│  │              Controller (homePageController.js)              │  │
│  │                                                                │  │
│  │  - getHomePage()                                              │  │
│  │  - updateHomePage()                                           │  │
│  │  - uploadVideo()           ┌──────────────────┐              │  │
│  │  - deleteVideo()           │   Cloudinary     │              │  │
│  │  - updateBeforeAfterImages()│   Integration   │              │  │
│  │  - updateCompletedProjects()│                 │              │  │
│  │                            │  - Upload files  │              │  │
│  │                            │  - Delete files  │              │  │
│  │                            │  - Get URLs      │              │  │
│  │                            └──────────────────┘              │  │
│  └────────────────────────┬─────────────────────────────────────┘  │
│                           │                                          │
│  ┌────────────────────────▼─────────────────────────────────────┐  │
│  │                  Model (HomePage.js)                          │  │
│  │                                                                │  │
│  │  {                                                             │  │
│  │    videosSection: {                                           │  │
│  │      heading: String,                                         │  │
│  │      videos: [{ url, publicId, resourceType }]               │  │
│  │    },                                                          │  │
│  │    beforeAfterSection: {                                      │  │
│  │      heading, description,                                    │  │
│  │      beforeImage: { url, publicId, alt },                    │  │
│  │      afterImage: { url, publicId, alt }                      │  │
│  │    },                                                          │  │
│  │    completedProjectsSection: {                                │  │
│  │      heading,                                                  │  │
│  │      backgroundImage: { url, publicId, alt },                │  │
│  │      stats: { projects, cities, yearsExperience }            │  │
│  │    }                                                           │  │
│  │  }                                                             │  │
│  └────────────────────────┬─────────────────────────────────────┘  │
│                           │                                          │
└───────────────────────────┼──────────────────────────────────────────┘
                            │
                            │ MongoDB Connection
                            │
┌───────────────────────────▼──────────────────────────────────────────┐
│                         MongoDB Database                              │
├───────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  Collection: homepages                                                │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  Document: {                                                  │   │
│  │    _id: ObjectId,                                             │   │
│  │    videosSection: { ... },                                   │   │
│  │    beforeAfterSection: { ... },                              │   │
│  │    completedProjectsSection: { ... },                        │   │
│  │    isActive: true,                                            │   │
│  │    createdAt: Date,                                           │   │
│  │    updatedAt: Date                                            │   │
│  │  }                                                             │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘

                            ┌──────────────────────────────────────┐
                            │         Cloudinary CDN               │
                            ├──────────────────────────────────────┤
                            │                                      │
                            │  Folders:                            │
                            │  ├── home-page/videos/               │
                            │  │   ├── video1.mp4                 │
                            │  │   ├── video2.mp4                 │
                            │  │   └── video3.mp4                 │
                            │  ├── home-page/before-after/         │
                            │  │   ├── before.jpg                 │
                            │  │   └── after.png                  │
                            │  └── home-page/completed-projects/   │
                            │      └── background.webp             │
                            │                                      │
                            │  Returns: Optimized URLs             │
                            └──────────────────────────────────────┘
```

## Data Flow

### 1. Initial Setup (Seeding)
```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ Seed Script  │────▶│  Cloudinary  │────▶│   MongoDB    │────▶│   Success    │
│              │     │  Upload      │     │   Insert     │     │              │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
```

### 2. Frontend Data Fetch
```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  HomePage    │────▶│   Backend    │────▶│   MongoDB    │────▶│   Display    │
│  Component   │     │   API Call   │     │   Query      │     │   Content    │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
```

### 3. Admin Update Flow
```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ Admin Panel  │────▶│  Cloudinary  │────▶│   MongoDB    │────▶│   Updated    │
│ Upload File  │     │  Upload      │     │   Update     │     │   Frontend   │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
       │                                           │
       │                                           │
       └───────────────────────────────────────────┘
                  Delete old file from Cloudinary
```

## Component Interaction

```
HomePage.jsx
    │
    ├─── useEffect (on mount)
    │       │
    │       └─── fetchHomePageData()
    │               │
    │               └─── GET /api/home-page
    │                       │
    │                       └─── Returns: { videosSection, beforeAfterSection, completedProjectsSection }
    │
    ├─── Renders:
    │       │
    │       ├─── HomeVideosSection (uses videosSection.videos)
    │       │       │
    │       │       └─── Displays videos from Cloudinary URLs
    │       │
    │       ├─── Completed Projects Section (uses completedProjectsSection)
    │       │       │
    │       │       └─── Background image + Stats
    │       │
    │       └─── Before/After Section (uses beforeAfterSection)
    │               │
    │               └─── Comparison slider with images
    │
    └─── Fallbacks: If API fails, uses local images/videos
```

## Security Flow

```
┌──────────────────────────────────────────────────────────────┐
│                     Request Flow                              │
└──────────────────────────────────────────────────────────────┘

Public Request (GET /api/home-page)
    │
    └─── ✅ Allowed (No auth required)
            │
            └─── Returns data

Admin Request (POST /api/home-page/videos)
    │
    ├─── Has Auth Token?
    │       │
    │       ├─── ✅ Yes ──▶ Is Admin?
    │       │                  │
    │       │                  ├─── ✅ Yes ──▶ Process Request
    │       │                  │
    │       │                  └─── ❌ No ──▶ 403 Forbidden
    │       │
    │       └─── ❌ No ──▶ 401 Unauthorized
```

## File Organization

```
StoneArt/
├── backend/
│   ├── models/
│   │   └── HomePage.js                    [Enhanced Model]
│   ├── controllers/
│   │   └── homePageController.js          [CRUD Operations]
│   ├── routes/
│   │   └── homePageRoutes.js              [API Endpoints]
│   ├── scripts/
│   │   └── seedHomePage.js                [Database Seeding]
│   ├── README_HOMEPAGE.md                 [Technical Docs]
│   ├── HOMEPAGE_QUICKSTART.md             [Quick Guide]
│   └── HOMEPAGE_IMPLEMENTATION_SUMMARY.md [Summary]
│
└── my-project/
    └── src/
        ├── utils/
        │   └── homePageUtils.js           [API Utilities]
        ├── components/
        │   └── home/
        │       └── HomeVideosSection.jsx  [Videos Component]
        └── modules/
            └── user/
                └── pages/
                    └── HomePage.jsx       [Main Page]
```
