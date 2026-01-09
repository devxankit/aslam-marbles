# Database Collections Mapping - Page wise Data Storage

## 📊 Complete Database Structure

Yeh document batata hai ki **kis page ka data kis MongoDB collection mein save hai**.

---

## 🏠 HOME & MAIN PAGES

### 1. HomePage (`/`)
**Collection:** `homepages`
**Model:** `HomePage.js`
**Data Stored:**
- Hero Section images
- Videos Section (3 videos - Cloudinary URLs)
- Before/After comparison images (Cloudinary URLs)
- Completed Custom Projects section
  - Background image (Cloudinary URL)
  - Statistics (950 projects, 350 cities, 25 years)
- Featured products
- Featured projects
- About section
- Why Choose Us section

**API Endpoint:** `/api/home-page`

---

### 2. About Us Page (`/about-us`)
**Collection:** `aboutuses`
**Model:** `AboutUs.js`
**Data Stored:**
- Hero background image (Cloudinary URL)
- Intro image (Cloudinary URL)
- About us content
- Company information

**API Endpoint:** `/api/about-us`

---

### 3. The Team Page (`/the-team`)
**Collection:** `teams`
**Model:** `Team.js`
**Data Stored:**
- Hero image (Cloudinary URL)
- Team members list:
  - Name
  - Position
  - Image (Cloudinary URL)
  - Description

**API Endpoint:** `/api/team`

---

### 4. Careers Page (`/careers`)
**Collection:** `careers`
**Model:** `Careers.js`
**Data Stored:**
- Hero image (Cloudinary URL)
- Training image (Cloudinary URL)
- Career opportunities
- Job descriptions

**API Endpoint:** `/api/careers`

**Related Collection:** `jobapplications`
**Model:** `JobApplication.js`
**Data Stored:**
- Applicant details
- Resume
- Applied position

**API Endpoint:** `/api/jobs`

---

### 5. Experience Centre Page (`/experience-centre`)
**Collection:** `experiencecentres`
**Model:** `ExperienceCentre.js`
**Data Stored:**
- Horizontal images (Cloudinary URLs)
- Gallery images (Cloudinary URLs)
- Centre information

**API Endpoint:** `/api/experience-centre`

---

### 6. Our Clients Page (`/our-clients`)
**Collection:** `ourclients`
**Model:** `OurClients.js`
**Data Stored:**
- Hero image (Cloudinary URL)
- Client logos (Cloudinary URLs)
- Client testimonials
- Client names

**API Endpoint:** `/api/our-clients`

---

### 7. Artisans of Tilak Page (`/artisans-of-tilak`)
**Collection:** `artists`
**Model:** `Artist.js`
**Data Stored:**
- Hero images (Cloudinary URLs)
- Artist profiles:
  - Name
  - Specialty
  - Image (Cloudinary URL)
  - Bio

**API Endpoint:** `/api/artists`

---

## 📍 LOCATION PAGES

### 8. Location Page (`/location`)
**Collection:** `locations`
**Model:** `Location.js`
**Data Stored:**
- Location name
- Address
- Contact details
- Images (Cloudinary URLs)
- Map coordinates

**API Endpoint:** `/api/locations`

---

### 9. Visit Store Page (`/visit-store`)
**Collection:** `locations` (same as above)
**Model:** `Location.js`
**Data Stored:**
- Store locations
- Store timings
- Contact information

**API Endpoint:** `/api/locations`

---

## 📝 CONTENT PAGES

### 10. Blog Page (`/blog`)
**Collection:** `blogs`
**Model:** `Blog.js`
**Data Stored:**
- Blog title
- Blog content
- Featured image (Cloudinary URL)
- Category
- Author
- Date
- Tags

**API Endpoint:** `/api/blogs`

---

### 11. Testimonials Page (`/testimonials`)
**Collection:** `testimonials`
**Model:** `Testimonial.js`
**Data Stored:**
- Customer name
- Rating
- Review text
- Customer image (Cloudinary URL)
- Date

**API Endpoint:** `/api/testimonials`

---

### 12. FAQs Page (`/faqs`)
**Collection:** `faqs`
**Model:** `FAQ.js`
**Data Stored:**
- Question
- Answer
- Category
- Order

**API Endpoint:** `/api/faqs`

---

## 🏗️ PROJECT PAGES

