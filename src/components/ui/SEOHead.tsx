import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SITE_CONFIG } from '../../config/site';

interface SEOHeadProps {
  title?: string;
  description?: string;
  url?: string;
  imageUrl?: string;
  keywords?: string;
  structuredData?: object | object[];
  type?: 'website' | 'article';
  noIndex?: boolean;
}

const DEFAULT_IMAGE = `${SITE_CONFIG.url}/newlogo.png`;
const DEFAULT_KEYWORDS = "website design Scottsdale, SEO Scottsdale Arizona, web development Phoenix AZ, digital marketing Scottsdale AZ, business services Arizona";

const SEOHead: React.FC<SEOHeadProps> = ({
  title = SITE_CONFIG.name + " - Arizona Website Design, SEO & Business Services",
  description = SITE_CONFIG.description,
  url = SITE_CONFIG.url,
  imageUrl = DEFAULT_IMAGE,
  keywords = DEFAULT_KEYWORDS,
  structuredData,
  type = 'website',
  noIndex = false,
}) => {
  const absoluteImage = imageUrl.startsWith('http') ? imageUrl : `${SITE_CONFIG.url}${imageUrl}`;

  const schemaArray = structuredData
    ? Array.isArray(structuredData) ? structuredData : [structuredData]
    : null;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_CONFIG.name} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:image:secure_url" content={absoluteImage} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@rahoperations" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />

      {/* Geo */}
      <meta name="geo.region" content="US-AZ" />
      <meta name="geo.placename" content="Scottsdale, Arizona" />

      {/* Structured Data */}
      {schemaArray && schemaArray.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEOHead;
