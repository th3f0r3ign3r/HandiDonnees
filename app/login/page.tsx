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
                Se connecter
              </h1>
              <p className="lg:mt-2 mt-1.5 text-sm leading-6 text-gray-500 tracking-tight max-w-xl">
                Connectez-vous à votre compte pour accéder à un espace dédié
                pour accéder à vos informations personnelles et bien
                d&apos;autres services.
              </p>
            </div>

            <div className="mt-10">
              <div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    console.log("Form submitted");
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label
                      htmlFor="npi"
                      className="block text-sm font-medium leading-6 text-gray-900 tracking-tighter"
                    >
                      NPI (Numéro de Personnel d&apos;Identification)
                    </label>
                    <div className="mt-2">
                      <input
                        id="npi"
                        name="npi"
                        type="number"
                        required
                        className="block w-full rounded-lg border-2 py-2 focus:ring-blue-400/50 focus:ring placeholder:text-gray-400 text-lg outline-0"
                      />
                    </div>
                    <p className="mt-1 text-xs tracking-tight text-red-600">
                      Ce numéro est accessible sur votre carte Biométrique
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="block text-sm font-medium leading-6 text-gray-900 tracking-tighter"
                    >
                      Numéro de téléphone
                    </label>
                    <div className="mt-2">
                      <div className="flex items-center w-full rounded-lg border-2 border-gray-500 py-2 focus:ring-blue-400/50 focus:ring text-lg outline-0">
                        <span className="flex select-none items-center pl-3 text-gray-500 tracking-tighter">
                          +229
                        </span>
                        <input
                          type="number"
                          name="phoneNumber"
                          id="phoneNumber"
                          maxLength={8}
                          className="block flex-1 py-0 bg-transparent text-lg pl-1.5 placeholder:text-gray-400 focus:ring-0 border-0"
                          placeholder="XXXXXXXX"
                          required
                        />
                      </div>
                    </div>
                    <p className="mt-1 text-xs tracking-tight text-red-600">
                      Veuillez entrer votre numéro de téléphone utilisé lors de
                      l&apos;enregistrement
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="otp"
                      className="block text-sm font-medium leading-6 text-gray-900 tracking-tighter"
                    >
                      Code OTP
                    </label>
                    <div className="mt-2">
                      <input
                        id="otp"
                        name="otp"
                        type="number"
                        required
                        className="block w-full rounded-lg border-2 py-2 focus:ring-blue-400/50 focus:ring placeholder:text-gray-400 text-lg outline-0"
                      />
                    </div>
                    <p className="mt-1 text-xs tracking-tight text-red-600">
                      Un code OTP vous a été envoyé par SMS sur votre numéro de
                      téléphone
                    </p>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex mt-8 w-full justify-center rounded-full bg-blue-500 px-3 py-3.5 text-base font-medium tracking-tight leading-6 text-white shadow-sm outline-0"
                    >
                      Connexion
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="absolute bottom-20 right-28 flex items-center gap-x-2 p-2 rounded-lg border shadow-sm">
            <BuildingLibraryIcon className="h-8 w-8 text-blue-500" />
            <p className="text-sm pr-1 tracking-tight leading-5">
              Vous êtes une entreprise ou un <br /> particulier ? &nbsp;
              <Link href="/login/enterprise" className="text-blue-500 hover:underline">
                Cliquez ici
              </Link>
            </p>
          </div>
        </div>
        <div className="relative hidden w-2/5 lg:flex">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1527525443983-6e60c75fff46?q=80&w=3264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
      </div>
    </>
  );
}
