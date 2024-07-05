import { Metadata } from "next";
import Breadcrumb from "@/Components/Breadcrumbs/Breadcrumb";
import TableOne from "@/Components/Tables/TableOne";

export const metadata: Metadata = {
  title: "Next.js Tables | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const TablesPage = () => {
  return (
    <>
      <Breadcrumb pageName="Tables" />
      <div className="flex flex-col gap-10">
        <TableOne />
      </div>
    </>
  );
};

export default TablesPage;
