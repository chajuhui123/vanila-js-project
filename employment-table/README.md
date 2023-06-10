# 사원 정보 테이블 구축

- STACK : `HTML`, `JavaScript`, `CSS`

---

## 요구 사항

### 1. 모든 사원 정보를 테이블 형태로 나타내기

- [] name, title, email, role 로 구성된 JSON 객체를 불러오기 (src/data)
- [] name 을 기준으로 오름차순 정렬되어 있으며, 정렬 유지하며 불러오기
- [] JS 내장 라이브러리 함수 fetch 활용
- [] 열 제목과 일치하는 key 값에 해당하는 value 로 구성
- [] <table>, <thead>, <tbody>, <th>, <tr>, <td> 태그를 적절히 활용

### 2. 테이블 스타일

- [] 테이블의 기본 색상은 흰색
- [] 테이블의 헤더 영역의 배경색은 회색(예: lightgray, #d3d3d3, rgb(211,211,211))
- [] 테이블 헤더를 제외한 데이터 영역에서 짝수 행의 배경색은 회색(예: lightgray, #d3d3d3, rgb(211,211,211))
- [] 테이블의 모든 글자는 가운데에 정렬합니다.
- [] 테이블의 헤더 영역의 글자는 굵게 표시합니다.

### 3. Pagination (페이지 별 데이터)

- 특정 페이지 번호를 선택했을 때

  - [] 선택된 페이지 번호는 빨간색으로 표시. 선택되지 않은 페이지 번호는 검은색으로 표시.
  - [] 선택된 페이지 번호에 해당하는 페이지의 데이터 목록 노출

- 사이드 `<<` `>>` 버튼 클릭시
  - [] 첫 번째 페이지(혹은 마지막 페이지 번호) 버튼이 빨간색으로 표시됩니다
  - [] 첫 번째 페이지(혹은 마지막 페이지 번호)의 데이터 목록이 보입니다.

### 4. Pagination (페이지당 데이터 갯수 드롭다운)

- [] 드롭다운 선택 시, 페이지당 보일 항목의 개수를 선택할 수 있는 목록(예. ‘5개씩’, ‘15개씩’) 제공
- 드롭다운 메뉴 중 하나를 선택하면
  - [] 선택한 항목에 맞게 테이블 하단의 페이지 번호의 개수가 변경
  - [] 선택한 항목에 맞게 테이블의 데이터 영역에 노출되는 데이터 항목의 개수가 변경
  - [] 단, 선택 목록이 바뀔 때마다 첫 페이지의 데이터 목록으로 이동