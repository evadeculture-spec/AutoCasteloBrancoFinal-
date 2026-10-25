import type { NextConfig } from "next";

/**
 * Configuração Next.js
 * - `output: "export"` gera um site 100% estático em /out (deploy direto no Netlify ou Vercel, sem servidor).
 * - As imagens remotas (Unsplash) são otimizadas pelo próprio CDN do Unsplash através de um loader personalizado.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
  },
};

export default nextConfig;
