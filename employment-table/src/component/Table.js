function Table({ $app, initialState }) {
  this.state = initialState;

  this.$target = document.createElement("div");
  this.$target.className = "area";
  this.$target.id = "table";
  $app.append(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const tableHead = `<thead>
      <tr>
          <th>name</th>
          <th>title</th>
          <th>email</th>
          <th>role</th>
        </tr>
      </thead>`;

    const getBodyHTML = () => {
      const body = [];
      const { tableData, perData, currentPage } = this.state;

      const startDataIdx = (currentPage - 1) * perData;
      const tableDataset = tableData.slice(
        startDataIdx,
        startDataIdx + perData
      );

      tableDataset.map((item) => {
        const { name, title, email, role } = item;
        body.push(`<tr>
              <td>${name}</td>
              <td>${title}</td>
              <td>${email}</td>
              <td>${role}</td>
            </tr>`);
      });

      return body.join("");
    };

    const tableBody = `<tbody>${getBodyHTML()}</tbody>`;

    this.$target.innerHTML = `<table>${tableHead}${tableBody}</table>`;
  };

  this.render();
}

export default Table;
