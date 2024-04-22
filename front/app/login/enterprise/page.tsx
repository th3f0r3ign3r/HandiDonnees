"use client";

import Header from "@/components/header";
import { BuildingLibraryIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <Header />

      <div className="flex min-h-screen flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 order-1">
          <div className="w-96 lg:w-[40rem] xl:w-[50rem] mx-auto">
            <div>
              <h1 className="xl:text-5xl lg:text-4xl text-2xl font-bold leading-9 tracking-tighter text-gray-900">
                Entreprise/Particulier
              </h1>
              <p className="lg:mt-2 mt-1.5 text-sm leading-6 text-gray-500 tracking-tight max-w-lg">
                Connectez-vous à votre compte d&apos;entreprise ou de
                particulier. <br /> Vos identifiants vous ont été envoyés par mail.
              </p>
            </div>

            <div className="mt-8">
              <div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    console.log("Form submitted");
                  }}
                  className="space-y-6"
                >
                  <div>
                    <label
                      htmlFor="account-id"
                      className="block text-sm font-medium leading-6 text-gray-900 tracking-tighter"
                    >
                      Identifiant
                    </label>
                    <div className="mt-2">
                      <input
                        id="account-id"
                        name="account-id"
                        type="text"
                        required
                        className="block w-full rounded-lg border-2 py-2 focus:ring-blue-400/50 focus:ring placeholder:text-gray-400 text-lg outline-0"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900 tracking-tighter"
                    >
                      Mot de passe
                    </label>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        className="block w-full rounded-lg border-2 py-2 focus:ring-blue-400/50 focus:ring placeholder:text-gray-400 text-lg outline-0"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex mt-10 w-full justify-center rounded-full bg-blue-500 px-3 py-3.5 text-base font-medium tracking-tight leading-6 text-white shadow-sm outline-0"
                    >
                      Connexion
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-2/5 lg:flex">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1584291527905-f930791fb1ce?q=80&w=3200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
      </div>
    </>
  );
}
