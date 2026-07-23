import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

import { useAuth } from "../context/AuthContext";

import type { RegisterData } from "../../../types/auth";

export default function RegisterForm() {

    const navigate = useNavigate();

    const {
        register,
        loginWithGoogle,
    } = useAuth();

    const [form, setForm] = useState<RegisterData>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [isLoading, setIsLoading] =
        useState(false);

    function updateField(
        field: keyof RegisterData,
        value: string
    ) {

        setForm((previous) => ({
            ...previous,
            [field]: value,
        }));

    }

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {

        event.preventDefault();

        if (
            !form.name.trim() ||
            !form.email.trim() ||
            !form.password.trim() ||
            !form.confirmPassword.trim()
        ) {

            toast.error(
                "Please fill in all fields."
            );

            return;

        }

        if (
            form.password !==
            form.confirmPassword
        ) {

            toast.error(
                "Passwords do not match."
            );

            return;

        }

        setIsLoading(true);

        try {

            await register(form);

            toast.success(
                "Account created successfully."
            );

            navigate("/login");

        } catch (error) {

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Registration failed."
            );

        } finally {

            setIsLoading(false);

        }

    }

    async function handleGoogleRegister() {

        try {

            await loginWithGoogle();

        } catch (error) {

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Google sign in failed."
            );

        }

    }

    return (
        <>

            <div className="mb-8 text-center">

                <h1 className="text-3xl font-bold text-white">
                    TaskFlow
                </h1>

                <p className="mt-2 text-zinc-400">
                    Create your account ✨
                </p>

                <p className="mt-1 text-sm text-zinc-500">
                    Start organizing your projects and tasks.
                </p>

            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                <div>

                    <label className="mb-2 block text-sm font-medium text-white">
                        Name
                    </label>

                    <Input
                        type="text"
                        placeholder="John Doe"
                        value={form.name}
                        onChange={(e) =>
                            updateField(
                                "name",
                                e.target.value
                            )
                        }
                    />

                </div>

                <div>

                    <label className="mb-2 block text-sm font-medium text-white">
                        Email
                    </label>

                    <Input
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(e) =>
                            updateField(
                                "email",
                                e.target.value
                            )
                        }
                    />

                </div>

                <div>

                    <label className="mb-2 block text-sm font-medium text-white">
                        Password
                    </label>

                    <Input
                        type="password"
                        placeholder="••••••••"
                        value={form.password}
                        onChange={(e) =>
                            updateField(
                                "password",
                                e.target.value
                            )
                        }
                    />

                </div>

                <div>

                    <label className="mb-2 block text-sm font-medium text-white">
                        Confirm Password
                    </label>

                    <Input
                        type="password"
                        placeholder="••••••••"
                        value={form.confirmPassword}
                        onChange={(e) =>
                            updateField(
                                "confirmPassword",
                                e.target.value
                            )
                        }
                    />

                </div>

                <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                >
                    {isLoading
                        ? "Creating Account..."
                        : "Create Account"}
                </Button>

                <div className="relative">

                    <div className="absolute inset-0 flex items-center">

                        <div className="w-full border-t border-zinc-800" />

                    </div>

                    <div className="relative flex justify-center text-xs uppercase">

                        <span className="bg-zinc-950 px-2 text-zinc-500">
                            Or
                        </span>

                    </div>

                </div>

                <Button
                    type="button"
                    variant="secondary"
                    className="w-full"
                    onClick={handleGoogleRegister}
                >
                    Continue with Google
                </Button>

            </form>

            <p className="mt-8 text-center text-sm text-zinc-400">

                Already have an account?{" "}

                <Link
                    to="/login"
                    className="font-medium text-white hover:underline"
                >
                    Sign In
                </Link>

            </p>

        </>
    );

}