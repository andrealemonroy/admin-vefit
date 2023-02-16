import React, { Fragment, useEffect, useState } from 'react';
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
  useFilters,
} from 'react-table';
import styled from 'styled-components';
import { PlusIcon, AdjustmentsIcon, XIcon } from '@heroicons/react/outline';
import get from 'lodash/get';
import { ParagraphS, TitleM } from '../atoms/Typography';
import { Input } from '../atoms/Input';
import { Button, ButtonOutline } from '../atoms/Button';
import { Theme } from '../atoms/theme';
import { Pagination } from '../atoms/Pagination';
import {
  TableWrapper,
  TableStyle,
  TableH,
  TableData,
  HeaderText,
  HeaderWrapper,
  PaginationWrapper,
  DownArrow,
  UpArrow,
} from './SharedTableStyles';
import { useForm } from 'react-hook-form';
import { CustomSelect } from '../atoms/Select';
import { Tooltip } from '../atoms/Tooltip';
import { getColumnSize } from '../../utils/tableSize';
const FilterButtonContainer = styled.div`
  display: flex;
  margin-left: 1rem;
  margin-right: 1rem;
`;

const FilterWrapper = styled.div`
  display: flex;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background-color: ${Theme.colors.neutrals_100};
  opacity: 0.5;
  z-index: 998;
`;

const FilterSideBar = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0px;
  right: 0px;
  width: 21.25rem;
  background-color: ${Theme.colors.neutrals_500};
  opacity: 1;
  height: 100vh;
  z-index: 999;
  overflow: scroll;
`;

const FilterTitleContainer = styled.div`
  display: flex;
  margin-left: 2rem;
  margin-top: 2rem;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  margin-right: 2rem;
