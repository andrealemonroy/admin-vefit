import styled from "styled-components";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";

import { SubtitlesM } from "../atoms/Typography";

const Down = ({ className }) => <ChevronDownIcon className={className} />;
const Up = ({ className }) => <ChevronUpIcon className={className} />;

export const TableWrapper = styled.div`
  background: #fff;
  width: 100%;
  border-radius: 0.75rem;
  padding: 1rem;
  padding-bottom: 0;
  max-height: 72vh;
  box-shadow: ${({ theme }) => theme.shadows.dropshadow_m};
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;
export const TableStyle = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  height: 100%;
  overflow: hidden;
  transform: translate(0, 0);
  th:nth-last-child(1) {
    width: 6.25rem;
  }
`;
export const TableH = styled.th`
  text-align: center;
  padding-bottom: 1rem;
  display: flex;
  justify-content: center;
`;
export const TableData = styled.td`
  align-items: center;
  display: flex;
  height: 76px;
  justify-content: center;
`;
export const TableButtonsWrapper = styled.div`
  display: flex;
  width: ${({ showFilter }) => (showFilter ? "22%" : "12%")};
  justify-content: ${({ showFilter }) =>
    showFilter ? "space-between" : "flex-end"};
`;
export const PaginationWrapper = styled.div`
  margin-top: 1.5rem;
`;
export const HeaderText = styled(SubtitlesM)`
  margin: 0;
  ${({ sorted, theme }) => {
    if (sorted) {
      return `color: ${theme.colors.primaries_000};`;
    }
  }}
`;
export const HeaderWrapper = styled.div`
  display: flex;
  &:hover h2,
  :hover svg {
    color: ${({ theme }) => theme.colors.primaries_neg100};
  }
`;
export const DownArrow = styled(Down)`
  width: 20px;
  margin-left: 8px;
  color: ${({ theme }) => theme.colors.primaries_000};
`;
export const UpArrow = styled(Up)`
  width: 20px;
  margin-left: 8px;
  color: ${({ theme }) => theme.colors.primaries_000};
`;
export const InputsWrapper = styled.div`
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
`;
