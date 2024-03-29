/** @format */

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };

// module.exports = { nextConfig };

module.exports = () => {
	const rewrites = () => {
		return [
			{
				source: "/hello/:path*",
				destination: "http://localhost:5000/hello/:path",
			},
		]
	}
	return {
		rewrites,
	}
}
