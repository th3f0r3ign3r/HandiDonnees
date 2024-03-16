"use client";

import { DoughnutChart, PolarAreaChart } from "@/components/chartjs";
import Footer from "@/components/footer";
import Header from "@/components/header";
// import {
//   ArrowRightIcon,
//   GiftTopIcon,
//   HandRaisedIcon,
//   QuestionMarkCircleIcon,
// } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

const beninMapHandicapPercentage = [
  {
    name: "Alibori",
    value: 19680,
  },
  {
    name: "Atacora",
    value: 18100,
  },
  {
    name: "Atlantique",
    value: 38958,
  },
  {
    name: "Borgou",
    value: 28904,
  },
  {
    name: "Collines",
    value: 19300,
  },
  {
    name: "Couffo",
    value: 7689,
  },
  {
    name: "Donga",
    value: 20120,
  },
  {
    name: "Littoral",
    value: 23034,
  },
  {
    name: "Mono",
    value: 12003,
  },
  {
    name: "Ouémé",
    value: 17090,
  },
  {
    name: "Plateau",
    value: 12400,
  },
  {
    name: "Zou",
    value: 9790,
  },
];

export default function Home() {
  return (
    <>
      <Header />

      <div className="relative">
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 pt-14 lg:w-full lg:max-w-2xl">
            <svg
              className="absolute inset-y-0 right-8 hidden h-screen w-80 translate-x-1/2 transform fill-white lg:block"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="0,0 180,0 50,100 0,100" />
            </svg>

            <div className="relative px-6 py-32 sm:py-40 lg:px-0 lg:py-[16.6rem] lg:pr-0">
              <div className="mx-auto max-w-2xl lg:mx-0">
                <h1 className="text-4xl font-bold tracking-tighter text-gray-900 sm:text-[5rem] leading-[.9]">
                  Célébrons la diversité. <br /> Unis pour l&apos;égalité.
                </h1>
                <p className="mt-6 text-lg leading-8 tracking-tight text-gray-600">
                  Unis par la diversité, guidés par l&apos;inclusion - bienvenue
                  dans notre communauté dédiée à l&apos;émancipation des
                  personnes handicapées.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <Link
                    href="#"
                    className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-pink-200/80 animate-bounce hover:animate-none duration-300 ease-in-out"
                  >
                    <HeartIcon className="h-8 w-8 text-red-500" />
                    <span className="text-lg tracking-tight font-semibold">
                      Je veux faire un don
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <Image
            className="aspect-[3/2] object-cover lg:aspect-auto lg:h-screen lg:w-full"
            src="/images/handicap.png"
            width={3216}
            height={2136}
            alt=""
          />
        </div>
      </div>

      <main className="flex flex-col max-w-7xl mx-auto px-6 lg:px-8 my-36 gap-36">
        {/* <section>
          <h2 className="tracking-tighter font-bold text-blue-600 text-4xl">
            Tout le monde a un rôle à jouer.
          </h2>
          <p className="mt-2 tracking-tight text-gray-500">
            Ensemble, nous pouvons faire une différence. <br /> Découvrez
            comment vous pouvez contribuer à notre cause.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <div className="p-3 px-6 rounded-full border inline-flex items-center gap-5 shadow overflow-hidden hover:scale-105 duration-300">
              <HandRaisedIcon className="h-10 w-10 text-blue-400" />
              <div>
                <h3 className="text-2xl font-semibold tracking-tighter">
                  Bénévolat
                </h3>
                <p className="leading-5 tracking-tight text-sm text-gray-600 mt-2">
                  Bénévoles, étudiants, enseignants, salariés, entreprises,
                  sportifs, écoles. <br /> Vous avez toutes et tous le pouvoir
                  d&apos;agir.
                </p>
              </div>
            </div>

            <div className="p-3 px-6 rounded-full border inline-flex items-center gap-5 shadow overflow-hidden hover:scale-105 duration-300">
              <GiftTopIcon className="h-10 w-10 text-blue-400" />
              <div>
                <h3 className="text-2xl font-semibold tracking-tighter">
                  Aides Sociales
                </h3>
                <p className="leading-5 tracking-tight text-sm text-gray-600 mt-2">
                  Faites un don pour soutenir les personnes en situation de
                  handicap. <br /> Votre aide est précieuse.
                </p>
              </div>
            </div>

            <div className="p-3 px-6 rounded-full border inline-flex items-center gap-5 shadow overflow-hidden hover:scale-105 duration-300">
              <QuestionMarkCircleIcon className="h-10 w-10 text-blue-400" />
              <div>
                <h3 className="text-2xl font-semibold tracking-tighter">
                  Autres Actions
                </h3>
                <p className="leading-5 tracking-tight text-sm text-gray-600 mt-2">
                  Vous avez une idée, une suggestion ou une proposition ? <br />
                  Partagez-la avec nous.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="tracking-tighter font-bold text-blue-600 text-4xl">
            L&apos;actualité <br /> de la communauté.
          </h2>
          <p className="mt-2 tracking-tight text-gray-500">
            Découvrez les dernières actualités, les projets en cours et les
            événements à venir.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <div className="flex flex-col items-center justify-between gap-5 border p-3 rounded-[2.3rem]">
              <img
                src="https://www.handicap-international.fr/sn_uploads/federation/country/BENIN.jpg?maxw=1110&maxh=1110"
                alt="Jeune garçon pouvant désormais marcher grâce aux séances de réadaptation à base communautaire dont il bénéficie. Il peut se rendre à l’école et est intégré en cursus scolaire ordinaire."
                className="w-full h-52 object-cover rounded-[1.5rem]"
              />
              <div>
                <span className="text-base tracking-tighter mt-4 underline text-gray-400">
                  Handicap International
                </span>
                <h3
                  className="text-xl font-semibold tracking-tighter mt-3 line-clamp-3"
                  title="Au Bénin, HI œuvre à l’amélioration de la qualité de vie des personnes handicapées et favorise leur pleine participation à la vie économique et sociale du pays."
                >
                  Au Bénin, HI œuvre à l&apos;amélioration de la qualité de vie
                  des personnes handicapées et favorise leur pleine
                  participation à la vie économique et sociale du pays.
                </h3>
                <Link
                  href="/news/1"
                  className="w-full rounded-full py-3 inline-block mt-5 font-semibold bg-blue-100 text-center"
                >
                  Lire la suite
                </Link>
              </div>
            </div>
          </div>

          <Link
            href="/news"
            className="mt-10 block px-5 py-3 bg-blue-500 w-max rounded-full text-white tracking-tight font-semibold"
          >
            Tout voir
            <ArrowRightIcon className="h-5 w-5 inline-block ml-2" />
          </Link>
        </section> */}

        <section className="flex flex-col gap-20">
          <div>
            <h2 className="text-4xl font-bold tracking-tighter text-gray-900">
              Le handicap au Bénin. <br /> L’information par département
            </h2>
            <p className="mt-4 text-base tracking-tight leading-6 text-gray-600">
              Tous les indicateurs sont déclinés à l’échelle départementale mais
              aussi à l’échelle régionale et nationale (si les données sont
              disponibles). Cette approche permet d’accéder à une meilleure
              connaissance des caractéristiques de chaque département, de mettre
              en exergue ses particularités et de faire des comparaisons à
              différent niveau géographique.
            </p>
          </div>
          <div className="flex gap-2 justify-center">
            <Image
              src="/benin-map.png"
              className="w-[30rem]"
              width={2000}
              height={2222}
              alt="benin map"
              title="Pourcentage de personnes en situation de handicap par département au Bénin"
            />
            <div className="w-[45%]">
              <DoughnutChart
                data={{
                  labels: beninMapHandicapPercentage.map((d) => d.name),
                  datasets: [
                    {
                      label:
                        "Pourcentage de personnes en situation de handicap",
                      data: beninMapHandicapPercentage.map((d) => d.value),
                      backgroundColor: [
                        "rgba(255, 99, 132, 0.5)",
                        "rgba(54, 162, 235, 0.8)",
                        "rgba(255, 206, 86, 0.3)",
                        "rgba(75, 192, 192, 0.5)",
                        "rgba(153, 102, 255, 0.5)",
                        "rgba(255, 159, 64, 0.5)",
                        "rgba(255, 99, 132, 0.5)",
                        "rgba(54, 162, 235, 0.5)",
                        "rgba(255, 206, 86, 0.8)",
                        "rgba(75, 192, 192, 0.5)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 159, 64, 0.5)",
                      ],
                      borderWidth: 1,
                    },
                  ],
                }}
              />
            </div>
          </div>

          <div className="bg-gray-100 p-8 rounded-2xl flex justify-between items-center">
            <div className="max-w-3xl">
              <h3 className="text-2xl font-bold tracking-tighter">
                Besoin d&apos;informations plus détaillées ?{" "}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Nous mettons à votre disposition des données quantitatives et
                qualitatives sur le parcours des personnes en situation de
                handicap, les actions menées et les résultats obtenus à travers
                tout le pays.
              </p>
            </div>
            <Link
              href="#"
              className="px-8 py-4 rounded-full bg-blue-500 flex gap-3"
            >
              <span className="text-base font-semibold tracking-tight text-white">
                Faire une demande
              </span>
            </Link>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-3xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tighter text-gray-900 sm:text-5xl">
              Grâce à votre soutien, nous avons pu réaliser de grandes choses.
            </h2>
            <p className="mt-3 text-base leading-7 text-gray-600">
              Nous sommes fiers de ce que nous avons accompli ensemble. Voici
              quelques chiffres clés.
            </p>
          </div>
          <div className="mx-auto mt-16 flex max-w-2xl flex-col gap-8 lg:mx-0 lg:mt-20 lg:max-w-none lg:flex-row lg:items-end">
            <div className="flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-gray-100 p-8 sm:w-3/4 sm:max-w-md sm:flex-row-reverse sm:items-end lg:w-72 lg:max-w-none lg:flex-none lg:flex-col lg:items-start">
              <p className="flex-none text-3xl font-bold tracking-tighter text-gray-900">
                {beninMapHandicapPercentage.reduce(
                  (acc, cur) => acc + cur.value,
                  0
                )}
              </p>
              <div className="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
                <p className="text-lg font-semibold tracking-tight text-gray-900">
                  Personnes aidées
                </p>
                <p className="mt-2 text-base leading-6 text-gray-600 tracking-tighter">
                  Depuis notre création, jusqu&apos;à aujourd&apos;hui, nous
                  avons aidé toutes ces personnes en situation de handicap.
                </p>
              </div>
            </div>
            <div className="flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-gray-900 p-8 sm:flex-row-reverse sm:items-end lg:w-full lg:max-w-sm lg:flex-auto lg:flex-col lg:items-start lg:gap-y-40">
              <p className="flex-none text-3xl font-bold tracking-tighter text-white">
                250+ Millions <br /> FCFA
              </p>
              <div className="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
                <p className="text-lg font-semibold tracking-tight text-white">
                  Fonds collectés
                </p>
                <p className="mt-2 text-base leading-6 tracking-tighter text-gray-400">
                  Grâce à vos dons, nous avons pu collecter cette somme pour
                  financer nos actions.
                </p>
              </div>
            </div>
            <div className="flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-pink-500 p-8 sm:w-11/12 sm:max-w-xl sm:flex-row-reverse sm:items-end lg:w-full lg:max-w-none lg:flex-auto lg:flex-col lg:items-start lg:gap-y-28">
              <p className="flex-none text-3xl font-bold tracking-tighter text-white">
                10.000+
              </p>
              <div className="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
                <p className="text-lg font-semibold tracking-tight text-white">
                  Bénévoles engagés
                </p>
                <p className="mt-2 text-base leading-6 tracking-tighter text-indigo-200">
                  Grâce à l&apos;engagement de ces bénévoles, nous avons pu
                  réaliser de grandes choses. Merci à eux.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
