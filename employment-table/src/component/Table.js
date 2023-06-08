function Table({ $app, initialState }) {
  const DUMMYDATA = [
    {
      name: "name1",
      title: "Designer",
      email: "jade@grepp.co",
      role: "Owner",
    },
    {
      name: "name2",
      title: "Front-End Developer",
      email: "sabastian@grepp.co",
      role: "Admin",
    },
    {
      name: "name3",
      title: "Director",
      email: "antony@grepp.co",
      role: "Owner",
    },
  ];

  this.state = initialState;

  this.$target = document.createElement("div");
  this.$target.className = "area";
  this.$target.id = "table";
  $app.append(this.$target);

  this.render = () => {
    const tableHead = `<thead>
    <tr>
        <th>name</th>
        <th>title</th>
        <th>email</th>
        <th>role</th>
      </tr>
    </thead>`;

    const getBodyHTML = (data) => {
      const body = [];
      data.map((item) => {
        body.push(`<tr>
            <td>${item.name}</td>
            <td>${item.title}</td>
            <td>${item.email}</td>
            <td>${item.role}</td>
          </tr>`);
      });
      console.log(body.join(""));
      return body.join("");
    };

    const tableBody = `<tbody>${getBodyHTML(DUMMYDATA)}</tbody>`;

    this.$target.innerHTML = `<table>${tableHead}${tableBody}</table>`;
  };

  this.render();
}

export default Table;
