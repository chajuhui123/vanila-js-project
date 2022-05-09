import { request } from "./api/api";
import Breadcrumb from "./component/Breadcrumb";
import ImageView from "./component/ImageView";
import Nodes from "./component/Nodes";

export default function App($app) {
  this.state = {
    isRoot: false,
    nodes: [],
    depth: [],
    selectedFilePath: null,
  };

  const breadcrumb = new Breadcrumb({ $app, initialState: this.state.depth });

  const nodes = new Nodes({
    $app,
    initialState: this.state.nodes,
    onClick: async (node) => {
      if (node.type === "DIRECTORY") {
        const nextNodes = await request(node.id);
        this.setState({
          ...this.state,
          isRoot: false,
          depth: [...this.state.depth, node],
          nodes: nextNodes,
        });
      } else if (node.type === "FILE") {
      }
    },
  });

  const imageView = new ImageView({
    $app,
    initialState: this.state.selectedFilePath,
    onClick: (e) => {
      if (e.target.nodeName !== "IMG")
        this.setState({ ...this.state, selectedFilePath: null });
    },
  });

  this.setState = (nextState) => {
    this.state = nextState;
    breadcrumb.setState(this.state.depth);
    nodes.setState({ isRoot: this.state.isRoot, nodes: this.state.nodes });
    imageView.setState(this.state.selectedFilePath);
  };

  this.init = async () => {
    try {
      const rootNodes = await request();
      window.addEventListener("keydown", (e) => {
        // esc 를 누르는 경우
        if (e.key === "Escape")
          this.setState({ ...this.state, selectedFilePath: null });
      });
      this.setState({
        ...this.state,
        isRoot: true,
        nodes: rootNodes,
      });
    } catch (e) {
      throw new Error(e);
    }
  };

  this.init();
}

//index.js
new App(document.querySelector(".App"));
