"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"
import { CheckSquare, Loader2, ArrowLeft, Mail } from "lucide-react"
import { getURL } from "@/lib/utils"

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("")
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault()
        const supabase = createClient()
        setIsLoading(true)
        setError(null)
        setSuccess(false)

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: getURL("/auth/update-password"),
            })
            if (error) throw error
            setSuccess(true)
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : "An error occurred")
        } finally {
            setIsLoading(false)
        }
    }

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
                    <CardHeader className="text-center pb-2">
                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                            <Mail className="w-6 h-6" />
                        </div>
                        <CardTitle className="text-2xl font-bold">Forgot password?</CardTitle>
                        <CardDescription className="text-base">
                            No worries, we'll send you reset instructions.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                        {success ? (
                            <div className="space-y-6 text-center animate-in fade-in slide-in-from-bottom-2">
                                <div className="p-4 bg-green-500/10 text-green-600 rounded-xl border border-green-500/20">
                                    <p className="font-medium">Check your email</p>
                                    <p className="text-sm mt-1">We've sent password reset instructions to {email}</p>
                                </div>
                                <Button asChild variant="outline" className="w-full h-12 rounded-xl">
                                    <Link href="/auth/login">
                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                        Back to log in
                                    </Link>
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleResetPassword}>
                                <div className="flex flex-col gap-5">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email" className="text-sm font-medium">
                                            Email address
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="alex@example.com"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="h-12 rounded-xl bg-muted/50 border-0 focus-visible:ring-2 focus-visible:ring-primary"
                                        />
                                    </div>

                                    {error && (
                                        <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-xl flex items-center gap-2">
                                            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                                />
                                            </svg>
                                            {error}
                                        </div>
                                    )}

                                    <Button type="submit" className="w-full h-12 rounded-xl text-base font-semibold" disabled={isLoading}>
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Sending instructions...
                                            </>
                                        ) : (
                                            "Reset password"
                                        )}
                                    </Button>
                                </div>

                                <div className="mt-6 text-center">
                                    <Link
                                        href="/auth/login"
                                        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        <ArrowLeft className="w-4 h-4 mr-1" />
                                        Back to log in
                                    </Link>
                                </div>
                            </form>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
