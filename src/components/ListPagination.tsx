import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
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
  numberOfPageButtons = 0,
}: {
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  refetchPreviousPage: () => void;
  refetchNextPage: () => void;
  numberOfPageButtons?: number;
}) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button disabled={!hasPreviousPage} onClick={refetchPreviousPage}>
            <PaginationPrevious> {"<"} </PaginationPrevious>
          </Button>
        </PaginationItem>
        {[...Array(numberOfPageButtons)].map((_, index) => (
          <PaginationItem key={index}>
            <Button>{index + 1}</Button>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
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
