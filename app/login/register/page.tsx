"use client";

import { useActionState } from "react";
import { signup } from "@/app/actions/auth";
import Link from "next/link";

export default function LoginPage() {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Register for your account
        </h1>
        <form action={action} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              name="username"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {state?.errors?.username && <p className="mt-1 text-sm text-red-600">{state.errors.username[0]}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {state?.errors?.name && <p className="mt-1 text-sm text-red-600">{state.errors.name[0]}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {state?.errors?.password && <p className="mt-1 text-sm text-red-600">{state.errors.password[0]}</p>}
          </div>
            <div>
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {state?.errors?.confirmPassword && <p className="mt-1 text-sm text-red-600">{state.errors.confirmPassword[0]}</p>}
          </div>


          <button
            type="submit"
            disabled={pending}
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 disabled:opacity-60"
          >
            {pending ? "Signing up..." : "Sign up"}
          </button>
          {state?.message && <p className="text-sm text-red-600">{state.message}</p>}
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account? <Link href="/login" className="text-indigo-600 hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
