import React from "react";
import styled from "styled-components";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { ParagraphS } from "./Typography";
import { Theme } from "./theme";

interface PaginationProps {
  nextPage: () => void;
  prevPage: () => void;
  pages: number[];
  gotoPage: (page: number) => void;
  index: number;
  pageCount: number;
  pageSize: number;
}

const NumberContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  width: 2.25rem;
  height: 2.25rem;
  cursor: pointer;
`;
const PageNumber = styled.a`
  float: left;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  &:active {
    background: ${Theme.colors.primaries_000};
    border-radius: 0.5rem;
  }
`;
const LeftSpacer = styled.div`
  margin-right: 0.625rem;
`;
const RightSpacer = styled.div`
  margin-left: 0.625rem;
`;
const PaginationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Number = ({ page, gotoPage, index, arrayIndex }) => {
  return (
    <NumberContainer onClick={() => gotoPage(page)}>
      <PageNumber
        style={{
          background: index === arrayIndex ? Theme.colors.primaries_000 : "",
          borderRadius: index === arrayIndex ? ".5rem" : "",
        }}
      >
        <ParagraphS
          color={index === arrayIndex ? Theme.colors.neutrals_500 : "black"}
          style={{ margin: 0 }}
        >
          {page + 1}
        </ParagraphS>
      </PageNumber>
    </NumberContainer>
  );
};

const PaginationArrows = ({ prevPage, nextPage, children }) => {
  return (
    <PaginationWrapper>
      <ChevronLeftIcon width={20} onClick={() => prevPage()} />
      <LeftSpacer />
      {children}
      <RightSpacer />
      <ChevronRightIcon width={20} onClick={() => nextPage()} />
    </PaginationWrapper>
  );
};

const FrontPagination = ({
  pages,
  prevPage,
  gotoPage,
  nextPage,
  index,
  pageCount,
}) => {
  return (
    <PaginationArrows nextPage={nextPage} prevPage={prevPage}>
      {pages.map((page, i) => {
        return (
          <>
            {page + 1 > 5 ? null : (
              <Number
                page={page}
                gotoPage={gotoPage}
                index={index}
                arrayIndex={i}
                key={i}
              />
            )}
            {page + 1 === 6 && (
              <ParagraphS style={{ margin: "0 0.625rem" }}>...</ParagraphS>
            )}
            {page + 1 === pageCount ? (
              <Number
                page={page}
                gotoPage={gotoPage}
                index={index}
                arrayIndex={i}
                key={i}
              />
            ) : null}
          </>
        );
      })}
    </PaginationArrows>
  );
};
const RearPagination = ({
  pages,
  prevPage,
  gotoPage,
  nextPage,
  index,
  pageCount,
}) => {
  return (
    <PaginationArrows nextPage={nextPage} prevPage={prevPage}>
      {pages.map((page, i) => {
        return (
          <>
            {page + 1 > 1 ? null : (
              <Number
                page={page}
                gotoPage={gotoPage}
                index={index}
                arrayIndex={i}
                key={i}
              />
            )}
            {page + 1 === 6 && (
              <ParagraphS style={{ margin: "0 0.625rem" }}>...</ParagraphS>
            )}
            {page + 1 > pageCount - 5 ? (
              <Number
                page={page}
                gotoPage={gotoPage}
                index={index}
                arrayIndex={i}
                key={i}
              />
            ) : null}
          </>
        );
      })}
    </PaginationArrows>
  );
};

const MidPagination = ({
  pages,
  prevPage,
  gotoPage,
  nextPage,
  index,
  pageCount,
}) => {
  const slicedPages = pages.map((page) => page).slice(index - 2, index + 3);
  return (
    <PaginationArrows nextPage={nextPage} prevPage={prevPage}>
      {
        <>
          <Number
            page={pages[0]}
            gotoPage={gotoPage}
            index={index}
            arrayIndex={pages[0]}
          />
          <ParagraphS style={{ margin: "0 0.625rem" }}>...</ParagraphS>
          {slicedPages.map((page, i) => {
            return (
              <Number
                page={page}
                gotoPage={gotoPage}
                index={index}
                arrayIndex={page}
              />
            );
          })}
          <ParagraphS style={{ margin: "0 0.625rem" }}>...</ParagraphS>
          <Number
            page={pages.length - 1}
            gotoPage={gotoPage}
            index={index}
            arrayIndex={pages.length - 1}
          />
        </>
      }
    </PaginationArrows>
  );
};

const paginationLogic = (
  pages,
  prevPage,
  gotoPage,
  nextPage,
  index,
  pageCount
) => {
  if (index + 1 < 5) {
    return (
      <FrontPagination
        pages={pages}
        prevPage={prevPage}
        gotoPage={gotoPage}
        nextPage={nextPage}
        index={index}
        pageCount={pageCount}
      />
    );
  }
  if (index + 1 > 4 && index + 1 < pageCount - 3) {
    return (
      <MidPagination
        pages={pages}
        prevPage={prevPage}
        gotoPage={gotoPage}
        nextPage={nextPage}
        index={index}
        pageCount={pageCount}
      />
    );
  }
  if (index + 1 > pageCount - 4) {
    return (
      <RearPagination
        pages={pages}
        prevPage={prevPage}
        gotoPage={gotoPage}
        nextPage={nextPage}
        index={index}
        pageCount={pageCount}
      />
    );
  }
  return null;
};

export const Pagination = ({
  prevPage,
  nextPage,
  pages,
  gotoPage,
  index,
  pageCount,
  pageSize,
}: PaginationProps) => {
  return pageCount > 10 ? (
    paginationLogic(pages, prevPage, gotoPage, nextPage, index, pageCount)
  ) : (
    <PaginationArrows nextPage={nextPage} prevPage={prevPage}>
      {pages.map((page, i) => {
        return (
          <Number
            page={page}
            gotoPage={gotoPage}
            index={index}
            arrayIndex={i}
            key={i}
          />
        );
      })}
    </PaginationArrows>
  );
};
