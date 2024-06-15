/** @type {import('next').NextConfig} */
import { withKumaUI } from "@kuma-ui/next-plugin";

const nextConfig = { reactStrictMode: true, images: {
    remotePatterns: [
        {
            protocol: 'https',
            hostname: 'dogsapi.origamid.dev',
        }
    ]
} };

export default withKumaUI(nextConfig, {
  outputDir: "./.kuma",
  wasm: true,
});
