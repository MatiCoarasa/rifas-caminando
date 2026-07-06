import React from "react";
import {Metadata} from "next";

import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

import "./index.css";

export const metadata: Metadata = {
  title: "Rifa Solidaria 2026",
  description: "Asociación Civil Caminando Juntos",
  metadataBase: process.env.APP_URL ? new URL(process.env.APP_URL) : undefined,
  openGraph: {
    title: "Rifa Solidaria 2026",
    description: "Asociación Civil Caminando Juntos",
    images: [
      {
        url: "/logo-cjs.png",
        width: 736,
        height: 306,
        alt: "Logo Caminando Juntos",
      },
    ],
  },
}

export default function RootLayout({children,}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <div id="root">{children}</div>
      <Analytics />
      <SpeedInsights />
      </body>
    </html>
  )
}
