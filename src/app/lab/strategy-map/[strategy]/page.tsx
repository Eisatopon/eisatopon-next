import { strategies } from "../strategies-data";
import StrategyClient from "./StrategyClient";

export function generateStaticParams() {
  return strategies.map((s) => ({ strategy: s.id }));
}

export default async function StrategyPage({
  params,
}: {
  params: Promise<{ strategy: string }>;
}) {
  const { strategy } = await params;
  return <StrategyClient strategyId={strategy} />;
}