
/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    distDir: 'dist',
    // assetPrefix:'assets',
    rewrites() {
        return [
            { source: '/_next/:path*', destination: '/asset/:path*' }
        ]
    },
    // images: {
    //     loader: 'custom',
    //     loaderFile: './my-loader.ts',
    // },
};

export default nextConfig;