### 13. Communal Projects Page (`/communal-projects`)
**Collection:** `communalprojects`
**Model:** `CommunalProjects.js`
**Data Stored:**
- Hero image (Cloudinary URL)
- Project images (Cloudinary URLs)
- Project details
- Location
- Completion date

**API Endpoint:** `/api/communal-projects`

---

### 14. Residential Projects Page (`/residential-projects`)
**Collection:** `residentialprojects`
**Model:** `ResidentialProjects.js`
**Data Stored:**
- Hero image (Cloudinary URL)
- Before/After images (Cloudinary URLs)
- Project gallery (Cloudinary URLs)
- Project details

**API Endpoint:** `/api/residential-projects`

---

### 15. International Projects Page (`/international-projects`)
**Collection:** `internationalprojects`
**Model:** `InternationalProjects.js`
**Data Stored:**
- Hero image (Cloudinary URL)
- Location images (Cloudinary URLs)
- Project gallery (Cloudinary URLs)
- Country-wise projects

**API Endpoint:** `/api/international-projects`

---

## 🕉️ OUR CREATIONS PAGES

### 16. Dream Temple Page (`/dream-temple`)
**Collection:** `dreamtemples`
**Model:** `DreamTemple.js`
**Data Stored:**
- Hero image (Cloudinary URL)
- Temple designs (Cloudinary URLs)
- Pricing information
- Features

**API Endpoint:** `/api/dream-temple`

---

### 17. Pooja Room Page (`/pooja-room`)
**Collection:** `poojarooms`
**Model:** `PoojaRoom.js`
**Data Stored:**
- Hero image (Cloudinary URL)
- Design gallery (Cloudinary URLs)
- Indian locations
- International locations
- Pricing

**API Endpoint:** `/api/pooja-room`

---

### 18. Communal Temples Page (`/communal-temples`)
**Collection:** `communaltemples`
**Model:** `CommunalTemples.js`
**Data Stored:**
- Hero/Heading image (Cloudinary URL)
- Icon images (Cloudinary URLs)
- Temple designs
- Features

**API Endpoint:** `/api/communal-temples`

---

### 19. Jain Temples Page (`/jain-temples`)
**Collection:** `jaintemples`
**Model:** `JainTemples.js`
**Data Stored:**
- Hero image (Cloudinary URL)
- Temple designs (Cloudinary URLs)
- Features
- Specifications

**API Endpoint:** `/api/jain-temples`

---

### 20. Home Decor Page (`/home-decor`)
**Collection:** `homedecorpages`
**Model:** `HomeDecorPage.js`
**Data Stored:**
- Hero image (Cloudinary URL)
- Category images

**Related Collections:**
- `homedecorgroups` - Product groups
- `homedecorcategories` - Categories
- `homedecorproducts` - Individual products

**API Endpoint:** `/api/home-decor`

---

### 21. Murti/Statues Pages (`/murti/*`)
**Collection:** `murtipages`
**Model:** `MurtiPage.js`
**Data Stored:**
- Hero image (Cloudinary URL)
- Banner images

**Related Collections:**
- `murtigroups` - Product groups (Deities, Furniture, Home Decor)
- `murticategories` - Categories (Durga, Ganesh, Krishna, etc.)
- `murtiproducts` - Individual murti products

**API Endpoint:** `/api/murtis`

**Sub-pages:**
- `/murti/durga` - Durga category
- `/murti/ganesha` - Ganesha category
- `/murti/krishna` - Krishna category
- `/murti/shiv` - Shiv category
- `/murti/ram-darbar` - Ram Darbar category
- `/murti/radha-krishna` - Radha Krishna category
- `/murti/hanuman` - Hanuman category
- `/murti/vishnu-laxmi` - Vishnu Laxmi category
- `/murti/sai-baba` - Sai Baba category
- `/murti/saraswati` - Saraswati category
- `/murti/shiv-parvati` - Shiv Parvati category
- `/murti/jain-murti` - Jain Murti category
- `/murti/nandi` - Nandi category
- `/murti/balaji` - Balaji category

---

## 🪨 STONE PRODUCTS PAGES

### 22. Marble Page (`/products/marble`)
**Collection:** `stonecategories`
**Model:** `StoneCategory.js`
**Data Stored:**
- Category name: "Marble"
- Description
- Hero image (Cloudinary URL)

**Related Collection:** `stoneproducts`
**Model:** `StoneProduct.js`
**Data Stored:**
- Product name
- Images (Cloudinary URLs)
- Origin
- Color
- Finish
- Size
- Price
- Description

