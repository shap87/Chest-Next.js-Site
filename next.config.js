const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const { withSuperjson } = require('next-superjson')
// const { Timestamp } = require('@google-cloud/firestore');
// const SuperJSON = require('superjson');


// SuperJSON.default.registerCustom(
//   {
//     isApplicable: (v) => {
//       console.log('isApplicable', v?.constructor.name === "Timestamp", v)
//       return v?.constructor.name === "Timestamp"
//     },
//     serialize: v => {
//       console.log('serialize', v)
//       return v.toDate().getTime()
//     },
//     deserialize: v => {
//       console.log('deserialize', v)
//       return Timestamp.fromMillis(v)
//     }
//   },
//   'firestore.Timestamp'
// );



/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // experimental: {
  //   esmExternals: !false,

  // },
}

module.exports = withBundleAnalyzer(withSuperjson()(nextConfig))
