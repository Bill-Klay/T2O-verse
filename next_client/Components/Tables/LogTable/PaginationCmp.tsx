import ReactPaginate from "react-paginate";

type TableProps = {
  handlePageClick: (event: any) => void;
  total_pages: number;
};

const TableOne = ({ handlePageClick, total_pages }: TableProps) => {
  return (
    <>
      <div className="flex justify-center mt-4">
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next ->"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={total_pages}
          previousLabel="<- Previous"
          renderOnZeroPageCount={null}
          containerClassName="flex justify-center space-x-2"
          pageClassName="px-3 py-1 border border-gray-300 rounded"
          pageLinkClassName="text-black dark:text-white"
          previousClassName="px-3 py-1 border border-gray-300 rounded"
          previousLinkClassName="text-black dark:text-white"
          nextClassName="px-3 py-1 border border-gray-300 rounded"
          nextLinkClassName="text-black dark:text-white"
          breakClassName="px-3 py-1 border border-gray-300 rounded"
          breakLinkClassName="text-black dark:text-white"
          activeClassName="bg-meta-10 text-white"
        />
      </div>
    </>
  );
};

export default TableOne;
