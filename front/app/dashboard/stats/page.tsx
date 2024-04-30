"use client";

import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import faker from "faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: "top" as const,
    },
  },
};

// Département of Benin
const departements = [
  "Alibori",
  "Atacora",
  "Atlantique",
  "Borgou",
  "Collines",
  "Couffo",
  "Donga",
  "Littoral",
  "Mono",
  "Ouémé",
  "Plateau",
  "Zou",
];

// Handicap
const handicaps = [
  "Autisme",
  "Déficience auditive",
  "Déficience intellectuelle",
  "Déficience motrice",
  "Déficience visuelle",
  "Handicap psychique",
  "Polyhandicap",
  "Troubles du spectre de l'autisme",
  "Troubles psychiques",
  "Troubles spécifiques du langage",
  "Troubles spécifiques des apprentissages",
  "Troubles du comportement",
  "Troubles du développement",
  "Troubles du langage oral",
  "Troubles du langage écrit",
];

export default function Page() {
  const [handicap, setHandicap] = React.useState(handicaps[0]);
  const [ReData, setReData] = React.useState<number[]>();

  useEffect(() => {
    const data = departements.map(() =>
      faker.datatype.number({ min: 2000, max: 70000 })
    );
    setReData(data);
  }, [handicap]);

  const data = {
    labels: departements,
    datasets: [
      {
        label: "Dataset 1",
        data: ReData,
        backgroundColor: "rgb(37 99 235 / 75%)",
      },
    ],
  };

  return (
    <div>
      <h1 className="text-4xl font-bold tracking-tighter">Statistiques</h1>
      <p className="mt-2">
        Vous pouvez voir les statistiques par types d&apos;handicap et par
        département.
      </p>

      <section className="mt-14">
        <div className="w-96">
          <label
            htmlFor="location"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Choisir un handicap
          </label>
          <select
            className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={(e) => setHandicap(e.target.value)}
          >
            {handicaps.map((handicap) => (
              <option key={handicap}>{handicap}</option>
            ))}
          </select>
        </div>

        <Bar options={options} data={data} className="mt-10" />
      </section>
    </div>
  );
}
