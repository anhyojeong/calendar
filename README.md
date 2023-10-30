# Calendar
![image](https://github.com/anhyojeong/calendar/assets/87750523/4d09092a-8683-4537-8d59-412644641a0b)
매번 많은 친구들과 하나의 약속을 잡을 때 서로의 일정을 한 눈에 파악하기 힘들었습니다. </br>
각자 사용하던 캘린더는 기존의 개인 일정이 작성되어 있는 상태였습니다.</br>
서로 간의 일정을 기록하기에 적절하지 않아 해당 캘린더를 만들었습니다.</br>

---
# 목차
1. 개요
2. 배포주소
3. 구현
4. 사용방법
5. 어려웠던 점
6. 개선점


# 1. 개요 
- 프로젝트 이름 : Caledar
- 개발 기간 : 약 한달 반
- 스택
  + HTML, CSS, JavaScript, React
  + 로컬 스토리지 : 데이터 저장소로 사용

- 기능
  + 달력 기능
  + 일정 추가
  + 일정 확인
  + 일정 삭제
</br>

# 2. 배포주소
https://anhyojeong.github.io/calendar/

</br>

# 3. 구현
 ### 3-1. 일정 추가
 - 날짜 선택(클릭, 드래그, 터치)</br>
https://velog.io/@hyozeong1230/%EC%BA%98%EB%A6%B0%EB%8D%94-%EC%9D%BC%EC%A0%95-%EC%B6%94%EA%B0%80%EB%82%A0%EC%A7%9C-%EC%84%A0%ED%83%9D-%EB%B0%A9%EB%B2%95
- 로컬스토리지에 선택된 날짜 저장</br>
https://velog.io/@hyozeong1230/%EC%BA%98%EB%A6%B0%EB%8D%94-%EC%9D%BC%EC%A0%95-%EC%B6%94%EA%B0%80%EC%84%A0%ED%83%9D%EB%90%9C-%EB%82%A0%EC%A7%9C-%EC%A0%80%EC%9E%A5

### 3-2. 추가된 일정 확인
- 로컬스토리지에서 사용자 정보 불러오기</br>
https://velog.io/@hyozeong1230/%EC%BA%98%EB%A6%B0%EB%8D%94-%EC%B6%94%EA%B0%80%EB%90%9C-%EC%9D%BC%EC%A0%95-%ED%99%95%EC%9D%B8%EB%A1%9C%EC%BB%AC%EC%8A%A4%ED%86%A0%EB%A6%AC%EC%A7%80-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EA%B0%80%EC%A0%B8%EC%98%A4%EA%B8%B0
- 단일 일정(xxxx.xx.xx) / 연속 일정(xxxx.xx.xx~xxxx.xx.xx) 날짜 포맷</br>
https://velog.io/@hyozeong1230/%EC%BA%98%EB%A6%B0%EB%8D%94-%EC%B6%94%EA%B0%80%EB%90%9C-%EC%9D%BC%EC%A0%95-%ED%99%95%EC%9D%B8%EB%82%A0%EC%A7%9C-%ED%8F%AC%EB%A7%B7


### 3-3. 일정 삭제
- 로컬스토리지에서 일정삭제하기
https://velog.io/@hyozeong1230/%EC%BA%98%EB%A6%B0%EB%8D%94-%EC%9D%BC%EC%A0%95%EC%82%AD%EC%A0%9C%EB%A1%9C%EC%BB%AC%EC%8A%A4%ED%86%A0%EB%A6%AC%EC%A7%80%EC%97%90%EC%84%9C-%EC%82%AD%EC%A0%9C%ED%95%98%EA%B8%B0
</br>

# 4. 사용방법

### 4-1. 일정 추가 방법
![달력 실행](https://github.com/anhyojeong/calendar/assets/87750523/fa77363b-e096-4299-bec1-022acfb0708b)

날짜를 클릭 또는 드래그를 하면 모달창이 나타납니다.
나타난 모달창에 이름을 입력 후 +버튼을 누르면 일정이 추가됩니다.


### 4-2. 일정 확인 방법
![일정선택](https://github.com/anhyojeong/calendar/assets/87750523/1fb17166-1f2c-460f-8935-d264ec81a261)

일정이 추가된 사람은 화면의 우측에서 이름으로 확인할 수 있습니다.
이름을 누르면 선택된 사람의 일정을 확인할 수 있습니다.


### 4-3. 일정 삭제 방법
![일정삭제](https://github.com/anhyojeong/calendar/assets/87750523/39466fa9-928b-4860-83d2-b51f5b2eb668)
일정 우측의 x를 누르면 해당 일정을 삭제할 수 있습니다.

   
</br>

# 5. 어려웠던 점
- 웹팩 사용
    
    ‘CRA 대신 웹팩을 써보자!’고 생각해서 웹팩을 사용해보았습니다.
    
    초기 설정부터 빌드까지 모르는 부분이 많아 어려움을 겪었습니다.
    
    구글링, 유튜브 영상, 웹팩 공식문서 등을 통해 해결할 수 있었습니다. 
    
     
    
- 제대로 세우지 않은 계획
    
    ‘캘린더, 일정 기능 구현하면 되겠다.’라며 단순하게 생각하고 개발을 시작하였습니다.
    
    뚜렷하지 않은 계획으로 개발 도중 수차례 UI 구성이나, 컴포넌트들의 구조를 변경해야 했습니다. 이런 과정에서 많은 시간이 소요되었고, 계획 없이 계속 진행했다가는 캘린더는 만들지도 못하겠다고 생각하였습니다.
    
    처음으로 돌아가  필요한 기능과  기능을 구현하는데 필요한 다른 것들은 없는 지부터 파악하였습니다. 이후 UI 와 컴포넌트 구조를 계획하였습니다. 
    
    계획을 명확하게 세운 이후부터는 보다 순조로운 개발을 할 수 있었습니다.
</br>


# 6. 개선점
- 일정 등록, 일정 삭제가 리로드 후 반영됩니다. 
- state를 전역으로 관리해 컴포넌트를 재렌더링 할 수 있도록 하는 것이 좋을 것 같습니다.
 
<iframe src="[https://www.notion.so/Your-Notion-Page-Link](https://hyozeong.notion.site/Calendar-04141a7cb69c4392abc0a6aa35c5bb0c?pvs=4)https://hyozeong.notion.site/Calendar-04141a7cb69c4392abc0a6aa35c5bb0c?pvs=4"></iframe>







