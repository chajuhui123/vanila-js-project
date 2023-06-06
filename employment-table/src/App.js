import Table from "./components/Table.js";

export default function App($app) {
  this.state = {
    currentPage: 1,
    pageNumber: 5,
    perData: 15,
    tableData: [],
  };

  // TODO : Table
  const table = new Table({ $app, initialState: this.state.tableData });

  // TODO : PageSelector

  // TODO : DropDown

  this.setState = (nextState) => {
    this.state = nextState;
    table.setState(this.state.tableData);
  };

  // this.init();
}
