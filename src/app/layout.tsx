import React from "react";
import {Metadata} from "next";

import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

import "./index.css";

export const metadata: Metadata = {
  title: "Rifa Solidaria 2024",
  description: "Asociación Civil Caminando Juntos",
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
