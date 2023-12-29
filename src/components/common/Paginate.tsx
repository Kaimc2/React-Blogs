interface Props {
    currentPage: number;
    totalPages: number;
    handlePageChange: (newPage: number) => void;
}

const Paginate = (props: Props) => {
  return (
    <div className="space-x-5 dark:text-slate-300">
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

export default Paginate;
