# cats-album-project

cats album project with Vanlia JS 🍦

## 구현 기능

☑️ 컴포넌트 형태로 추상화

☑️ API 호출 분리

☑️ API 호출 에러 처리

☑️ DIRECTORY 클릭시 기능 구현

☑️ FILE 클릭시 기능 구현

☑️ PREV 클릭시 기능 구현

☑️ 소스파일 분리 및 모듈화

☑️ 로딩중 화면 구현

☑️ 이벤트 최적화

☑️ 클릭과 esc키를 통해 사진 닫기

☑️ 캐싱 구현하기

☑️ Breadcrumb 클릭하여 이전 path 로 돌아가기

## ISSUE

- [TypeError: "Component" is not a constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Not_a_constructor)
  - function을 const 로 선언했을 때 마주친 이슈.
  - const 로 선언하였을 때 constructor 로서 import 해 사용할 수가 없는 것으로 보인다. Math, JSON, Symbol, Reflect, Intl, Atomics 는 생성자가 아니라고 한다.
