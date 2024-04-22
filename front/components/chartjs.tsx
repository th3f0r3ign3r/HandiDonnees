"use client";

import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { PolarArea, Doughnut } from "react-chartjs-2";

type ChartProps = {
  data: any;
};

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend, Title);

export function PolarAreaChart({ data }: ChartProps) {
  return <PolarArea data={data} />;
}

export function DoughnutChart({ data }: ChartProps) {
  return <Doughnut data={data} />;
}