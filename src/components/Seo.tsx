import React from "react";
import { Helmet } from "react-helmet-async";

const SITE_NAME = "Diffy Games";
const SITE_URL = "https://diffygames.com";
const DEFAULT_IMAGE = `${SITE_URL}/DiffyLogo.webp`;

type SeoProps = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article" | "product";
  keywords?: string;
  noindex?: boolean;
  schema?: string | string[];
};

export default function Seo({
  title,
  description,
  path,
  image,
  type = "website",
  keywords,
  noindex = false,
  schema,
}: SeoProps) {
  const absoluteUrl = `${SITE_URL}${path}`;
  const absoluteImage = image
    ? image.startsWith("http")
      ? image
      : `${SITE_URL}${image}`
    : DEFAULT_IMAGE;
  const schemaList = Array.isArray(schema) ? schema : schema ? [schema] : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large"} />
      <link rel="canonical" href={absoluteUrl} />

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={absoluteUrl} />
      <meta property="og:type" content={type === "article" ? "article" : "website"} />
      <meta property="og:image" content={absoluteImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />

      {schemaList.map((item) => (
        <script key={item} type="application/ld+json">
          {item}
        </script>
      ))}
    </Helmet>
  );
}
