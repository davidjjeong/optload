"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const router = useRouter();

    const isValidEmail = (email: string) =>
        /\S+@\S+\.\S+/.test(email);

    const isFormValid = isValidEmail(email) && password.length >= 8;

    async function handleLogin() {
        const supabase = await createClient();
        let error = null;
        if(isLogin) {
            const { error: loginError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            error = loginError;
        } else {
            const { error: signUpError } = await supabase.auth.signUp({
                email,
                password,
            });
            error = signUpError;
        }

        setEmail("");
        setPassword("");

        if(!error) {
            if(isLogin){
                router.push("/");
            } else {
                setIsLogin(true);
                toast.success("Account created! Please check your email to verify your account.");
            }
        } else {
            console.error(error.message);
            toast.error(error.message);
        }
    }

    return(
        <div className="flex flex-col items-center justify-center w-full min-h-screen">
            <div className="w-[350px]">
                <h1 className="font-medium text-4xl text-left mb-8">
                    {isLogin ? "Sign In" : "Sign Up"}
                </h1>
                <FieldSet className="mb-8">
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input id="email" type="email" placeholder="johndoe@gmail.com" 
                                onChange={(e) => setEmail(e.target.value)} value={email}
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <Input id="password" type="password" placeholder="••••••••" 
                                onChange={(e) => setPassword(e.target.value)} value={password}
                            />
                            <FieldDescription>Must be at least 8 characters long</FieldDescription>
                        </Field>
                    </FieldGroup>
                </FieldSet>
                <Button className="w-full mb-8" onClick={handleLogin} disabled={!isFormValid}>
                    {isLogin ? "Sign In" : "Sign Up"}
                </Button>
                <div className="flex justify-center">
                    <Button variant="dim" className="underline" onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                    </Button>
                </div>
            </div>
        </div>
    );
}