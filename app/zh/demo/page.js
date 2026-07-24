import { DemoPageContent } from "@/components/pages/demo";

export const metadata = {
  title: "产品体验 | HydroAgent-Lab",
  description:
    "HydroAgent 真实洪水预报会话的交互式回放：情景研判、参数方案选择、滚动预报、预警公报，全部发生在真实流域上。"
};

export default function DemoZhPage() {
  return <DemoPageContent lang="zh" />;
}
