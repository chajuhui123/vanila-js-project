import Breadcrumb from "./component/Breadcrumb";
import ImageView from "./component/ImageView";
import Nodes from "./component/Nodes";
import Loading from "./component/Loading";
import { request, loading_request } from "./api/api";

export default function App($app) {
  this.state = {
    isRoot: false,
    nodes: [],
    depth: [],
    selectedFilePath: null,
    isLoading: false,
  };

  const loading = new Loading({ $app, initialState: this.state.isLoading });

  const breadcrumb = new Breadcrumb({ $app, initialState: this.state.depth });

  const nodes = new Nodes({
    $app,
    initialState: this.state.nodes,
    onClick: async (node) => {
      if (node.type === "DIRECTORY") {
        const nextNodes = await loading_request({
          nodeId: node.id,
          setLoading: () => {
            this.setState({ ...this.state, isLoading: true });
          },
          finishLoading: () => {
            this.setState({ ...this.state, isLoading: false });
          },
        });
        this.setState({
          ...this.state,
          isRoot: false,
          depth: [...this.state.depth, node],
          nodes: nextNodes,
        });
      } else if (node.type === "FILE") {
      }
    },
    onBackClick: async () => {
      try {
        const nextState = { ...this.state };
        nextState.depth.pop();

        const prevNodeId = nextState.depth.length
          ? nextState.depth[nextState.depth.length - 1].id
          : null;
        this.setState({
          ...nextState,
          isRoot: !prevNodeId,
          nodes: await request(prevNodeId),
        });
      } catch (e) {
        throw new Error("오류가 발생하였습니다.", e.message);
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
    loading.setState(this.state.isLoading);
  };

  this.init = async () => {
    try {
      const rootNodes = await loading_request({
        nodeId: null,
        setLoading: () => {
          this.setState({ ...this.state, isLoading: true });
        },
        finishLoading: () => {
          this.setState({ ...this.state, isLoading: false });
        },
      });
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
