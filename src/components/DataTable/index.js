import React from "react";
import {
  Pagination,
  PaginationOpts,
  TableHeader,
  TableBody,
  Filter,
  useDatatableLifecycle,
  shouldTableUpdate,
} from "react-bs-datatable";
import "./styles.css";

const DataTable = React.memo((props) => {
  const {
    data,
    rowsPerPageOption,
    tableHeaders,
    onChangeFilter,
    onPageNavigate,
    classes,
    onRowsPerPageChange,
    onSortChange,
    tableClass,
    labels,
    filterable,
    filterText,
    rowsPerPage,
    currentPage,
    sortedProp,
    maxPage,
    Components,
    onRowClick,
  } = useDatatableLifecycle(props);

  return (
    <>
      <Components.Row className="controlRow__root">
        <Components.Col xs="12" md="4">
          <Filter
            classes={classes}
            tableHeaders={tableHeaders}
            placeholder={labels.filterPlaceholder}
            onChangeFilter={onChangeFilter}
            filterText={filterText}
            filterable={filterable}
            components={{
              Adornment: Components.Adornment,
              Button: Components.Button,
              ClearIcon: Components.ClearIcon,
              FormControl: Components.FormControl,
              InputGroup: Components.InputGroup,
            }}
          />
        </Components.Col>

        <Components.Col xs="12" md="4">
          <PaginationOpts
            classes={classes}
            labels={labels}
            onRowsPerPageChange={onRowsPerPageChange}
            rowsPerPage={rowsPerPage}
            rowsPerPageOption={rowsPerPageOption}
            components={{
              Form: Components.Form,
              FormGroup: Components.FormGroup,
              FormControl: Components.FormControl,
            }}
          />
        </Components.Col>

        <Components.Col xs="12" md="4" className="text-center">
          <Pagination
            classes={classes}
            data={data}
            rowsPerPage={rowsPerPage}
            currentPage={currentPage}
            onPageNavigate={onPageNavigate}
            labels={labels}
            maxPage={maxPage}
            components={{
              Button: Components.Button,
              ButtonGroup: Components.ButtonGroup,
            }}
          />
        </Components.Col>
      </Components.Row>

      <Components.Row>
        <Components.Col xs="12">
          <div className="table-responsive">
            <Components.Table className={tableClass}>
              <TableHeader
                classes={classes}
                tableHeaders={tableHeaders}
                sortedProp={sortedProp}
                onSortChange={onSortChange}
                components={{
                  TableHead: Components.TableHead,
                  TableCell: Components.TableCell,
                  TableRow: Components.TableRow,
                }}
              />
              <TableBody
                classes={classes}
                tableHeaders={tableHeaders}
                labels={labels}
                data={data}
                onRowClick={onRowClick}
                components={{
                  TableBody: Components.TableBody,
                  TableCell: Components.TableCell,
                  TableRow: Components.TableRow,
                }}
              />
            </Components.Table>
          </div>
        </Components.Col>
      </Components.Row>
    </>
  );
}, shouldTableUpdate);

export default DataTable;
