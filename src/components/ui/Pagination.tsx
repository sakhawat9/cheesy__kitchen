import { MdChevronLeft, MdChevronRight } from "react-icons/md";

/**
 * Accessible pagination. The previous implementation rendered `<a href="#">`
 * elements, which broke keyboard/browser semantics and jumped to the top of
 * the document on every click; these are real buttons inside a labelled nav.
 * It also rendered every page number with no windowing.
 */
export default function Pagination({ currentPage, totalPages, onPageChange }: any) {
  if (totalPages <= 1) return null;

  const pages = pageWindow(currentPage, totalPages);

  return (
    <nav aria-label="Pagination" className="flex justify-center mt-12">
      <ul className="flex items-center gap-1.5">
        <li>
          <button
            type="button"
            className="btn-icon btn-icon-sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Go to previous page"
          >
            <MdChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>
        </li>

        {pages.map((page, index) =>
          page === "gap" ? (
            <li
              key={`gap-${index}`}
              className="px-1 select-none text-charcoal-400"
              aria-hidden="true"
            >
              &hellip;
            </li>
          ) : (
            <li key={page}>
              <button
                type="button"
                onClick={() => onPageChange(page)}
                aria-current={page === currentPage ? "page" : undefined}
                aria-label={`Go to page ${page}`}
                className={
                  page === currentPage
                    ? "inline-flex items-center justify-center w-9 h-9 text-sm font-semibold text-white border rounded-full bg-charcoal-900 border-charcoal-900"
                    : "inline-flex items-center justify-center w-9 h-9 text-sm font-medium transition-colors bg-white border rounded-full border-charcoal-200 text-charcoal-700 hover:border-charcoal-900 hover:text-charcoal-900"
                }
              >
                {page}
              </button>
            </li>
          ),
        )}

        <li>
          <button
            type="button"
            className="btn-icon btn-icon-sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Go to next page"
          >
            <MdChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </li>
      </ul>
    </nav>
  );
}

/** First, last, and the pages either side of the current one; "gap" elsewhere. */
function pageWindow(current: number, total: number): (number | "gap")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = new Set([1, total, current, current - 1, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);

  return sorted.flatMap((page, index) => {
    const previous = sorted[index - 1];
    return previous && page - previous > 1 ? ["gap" as const, page] : [page];
  });
}
