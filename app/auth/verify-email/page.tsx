import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Mail, ArrowRight, CheckSquare } from "lucide-react"

export default function VerifyEmailPage() {
  return (
    <div className="w-full max-w-md p-6">
      <div className="flex flex-col gap-6">
        {/* Logo - visible only on mobile */}
        <div className="flex items-center justify-center gap-3 mb-2 lg:hidden">
          <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/25">
            <CheckSquare className="w-7 h-7 text-primary-foreground" />
          </div>
          <span className="font-bold text-2xl tracking-tight">SmartRoutine</span>
        </div>

        <Card className="border-2 shadow-xl shadow-primary/5">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 relative">
              <Mail className="w-10 h-10 text-primary" />
              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
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
            </div>
            <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
            <CardDescription className="text-base">We sent you a confirmation link</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="p-4 rounded-xl bg-muted/50">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Click the link in your email to verify your account. Once verified, you can sign in and start building
                your personalized routines.
              </p>
            </div>

            <div className="space-y-3">
              <Button asChild className="w-full h-12 rounded-xl text-base font-semibold">
                <Link href="/auth/login" className="flex items-center justify-center gap-2">
                  Go to Sign In
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>

              <p className="text-xs text-muted-foreground">
                {"Didn't receive the email?"}{" "}
                <button className="text-primary hover:underline underline-offset-2 font-medium">Resend</button>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">Need help?</p>
          <Link href="/support" className="text-sm text-primary hover:underline underline-offset-2 font-medium">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  )
}
