import { DemoPageContent } from "@/components/pages/demo";

export const metadata = {
  title: "Demo | HydroAgent-Lab",
  description:
    "Interactive replays of real HydroAgent flood-forecasting sessions: situation assessment, parameter scheme selection, rolling forecast and warning bulletin on a real basin."
};

export default function DemoPage() {
  return <DemoPageContent lang="en" />;
}
