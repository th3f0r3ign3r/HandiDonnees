import Footer from "@/components/footer";
import Header from "@/components/header";
import Image from "next/image";

export default function RegistrationPage() {
  return (
    <>
      <Header />

      <main className="mt-16 p-3">
        <div className="overflow-hidden rounded-xl relative h-96">
          <Image
            src="https://global.unitednations.entermediadb.net/assets/mediadb/services/module/asset/downloads/preset/Collections/Embargoed/19-11-2021-IOM-Haiti-Photo4b.jpg/image1440x560cropped.jpg"
            alt="Registration"
            className="object-cover"
            fill
          />
        </div>
        <section className="max-w-6xl mx-auto mt-20 pb-10">
          <h1 className="text-5xl font-extrabold tracking-tighter">
            Inscription de
            <br /> Personnes Handicapées
          </h1>

          <div className="mt-10">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Informations personnelles
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Remplissez les informations d&apos;identification ci-dessous.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 border-t border-gray-900/10 pt-6 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Prénom(s)
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nom de famille
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="phone-number"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Numéro de téléphone
                </label>
                <div className="mt-2">
                  <input
                    id="phone-number"
                    name="phone-number"
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Pays
                </label>
                <div className="mt-2">
                  <input
                    id="country"
                    name="country"
                    type="text"
                    value="Bénin"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Département
                </label>
                <div className="mt-2">
                  <select
                    id="province"
                    name="province"
                    autoComplete="province-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option>Littoral</option>
                    <option>Zou</option>
                    <option>Mono</option>
                    <option>Atlantique</option>
                    <option>Attacora</option>
                    <option>Borgou</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Ville
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="city"
                    id="city"
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Domicile
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="street-address"
                    id="street-address"
                    autoComplete="street-address"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="birth-date"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Date de naissance
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="birth-date"
                    id="birth-date"
                    autoComplete="address-level1"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="sex"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Sexe
                </label>
                <div className="mt-2">
                  <select
                    id="sex"
                    name="sex"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option>Homme</option>
                    <option>Femme</option>
                    <option>Autres</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="marital-status"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Situation Matrimoniale
                </label>
                <div className="mt-2">
                  <select
                    id="marital-status"
                    name="marital-status"
                    autoComplete="province-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option>Célibataire</option>
                    <option>Célibataire (sans enfants)</option>
                    <option>Marié</option>
                    <option>Marié (sans enfant)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Informations Professionnelles
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Remplissez les informations professionnelles ci-dessous.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 border-t border-gray-900/10 pt-6 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="activity-status"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Status
                </label>
                <div className="mt-2">
                  <select
                    id="activity-status"
                    name="activity-status"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option>Salarié</option>
                    <option>Entrepreneur</option>
                    <option>Chômage</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="activity-domain"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Secteur d&apos;activité
                </label>
                <div className="mt-2">
                  <select
                    id="activity-domain"
                    name="activity-domain"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option>Agroalimentaire</option>
                    <option>Industrie</option>
                    <option>Commerce</option>
                    <option>Services divers</option>
                    <option>Autres</option>
                  </select>
                </div>
              </div>

              <div className="col-span-2">
                <label
                  htmlFor="entreprise-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nom de l&apos;entreprise
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="entreprise-name"
                    id="entreprise-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <span className="text-xs text-red-500 tracking-tight">
                  RAS si vous êtes sans emploi (Chômage)
                </span>
              </div>
            </div>
          </div>

          <div className="mt-20">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Informations sur le Handicap
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Remplissez les informations sur le handicap ci-dessous.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 border-t border-gray-900/10 pt-6 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="handicap-type"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Type de Handicap
                </label>
                <div className="mt-2">
                  <select
                    id="handicap-type"
                    name="handicap-type"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option>Moteur</option>
                    <option>Sensoriel</option>
                    <option>Mental</option>
                    <option>Psychique</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="handicap-level"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Niveau de Handicap
                </label>
                <div className="mt-2">
                  <select
                    id="handicap-level"
                    name="handicap-level"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option>Léger</option>
                    <option>Modéré</option>
                    <option>Sévère</option>
                  </select>
                </div>
              </div>

              <div className="col-span-2">
                <label
                  htmlFor="handicap-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nom de l&apos;handicap
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="handicap-name"
                    id="handicap-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20">
            <button type="submit" className="bg-blue-600 text-white font-semibold text-lg tracking-tight py-4 px-8 rounded-full w-full">
              <span>Enregistrer</span>
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
