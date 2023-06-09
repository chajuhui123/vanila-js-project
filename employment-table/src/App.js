import Dropdown from "/web/src/component/Dropdown.js";
import Table from "/web/src/component/Table.js";
import Pagination from "/web/src/component/Pagination.js";
import { api } from "/web/src/api/api.js";

function App($app) {
  this.state = {
    perData: 5,
    tableData: [],
    currentPage: 1,
  };

  const dropdown = new Dropdown({
    $app,
    initialState: this.state.perData,
    handleChangePerData: (perData) => {
      this.setState({ ...this.state, currentPage: 1, perData: perData });
    },
  });
  const table = new Table({
    $app,
    initialState: {
      tableData: this.state.tableData,
      perData: this.state.perData,
      currentPage: this.state.currentPage,
    },
  });
  const pagination = new Pagination({
    $app,
    initialState: {
      tableData: this.state.tableData,
      perData: this.state.perData,
      currentPage: this.state.currentPage,
    },
    handlePickPage: (pageNum) => {
      this.setState({ ...this.state, currentPage: pageNum });
    },
  });

  this.setState = (nextState) => {
    this.state = nextState;
    dropdown.setState(this.state.perData);
    table.setState(nextState);
    pagination.setState(nextState);
  };

  this.init = async () => {
    try {
      await api
        .fetchTableData()
        .then((data) => this.setState({ ...this.state, tableData: data }));
    } catch (e) {
      throw new Error(e);
    }
  };

  this.init();
}

export default App;
