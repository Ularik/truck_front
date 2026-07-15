import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      // 1. Для локальной разработки (Django на localhost/127.0.0.1)
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000", // локальный порт Django
        pathname: "/media/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/media/**",
      },
      // 2. Для продакшена (любой домен/IP вашего сервера через Nginx)
      {
        protocol: "http",
        hostname: "**", // Разрешает любые домены на HTTP
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "**", // Разрешает любые домены на HTTPS (когда добавите SSL)
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;
