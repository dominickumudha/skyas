import React from "react"
import DataTable from "react-data-table-component"
import { Card, CardBody } from "reactstrap"
import { masterListPageTableTheme } from "../../constants/defaultValues"
import { withTranslation } from "react-i18next"

class ListPage extends React.Component {
  render() {
    return (
      // <Card style={{ paddingBottom: "32px" }}>
      <Card>
        <CardBody>
          <DataTable
            style={{ cursor: "pointer" }}
            customTheme={masterListPageTableTheme}
            striped
            className={"overFlowXRemoval table-responsive overFlowXMobile"}
            columns={this.props.columns}
            progressComponent={
              <div className="spinner-border text-primary m-1" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            }
            data={this.props.data}
            progressPending={this.props.isDataLoading}
            keyField={this.props.keyField}
            highlightOnHover={true}
            noHeader
            onSort={this.props.onSort}
            onRowClicked={this.props.rowClicked}
            pagination={this.props.pagination === "empty" ? null : true}
            paginationServer
            paginationResetDefaultPage={
              this.props.resetPage ? this.props.resetPage : false
            }
            paginationPerPage={this.props.pageLimit ? this.props.pageLimit : 10}
            paginationRowsPerPageOptions={
              this.props.pageSizeOptions
                ? this.props.pageSizeOptions
                : [10, 25, 50, 100]
            }
            paginationTotalRows={this.props.totalCount}
            onChangeRowsPerPage={this.props.rowsPerPageOnChange}
            onChangePage={this.props.pageChange}
            conditionalRowStyles={this.props.conditionalRowStyles}
          />
        </CardBody>
      </Card>
    )
  }
}

export default withTranslation()(ListPage)