`;

const CUSTOM_RENDER_COLUMNS = ['Status', 'Actions', 'Requests', 'FV Status'];

interface ITable {
  columns: any;
  data: any;
  rowClick?: any;
  showFilter?: any;
  onClick?: any;
  showAddNewConnection?: any;
  openModal?: any;
  tableType?: string;
}

export const Table = ({
  columns,
  data,
  rowClick,
  showFilter,
  onClick,
  showAddNewConnection,
  openModal,
  tableType,
}: ITable) => {
  const tableInstance = useTable(
    {
      columns,
      data,
      rowClick,
      initialState: { pageSize: 10 },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
    pageCount,
    pageSize,
    gotoPage,
    nextPage,
    previousPage,
    allColumns,
    setFilter,
  } = tableInstance;
  const { globalFilter, pageIndex } = state;
  const pages = Array.from(Array(pageCount).keys());
  const [openFilters, setOpenFilters] = useState(false);
  const [filterInputs, setFilterInputs] = useState<any>([]);
  const form = useForm();
  const filtersLength = Object.values(form.watch()).reduce((acc, curr) => {
    if ((typeof curr === 'string' && curr === '') || curr === undefined) {
      return acc;
    } else if (curr === null) {
      return acc;
    } else if (
      typeof curr === 'object' &&
      (Object.values(curr)[0] === undefined ||
        Object.values(curr)[0] === '' ||
        Object.values(curr)[0] === null)
    ) {
      return acc;
    } else return acc + 1;
  }, 0);

  const cancelFilters = () => {
    form.reset();
    filter();
    setOpenFilters(false);
  };

  useEffect(() => {
    let newData: any[] = [];
    allColumns.map((column: any) => {
      newData.push({
        id: column.id,
        label: column.Header,
        type: 'text',
        required: false,
        clearButton: true,
        select: !!column.options,
        options: column.options,
        canFilter: column.canFilter,
      });
      return column;
    });

    setFilterInputs(newData);
  }, [allColumns]);

  const filter = form.handleSubmit(() => {
    const newFilterInputValues = form.getValues();
    const getValue = (obj: any, key: string) => {
      const keys = key.split('.');
      return get(obj, keys);
    };
    allColumns.map((column) => {
      if (getValue(newFilterInputValues, column.id) !== null) {
        if (
          typeof getValue(newFilterInputValues, column.id) === 'string' &&
          getValue(newFilterInputValues, column.id) !== ''
        ) {
          setFilter(column.id, getValue(newFilterInputValues, column.id));
        } else if (
          typeof getValue(newFilterInputValues, column.id) === 'object' &&
          column.id !== 'state'
        ) {
          const { label } = getValue(newFilterInputValues, column.id);
          setFilter(column.id, label);
        } else if (column.id === 'state') {
          const { value } = getValue(newFilterInputValues, column.id);
          setFilter(column.id, value);
        } else {
          setFilter(column.id, undefined);
        }
      } else {
        setFilter(column.id, undefined);
      }
      return column;
    });
    setOpenFilters(false);
  });

  const resetFilters = () => {
    form.reset();
    filter();
  };

  return (
    <>
      <TableWrapper>
        {openFilters && (
          <Fragment>
            <FilterWrapper onClick={() => cancelFilters()}></FilterWrapper>
            <FilterSideBar>
              <FilterTitleContainer>
                <TitleM>Filter</TitleM>
              </FilterTitleContainer>
              <FilterContainer>
                {filtersLength > 0 && (
                  <div style={{ width: '100%' }}>
                    <ButtonOutline
                      width={'100%'}
                      noText={true}
                      buttonText={`Reset ${filtersLength} filters`}
                      onClick={() => resetFilters()}
                      color={Theme.colors.primaries_000}
                      filter={true}
                    />
                  </div>
                )}

                <form>
                  {filterInputs.map(
                    (input) =>
                      input.canFilter &&
                      (input.select || input.type === 'state' ? (
                        <div style={{ marginTop: '2.25rem', display: 'flex' }}>
                          <CustomSelect
                            {...form.register(input.id)}
                            label={input.label}
                            id={input.id}
                            options={input.options}
                            setValue={(value) => {
                              form.setValue(input.id, value);
                            }}
                            value={form.watch(input.id)}
                            name={input.name}
                          />
                          {form.watch(input.id)?.value?.length > 0 && (
                            <div style={{ marginTop: '1.75rem' }}>
                              <ButtonOutline
                                icon={true}
                                color={Theme.colors.primaries_000}
                                hoverColor={Theme.colors.primaries_neg100}
                                width={'2.75rem'}
                                onClick={() => form.setValue(input.id, null)}
                                img={
                                  <XIcon
                                    width={'0.938rem'}
                                    color={Theme.colors.primaries_000}
                                  />
                                }
                              />
                            </div>
                          )}
                        </div>
                      ) : (
                        <div style={{ marginTop: '2.25rem', display: 'flex' }}>
                          <Input
                            {...form.register(input.id)}
                            noLabel={true}
                            labelText={input.label}
                            required={input.required}
                            icon={input.icon}
                            img={input.img}
                            width={'100%'}
                            type={input.type}
                            placeholderText={
                              input.placeholder
                                ? input.placeholder
                                : input.label
                            }
                            setFormValue={(value) => {
                              form.setValue(input.id, value);
                              return value;
                            }}
                          />
                          {form.watch(input.id)?.length > 0 && (
                            <div
                              style={{
                                marginTop: '1.75rem',
                                marginLeft: '0.5rem',
                              }}
                            >
                              <ButtonOutline
                                icon={true}
                                color={Theme.colors.primaries_000}
                                hoverColor={Theme.colors.primaries_neg100}
                                width={'2.75rem'}
                                onClick={() => form.setValue(input.id, null)}
                                img={
                                  <XIcon
                                    width={'0.938rem'}
                                    color={Theme.colors.primaries_000}
                                  />
                                }
                              />
                            </div>
                          )}
                        </div>
                      ))
                  )}
                  <div
                    style={{
                      display: 'flex',
                      marginBottom: '2.25rem',
                      marginTop: '2.25rem',
                    }}
                  >
                    <ButtonOutline
                      style={{ margin: 0 }}
                      buttonText={'Cancelar'}
                      icon={false}
                      color={Theme.colors.primaries_000}
                      hoverColor={Theme.colors.primaries_neg100}
                      noText={true}
                      onClick={() => {
                        cancelFilters();
                      }}
                      width={'100%'}
                    />
                    <Button
                      style={{ marginLeft: '1rem', marginRight: 0 }}
                      buttonText={'Filtrar'}
                      icon={false}
                      color={Theme.colors.primaries_000}
                      hoverColor={Theme.colors.primaries_neg100}
                      noText={true}
                      width="100%"
                      onClick={() => filter()}
                    />
                  </div>
                </form>
              </FilterContainer>
            </FilterSideBar>
          </Fragment>
        )}
        <div
          style={{
            marginBottom: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Input
            noLabel={false}
            type="text"
            error={false}
            required={true}
            icon={true}
            width={showFilter ? '76%' : '88%'}
            filter={globalFilter}
            setFilter={setGlobalFilter}
            placeholderText="Buscar"
            img={
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.5 16.5L11.5 11.5M13.1667 7.33333C13.1667 10.555 10.555 13.1667 7.33333 13.1667C4.11167 13.1667 1.5 10.555 1.5 7.33333C1.5 4.11167 4.11167 1.5 7.33333 1.5C10.555 1.5 13.1667 4.11167 13.1667 7.33333Z"
                  stroke="#ADB5BD"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            }
          />
          <FilterButtonContainer>
            <ButtonOutline
              icon={true}
              color={Theme.colors.primaries_000}
              hoverColor={Theme.colors.primaries_neg100}
              noText={true}
              width={'8.25rem'}
              buttonText={`Filtros ${
                filtersLength > 0 ? '(' + filtersLength + ')' : ''
              }`}
              onClick={() => setOpenFilters(true)}
              img={
                <AdjustmentsIcon
                  width={'0.938rem'}
                  color={Theme.colors.primaries_000}
                />
              }
            />
          </FilterButtonContainer>

          {showAddNewConnection ? (
            <Button
              icon={true}
              color={Theme.colors.primaries_000}
              hoverColor={Theme.colors.primaries_neg100}
              noText={true}
              width={'40%'}
              buttonText="Add new Connection"
              onClick={openModal}
              img={
                <PlusIcon
                  width={'0.938rem'}
                  color={Theme.colors.neutrals_500}
                />
              }
            />
          ) : (
            <Button
              icon={true}
              color={Theme.colors.primaries_000}
              hoverColor={Theme.colors.primaries_neg100}
              noText={true}
              width={'9rem'}
              buttonText="Añadir"
              onClick={onClick}
              img={
                <PlusIcon
                  width={'0.938rem'}
                  color={Theme.colors.neutrals_500}
                />
              }
            />
          )}
        </div>
        <TableStyle {...getTableProps()}>
          <thead
            style={{ borderBottom: `2px solid ${Theme.colors.neutrals_400}` }}
          >
            {headerGroups.map((headerGroup) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                {headerGroup.headers.map((column, index) => {
                  return (
                    <TableH
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      style={{
                        width: getColumnSize(tableType, index),
                        cursor: column.canFilter ? 'pointer' : 'default',
                      }}
                    >
                      <HeaderWrapper>
                        <HeaderText sorted={column.isSorted}>
                          {column.render('Header')}
                        </HeaderText>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <DownArrow />
                          ) : (
                            <UpArrow />
                          )
                        ) : (
                          ''
                        )}
                      </HeaderWrapper>
                    </TableH>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody
            {...getTableBodyProps()}
            style={{
              maxHeight: '50vh',
              overflow: 'auto',
              display: 'block',
              // transform: "translate(0,0)",
            }}
          >
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: `2px solid ${Theme.colors.neutrals_400}`,
                  }}
                >
                  {row.cells.map((cell: any, index) => {
                    const RenderedCell = cell.render('Cell');
                    return CUSTOM_RENDER_COLUMNS.includes(
                      cell.column.Header
                    ) ? (
                      <TableData
                        key={index}
                        style={{
                          width: getColumnSize(tableType, index),
                        }}
                      >
                        {RenderedCell}
                      </TableData>
                    ) : (
                      <TableData
                        key={index}
                        style={{
                          width: getColumnSize(tableType, index),
                        }}
                      >
                        {cell.column.includeToolTip ? (
                          <Tooltip
                            text={RenderedCell}
                            position="top"
                            background={Theme.colors.neutrals_000}
                          >
                            <ParagraphS
                              style={{
                                margin: 0,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                              }}
                              color={Theme.colors.neutrals_100}
                            >
                              {RenderedCell}
                            </ParagraphS>
                          </Tooltip>
                        ) : (
                          <ParagraphS
                            style={{
                              margin: 0,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                            color={Theme.colors.neutrals_100}
                          >
                            {RenderedCell}
                          </ParagraphS>
                        )}
                      </TableData>
                    );
                  })}
                </tr>
              );
            })}
            {data.length === 0 && <div className='h-20 flex justify-center items-center'><ParagraphS>No hay información</ParagraphS></div>}
          </tbody>
        </TableStyle>
      </TableWrapper>
      {pages.length > 1 ? (
        <PaginationWrapper>
          <Pagination
            pages={pages}
            pageCount={pageCount}
            pageSize={pageSize}
            nextPage={nextPage}
            prevPage={previousPage}
            index={pageIndex}
            gotoPage={gotoPage}
          />
        </PaginationWrapper>
      ) : null}
    </>
  );
};