**API Endpoint:** `/api/stone-products`

---

### 23. Sandstone Page (`/products/sandstone`)
**Collection:** `stonecategories` + `stoneproducts`
**Same structure as Marble**

---

### 24. Limestone Page (`/products/limestone`)
**Collection:** `stonecategories` + `stoneproducts`
**Same structure as Marble**

---

### 25. Slate Page (`/products/slate`)
**Collection:** `stonecategories` + `stoneproducts`
**Same structure as Marble**

---

### 26. Quartzite Page (`/products/quartzite`)
**Collection:** `stonecategories` + `stoneproducts`
**Same structure as Marble**

---

### 27. Granite Page (`/products/granite`)
**Collection:** `stonecategories` + `stoneproducts`
**Same structure as Marble**

---

### 28. Basalt Page (`/products/basalt`)
**Collection:** `stonecategories` + `stoneproducts`
**Same structure as Marble**

---

### 29. Travertine Page (`/products/travertine`)
**Collection:** `stonecategories` + `stoneproducts`
**Same structure as Marble**

---

### 30. Soap Stone Page (`/products/soap-stone`)
**Collection:** `stonecategories` + `stoneproducts`
**Same structure as Marble**

---

### 31. Natural Indian Stones Page (`/products/natural-indian-stones`)
**Collection:** `stonecategories` + `stoneproducts`
**Same structure as Marble**

---

### 32. Pebble Stones Page (`/products/pebble-stones`)
**Collection:** `stonecategories` + `stoneproducts`
**Same structure as Marble**

---

### 33. Cobble Stones Page (`/products/cobble-stones`)
**Collection:** `stonecategories` + `stoneproducts`
**Same structure as Marble**

---

### 34. Stone Chips Page (`/products/stone-chips`)
**Collection:** `stonecategories` + `stoneproducts`
**Same structure as Marble**

---

## 🎨 SERVICES PAGES

### 35. TSA Design Hub Page (`/tsa-design-hub`)
**Collection:** `tsadesignhubs`
**Model:** `TSADesignHub.js`
**Data Stored:**
- Hero image (Cloudinary URL)
- Service images (Cloudinary URLs)
- Design portfolio
- Features

**API Endpoint:** `/api/tsa-design-hub`

---

### 36. TSA International Page (`/tsa-international`)
**Collection:** `tsainternational`
**Model:** `TSAInternational.js`
**Data Stored:**
- Hero image (Cloudinary URL)
- International projects
- Country-wise services

**API Endpoint:** `/api/tsa-international`

---

## 🛒 E-COMMERCE PAGES

### 37. Checkout Page (`/checkout`)
**Collection:** `orders`
**Model:** `Order.js`
**Data Stored:**
- Order items
- Customer details
- Shipping address
- Payment status
- Order total

**API Endpoint:** `/api/orders`

---

### 38. Shipping Page (`/checkout/shipping`)
**Collection:** `orders` (same as above)
**Updates shipping information in order**

---

### 39. Order Success Page (`/order-success`)
**Collection:** `orders` (same as above)
**Displays order confirmation**

---

## 📞 FORM SUBMISSIONS

### 40. Book Appointment Page (`/book-appointment`)
**Collection:** `appointments`
**Model:** `Appointment.js`
**Data Stored:**
- Customer name
- Email
- Phone
- Appointment date
- Message
- Status

**API Endpoint:** `/api/appointments`

---

### 41. Expert Consultation Forms
**Collection:** `expertconsultations`
**Model:** `ExpertConsultation.js`
**Data Stored:**
- Customer name
- Email
- Phone
- Inquiry type
- Message
- Status

**API Endpoint:** `/api/expert-consultations`

---

## 👤 USER PAGES

### 42. Login Page (`/login`)
**Collection:** `users`
**Model:** `User.js`
**Data Stored:**
- Name
- Email
- Password (hashed)
- Role (user/admin)
- Profile image

**API Endpoint:** `/api/users`

---

### 43. Profile Page (`/profile`)
**Collection:** `users` (same as above)
**Displays and updates user profile**

---

## 🎯 NAVIGATION

### 44. Navigation Items (Header/Footer)
**Collection:** `navitems`
**Model:** `NavItem.js`
**Data Stored:**
- Menu structure
- Links
- Submenus
- Order

**API Endpoint:** `/api/nav-items`

---

## 📊 COMPLETE DATABASE COLLECTIONS LIST

