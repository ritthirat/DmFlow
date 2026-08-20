"use client"

import { useActionState } from "react";
import { login } from "@/app/actions/auth";

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-semibold mb-6 text-center">Sign in to your account</h1>
        <form action={action} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              name="username"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm">
              <input type="checkbox" className="mr-2" /> Remember me
            </label>
            <a href="#" className="text-sm text-indigo-600 hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            disabled={pending}
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 disabled:opacity-60"
          >
            {pending ? "Signing in..." : "Sign in"}
          </button>
          {state?.message && <p className="text-sm text-red-600">{state.message}</p>}
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account? <a href="/login/register" className="text-indigo-600 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
}
