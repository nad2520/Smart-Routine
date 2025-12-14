import type React from "react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen w-full flex">
      {/* Left side - Branding panel (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        {/* Decorative patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 border-2 border-primary-foreground rounded-3xl rotate-12" />
          <div className="absolute top-40 right-20 w-24 h-24 border-2 border-primary-foreground rounded-full" />
          <div className="absolute bottom-32 left-1/4 w-40 h-40 border-2 border-primary-foreground rounded-3xl -rotate-6" />
          <div className="absolute bottom-20 right-10 w-20 h-20 border-2 border-primary-foreground rounded-xl rotate-45" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16">
          <div className="max-w-md">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-primary-foreground/20 flex items-center justify-center backdrop-blur-sm">
                <span className="text-primary-foreground font-bold text-2xl">SR</span>
              </div>
              <span className="font-bold text-3xl text-primary-foreground tracking-tight">SmartRoutine</span>
            </div>

            <h1 className="text-4xl xl:text-5xl font-bold text-primary-foreground leading-tight mb-6 text-balance">
              Build better habits, transform your life
            </h1>

            <p className="text-lg text-primary-foreground/80 leading-relaxed mb-10 text-pretty">
              Combine intelligent task management with psychological insights to create routines that stick and improve
              your well-being.
            </p>

            <div className="space-y-4">
              {[
                "AI-powered routine optimization",
                "Psychological well-being tracking",
                "Professional psychiatrist support",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-primary-foreground"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-primary-foreground/90 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Auth forms */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
        {children}
      </div>
    </div>
  )
}
