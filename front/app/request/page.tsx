"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import {
  CheckBadgeIcon,
  CurrencyDollarIcon,
  DocumentCheckIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function EnterprisePage() {
  return (
    <>
      <Header
        className="bg-transparent"
        linkClassName="text-base font-medium tracking-tighter leading-6 text-white"
        ctaClassName="text-sm font-medium leading-6 tracking-tight bg-white px-8 py-3 rounded-full"
      />

      <main className="h-screen">
        <img
          src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="bg"
          className="absolute inset-0 object-cover w-full h-full -z-10"
        />
        <div className="max-w-7xl px-6 mx-auto flex flex-col justify-center h-full lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-7xl font-extrabold tracking-tighter text-white">
              Faites une demande pour votre entreprise
            </h1>
            <p className="mt-8 text-sm text-gray-900">
              Remplissez le formulaire pour faire une demande d&apos;ouverture
              de compte pour votre entreprise. Cela vous permettra de bénéficier
              d&apos;un accès plus détaillé aux informations. <br />
              <br />
              Vous recevrez un mail de confirmation une fois votre demande
              traitée.
            </p>
          </div>
          <div className="mt-12">
            <Link
              href="#form-access-request"
              className="px-8 py-4 tracking-tight text-medium text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-500/60 focus:ring-offset-1 focus:ring-offset-white"
            >
              Accéder au formulaire
            </Link>
          </div>
        </div>
      </main>

      <section className="max-w-7xl px-6 mx-auto flex flex-col justify-center lg:px-8 my-20">
        <div>
          <h2 className="text-4xl font-semibold tracking-tighter">
            Pourquoi faire une demande ?
          </h2>

          <p className="mt-4 text-gray-900 text-sm">
            En tant qu&apos;entreprise, vous avez accès à des informations
            précises sur les personnes handicapés par départements. <br />
            <br />
            Vous pourrez consulter des données telles que :
            <ul className="list-disc pl-8 mt-3 font-medium tracking-tight">
              <li>Le Taux d&apos;enfants et d&apos;adulte handicapés</li>
              <li>
                La Structurations des personnes handicapés par tranches
                d&apos;âges
              </li>
              <li>
                Les différentes aides sociales effectuées par les départements
              </li>
              <li>
                L&apos;évolution des personnes handicapés par départements au
                fil des années
              </li>
              <li>
                Le taux de personnes handicapés par départements par rapport à
                la population totale
              </li>
              <li>Le taux de scolarisation des enfants handicapés</li>
              <li>
                Le nombre des établissements régionaux d&apos;enseignement
                adapté
              </li>
              <li>etc...</li>
            </ul>
          </p>
        </div>

        <div className="mt-16">
          <h2 className="text-4xl font-semibold tracking-tighter">
            Comment faire une demande ?
          </h2>

          <div className="relative grid grid-cols-4 mt-10 gap-6">
            <div className="border border-blue-500 w-full absolute top-[50%] bottom-[50%] -translate-y-1/4 -z-10" />

            <div className="px-5 py-3 rounded-full bg-white border border-blue-500 flex items-center gap-3">
              <DocumentCheckIcon className="w-10 h-10 text-blue-500" />
              <div className="tracking-tight">
                <h3 className="text-base font-semibold">
                  Remplir le formulaire
                </h3>
                <p className="text-xs text-gray-500">
                  Remplissez le formulaire en ligne pour faire une demande
                </p>
              </div>
            </div>

            <div className="px-5 py-3 rounded-full bg-white border border-blue-500 flex items-center gap-3">
              <CheckBadgeIcon className="w-10 h-10 text-blue-500" />
              <div className="tracking-tight">
                <h3 className="text-base font-semibold">
                  Validation de la demande
                </h3>
                <p className="text-xs text-gray-500">
                  Votre demande sera validée par notre équipe
                </p>
              </div>
            </div>

            <div className="px-5 py-3 rounded-full bg-white border border-blue-500 flex items-center gap-3">
              <CurrencyDollarIcon className="w-10 h-10 text-blue-500" />
              <div className="tracking-tight">
                <h3 className="text-base font-semibold">Paiement</h3>
                <p className="text-xs text-gray-500">
                  Vous payer les frais relatifs aux informations demandées
                </p>
              </div>
            </div>

            <div className="px-5 py-3 rounded-full bg-white border border-blue-500 flex items-center gap-3">
              <KeyIcon className="w-10 h-10 text-blue-500" />
              <div className="tracking-tight">
                <h3 className="text-base font-semibold">
                  Accès aux informations
                </h3>
                <p className="text-xs text-gray-500">
                  Vous allez recevoir un mail avec les identifiants de
                  connexion.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20" id="form-access-request">
          <h2 className="text-4xl font-semibold tracking-tighter">
            Formulaire de demande
          </h2>

          <div className="mt-10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log("Form submitted");
              }}
              className="gap-y-6 flex flex-col"
            >
              <div>
                <label
                  htmlFor="account-id"
                  className="block text-sm font-medium leading-6 text-gray-900 tracking-tighter"
                >
                  Email de l&apos;entreprise / Particulier
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
                  htmlFor="account-id"
                  className="block text-sm font-medium leading-6 text-gray-900 tracking-tighter"
                >
                  Nom de l&apos;entreprise / Particulier
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
                  htmlFor="account-id"
                  className="block text-sm font-medium leading-6 text-gray-900 tracking-tighter"
                >
                  IFU de l&apos;entreprise / Particulier
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
                  htmlFor="account-id"
                  className="block text-sm font-medium leading-6 text-gray-900 tracking-tighter"
                >
                  Contact de l&apos;entreprise / Particulier
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
                  htmlFor="account-id"
                  className="block text-sm font-medium leading-6 text-gray-900 tracking-tighter"
                >
                  Adresse de l&apos;entreprise
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
                <p className="mt-1 text-xs tracking-tight text-red-600">
                  Remplir uniquement si entreprise
                </p>
              </div>

              <div>
                <label
                  htmlFor="account-id"
                  className="block text-sm font-medium leading-6 text-gray-900 tracking-tighter"
                >
                  Objectif
                </label>
                <div className="mt-2">
                  <textarea
                    id="account-id"
                    name="account-id"
                    required
                    rows={6}
                    className="block w-full rounded-lg border-2 py-2 focus:ring-blue-400/50 focus:ring placeholder:text-gray-400 text-base outline-0"
                    placeholder="Décrivez l'objectif de l'entreprise avec les données"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex mt-6 w-full justify-center rounded-full bg-blue-500 px-3 py-3.5 text-base font-medium tracking-tight leading-6 text-white shadow-sm outline-0"
                >
                  Soumettre la demande
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
