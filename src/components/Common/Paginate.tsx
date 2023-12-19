interface Props {
    currentPage: number;
    totalPages: number;
    handlePageChange: (newPage: number) => void;
}

const Paginate = (props: Props) => {
  return (
    <div className="space-x-5">
      <button
        className="paginate-btn"
        onClick={() => props.handlePageChange(props.currentPage - 1)}
        disabled={props.currentPage === 1}
      >
        &laquo; Previous
      </button>
      <span>
        {props.currentPage} / {props.totalPages}
      </span>
      <button
        className="paginate-btn"
        onClick={() => props.handlePageChange(props.currentPage + 1)}
        disabled={props.currentPage === props.totalPages}
      >
        Next &raquo;
      </button>
    </div>
  );
};

// {paginateData.meta.links ? (
//     paginateData.meta.links.map((item: any) =>
//       item.label == "&laquo; Previous" ? (
//         <button
//           className="paginate-btn"
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//         >
//           &laquo; Previous
//         </button>
//       ) : item.label == "Next &raquo;" ? (
//         <button
//           className="paginate-btn"
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//         >
//           Next &raquo;
//         </button>
//       ) : (
//         <span className="bg-blue-500 text-white p-2 rounded-md">{item.label}</span>
//         // <span>{currentPage} of {totalPages}</span>
//       )
//     )
//   ) : (
//     <div className="blog-error">Error loading</div>
//   )}

export default Paginate;
