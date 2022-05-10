import Breadcrumb from "./component/Breadcrumb";
import ImageView from "./component/ImageView";
import Nodes from "./component/Nodes";
import Loading from "./component/Loading";
import { request, loading_request } from "./api/api";

const cache = {}; // nodeId : node 형태로 저장

export default function App($app) {
  this.state = {
    isRoot: false,
    nodes: [],
    depth: [],
    selectedFilePath: null,
    isLoading: false,
  };

  const loading = new Loading({ $app, initialState: this.state.isLoading });

  const breadcrumb = new Breadcrumb({
    $app,
    initialState: this.state.depth,
    onClick: (index) => {
      if (index === null) {
        // root인 경우
        this.setState({
          ...this.state,
          isRoot: true,
          depth: [],
          nodes: cache.root,
        });
        return;
      }

      if (index === this.state.depth.length - 1) return; // 현재 경로를 클릭한 경우

      const nextDepth = this.state.depth.slice(0, index + 1);

      this.setState({
        ...this.state,
        depth: nextDepth,
        nodes: cache[nextDepth[nextDepth.length - 1].id],
      });
    },
  });

  const nodes = new Nodes({
    $app,
    initialState: this.state.nodes,
    onClick: async (node) => {
      if (node.type === "DIRECTORY") {
        const nextNodes = cache[node.id]
          ? cache[node.id] // 캐싱 저장되어있다면 저장되어있는 것으로 불러오기
          : await loading_request({
              nodeId: node.id,
              setLoading: () => {
                this.setState({ ...this.state, isLoading: true });
              },
              finishLoading: () => {
                this.setState({ ...this.state, isLoading: false });
              },
            });
        cache[node.id] = nextNodes; // nextNodes를 캐시에 저장
        this.setState({
          ...this.state,
          isRoot: false,
          depth: [...this.state.depth, node],
          nodes: nextNodes,
        });
      } else if (node.type === "FILE") {
        this.setState({ ...this.state, selectedFilePath: node.filePath });
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
          nodes: prevNodeId ? cache[prevNodeId] : cache.root, // 상위 노드의 경우 무조건 cache에 저장되어있다.
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
      cache.root = rootNodes; // 어플리케이션을 시작했을때 받은 root 데이터를 cache.root에 저장한다.
    } catch (e) {
      throw new Error(e);
    }
  };

  this.init();
}
