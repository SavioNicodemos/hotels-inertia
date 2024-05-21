import Header from "@/Components/Header";
import { Head } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export const PageLayout = ({
  children,
  showSearch = false,
  title = "",
}: PropsWithChildren<{ showSearch?: boolean; title?: string }>) => {
  return (
    <main>
      <Head title={title} />
      <Header showSearch={showSearch} />

      <div style={{ paddingTop: 60, paddingBottom: 16 }}>{children}</div>
    </main>
  );
};
