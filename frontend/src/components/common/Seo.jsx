import React from 'react';
import { Helmet } from 'react-helmet-async';

const Seo = ({
    title,
    description,
    keywords,
    image,
    url,
    type = 'website'
}) => {
    const siteTitle = 'The Stone Art - Premium Marble & Stone Suppliers';
    const defaultDescription = 'The Stone Art (Aslam Marble Suppliers) provides high-quality marble, sandstone, limestone, and custom stone carvings for temples, homes, and architectural projects.';
    const defaultKeywords = 'marble, sandstone, limestone, stone art, temple construction, stone carving, home decor, indian natural stones';
    const siteUrl = 'https://thestoneart.com'; // Replace with actual domain when live
    const defaultImage = '/images/og-default.jpg'; // We should ensure this image exists or use a logo

    const metaTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const metaDescription = description || defaultDescription;
    const metaKeywords = keywords || defaultKeywords;
    const metaImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : `${siteUrl}${defaultImage}`;
    const metaUrl = url ? `${siteUrl}${url}` : siteUrl;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{metaTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={metaKeywords} />
            <link rel="canonical" href={metaUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={metaTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={metaImage} />
            <meta property="og:url" content={metaUrl} />
            <meta property="og:site_name" content={siteTitle} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={metaTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={metaImage} />

            {/* Structured Data (JSON-LD) for Local Business */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "HomeAndConstructionBusiness",
                    "name": "The Stone Art",
                    "image": metaImage,
                    "@id": siteUrl,
                    "url": siteUrl,
                    "telephone": "+919876543210", // Should be updated with real phone
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "Khasra No 123", // Update with real address
                        "addressLocality": "Jaipur",
                        "addressRegion": "RJ",
                        "postalCode": "302001",
                        "addressCountry": "IN"
                    },
                    "geo": {
                        "@type": "GeoCoordinates",
                        "latitude": 26.9124, // Update with real coordinates
                        "longitude": 75.7873
                    },
                    "openingHoursSpecification": {
                        "@type": "OpeningHoursSpecification",
                        "dayOfWeek": [
                            "Monday",
                            "Tuesday",
                            "Wednesday",
                            "Thursday",
                            "Friday",
                            "Saturday"
                        ],
                        "opens": "09:00",
                        "closes": "19:00"
                    },
                    "sameAs": [
                        "https://www.facebook.com/thestoneart",
                        "https://www.instagram.com/thestoneart"
                    ]
                })}
            </script>
        </Helmet>
    );
};

export default Seo;
