import MillionLint from '@million/lint';
/** @type {import('next').NextConfig} */
import { withKumaUI } from '@kuma-ui/next-plugin';
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dogsapi.origamid.dev',
      },
    ],
  },
};
export default MillionLint.next({
  rsc: true,
})(
  withKumaUI(nextConfig, {
    outputDir: './.kuma',
    wasm: true,
  }),
);
