import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

export function ListPagination({
  hasNextPage,
  hasPreviousPage,
  refetchPreviousPage,
  refetchNextPage,
}: {
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  refetchPreviousPage: () => void;
  refetchNextPage: () => void;
}) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button disabled={!hasPreviousPage} onClick={refetchPreviousPage}>
            <PaginationPrevious> {"<"} </PaginationPrevious>
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button disabled={!hasNextPage} onClick={refetchNextPage}>
            <PaginationNext> {">"} </PaginationNext>
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
