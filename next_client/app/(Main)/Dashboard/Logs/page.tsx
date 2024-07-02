import { Metadata } from "next";
import DefaultLayout from "@/Components/Layouts/DefaultLayout";
import Breadcrumb from "@/Components/Breadcrumbs/Breadcrumb";
import TableOne from "@/Components/Tables/TableOne";
import TableTwo from "@/Components/Tables/TableTwo";
import TableThree from "@/Components/Tables/TableThree";

export const metadata: Metadata = {
  title: "Next.js Tables | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <TableOne />
        {/* <TableTwo />
        <TableThree /> */}
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
