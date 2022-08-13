// @ts-check

const trueEnv = ['true', '1', 'yes'];

const NEXTJS_IGNORE_ESLINT = trueEnv.includes(
  process.env?.NEXTJS_IGNORE_ESLINT ?? 'false'
);
const NEXTJS_IGNORE_TYPECHECK = trueEnv.includes(
  process.env?.NEXTJS_IGNORE_TYPECHECK ?? 'false'
);
const disableSourceMaps = trueEnv.includes(
  process.env?.NEXT_DISABLE_SOURCEMAPS ?? 'false'
);

/** @type {import('next').NextConfig} */
export const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: !disableSourceMaps,
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: NEXTJS_IGNORE_TYPECHECK,
  },
  eslint: {
    ignoreDuringBuilds: NEXTJS_IGNORE_ESLINT,
    dirs: ['src'],
  },
};