| Collection Name | Page(s) | Model File |
|----------------|---------|------------|
| `homepages` | HomePage | HomePage.js |
| `aboutuses` | About Us | AboutUs.js |
| `teams` | The Team | Team.js |
| `careers` | Careers | Careers.js |
| `jobapplications` | Job Applications | JobApplication.js |
| `experiencecentres` | Experience Centre | ExperienceCentre.js |
| `ourclients` | Our Clients | OurClients.js |
| `artists` | Artisans of Tilak | Artist.js |
| `locations` | Location, Visit Store | Location.js |
| `blogs` | Blog | Blog.js |
| `testimonials` | Testimonials | Testimonial.js |
| `faqs` | FAQs | FAQ.js |
| `communalprojects` | Communal Projects | CommunalProjects.js |
| `residentialprojects` | Residential Projects | ResidentialProjects.js |
| `internationalprojects` | International Projects | InternationalProjects.js |
| `dreamtemples` | Dream Temple | DreamTemple.js |
| `poojarooms` | Pooja Room | PoojaRoom.js |
| `communaltemples` | Communal Temples | CommunalTemples.js |
| `jaintemples` | Jain Temples | JainTemples.js |
| `homedecorpages` | Home Decor | HomeDecorPage.js |
| `homedecorgroups` | Home Decor Groups | HomeDecorGroup.js |
| `homedecorcategories` | Home Decor Categories | HomeDecorCategory.js |
| `homedecorproducts` | Home Decor Products | HomeDecorProduct.js |
| `murtipages` | Murti Pages | MurtiPage.js |
| `murtigroups` | Murti Groups | MurtiGroup.js |
| `murticategories` | Murti Categories | MurtiCategory.js |
| `murtiproducts` | Murti Products | MurtiProduct.js |
| `stonecategories` | Stone Categories | StoneCategory.js |
| `stoneproducts` | Stone Products | StoneProduct.js |
| `tsadesignhubs` | TSA Design Hub | TSADesignHub.js |
| `tsainternational` | TSA International | TSAInternational.js |
| `orders` | Checkout, Orders | Order.js |
| `appointments` | Book Appointment | Appointment.js |
| `expertconsultations` | Expert Forms | ExpertConsultation.js |
| `users` | Login, Profile | User.js |
| `navitems` | Navigation | NavItem.js |

---

## 📁 Cloudinary Folder Structure

Saare images aur videos Cloudinary par store hain:

```
cloudinary/
├── home-page/
│   ├── videos/          (HomePage videos)
│   ├── before-after/    (Before/After images)
│   ├── completed-projects/ (Background image)
│   └── hero/            (Hero images)
├── about-us/            (About Us images)
├── team/                (Team member images)
├── careers/             (Career page images)
├── experience-centre/   (Experience centre images)
├── our-clients/         (Client logos)
├── artists/             (Artist images)
├── locations/           (Location images)
├── blogs/               (Blog images)
├── testimonials/        (Testimonial images)
├── projects/
│   ├── communal/        (Communal project images)
│   ├── residential/     (Residential project images)
│   └── international/   (International project images)
├── creations/
│   ├── dream-temple/    (Dream temple images)
│   ├── pooja-room/      (Pooja room images)
│   ├── communal-temples/ (Communal temple images)
│   └── jain-temples/    (Jain temple images)
├── products/
│   ├── home-decor/      (Home decor product images)
│   ├── murti/           (Murti product images)
│   └── stones/          (Stone product images)
└── services/
    ├── tsa-design-hub/  (Design hub images)
    └── tsa-international/ (International service images)
```

---

## 🔍 Quick Search

**Agar aapko kisi specific page ka data dhundhna hai:**

1. **Page URL dekho** (e.g., `/about-us`)
2. **Is document mein search karo** page name se
3. **Collection name mil jayega** (e.g., `aboutuses`)
4. **Model file mil jayega** (e.g., `AboutUs.js`)
5. **API endpoint mil jayega** (e.g., `/api/about-us`)

---

## 📝 Notes

- **Saare images/videos Cloudinary par hain**, database mein sirf URLs store hain
- **Har collection ka apna model file hai** `backend/models/` folder mein
- **Har collection ka apna controller hai** `backend/controllers/` folder mein
- **Har collection ka apna route hai** `backend/routes/` folder mein
- **Seed scripts available hain** `backend/scripts/` folder mein data populate karne ke liye

---

**Last Updated:** 2025-12-23
