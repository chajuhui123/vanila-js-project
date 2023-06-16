// 이동할 페이지 URL을 history.pushState를 통해 변경함
// App.js의 this.route 함수를 실행시킴

const ROUTE_CHANGE_EVENT = "ROUTE_CHANGE";

// 커스텀 이벤트를 통해 ROUTE_CHANGE 이벤트 발생 시 onRouteChange 콜백 함수를 호출하도록 이벤트를 바인딩.
export const init = (onRouteChange) => {
  window.addEventListener(ROUTE_CHANGE_EVENT, () => {
    onRouteChange();
  });
};

// URL을 업데이트하고 커스텀 이벤트를 발생시키는 함수
export const routeChange = (url, params) => {
  // history.pushState를 이용하면 URL만 업데이트하면서 웹 브라우저의 기본적인 페이지 이동 처리가 되는 것을 방지
  history.pushState(null, null, url);
  window.dispatchEvent(new CustomEvent(ROUTE_CHANGE_EVENT, params));
};
