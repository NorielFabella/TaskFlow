import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

import { useAuth } from "../context/AuthContext";

import type { LoginData } from "../../../types/auth";

export default function LoginForm() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [form, setForm] = useState<LoginData>({
        email: "",
        password: "",
    });

    function updateField(
        field: keyof LoginData,
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
            !form.email.trim() ||
            !form.password.trim()
        ) {
            toast.error("Please fill in all fields.");
            return;
        }

        try {

            await login(form);

            toast.success(
                "Welcome back!"
            );

            navigate("/");

        } catch (error) {

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Login failed."
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
                    Welcome back 👋
                </p>

                <p className="mt-1 text-sm text-zinc-500">
                    Sign in to continue managing your work.
                </p>

            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

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

                <Button
                    type="submit"
                    className="w-full"
                >
                    Sign In
                </Button>

            </form>

            <p className="mt-8 text-center text-sm text-zinc-400">

                Don't have an account?{" "}

                <Link
                    to="/register"
                    className="font-medium text-white hover:underline"
                >
                    Register
                </Link>

            </p>
        </>
    );
}