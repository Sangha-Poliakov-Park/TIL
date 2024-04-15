2024-04-09
## JSP 개괄

![HTMLmadeByServlet](/images/whyJSP.PNG)

>***Servlet의 필요성***
>- request parameter를 읽고 검증, application로직을 구성.
>- 상기 이미지처럼 Servlet만으로는 생산성의 한계
out.write를 자동 구현한 JSP가 도입되었음.
>- JSP는 View단을 구성하는 컨텐츠 용도로 사용이 권장되며 Servlet은 데이터 가공의 목적으로 사용

<div style ="margin: 25px 0;"></div>

>***JSP의 lifecycle step***  
>      
>    개발자의 코드 작성 상태 : home.jsp  
>    컨테이너의 파일 해석 : home_jsp.jsp  
>   파일 컴파일 완료 : home_jsp.class  
>    클래스 로드 및 초기화 : home_jsp  

>***JSP 내 JAVA Syntax***  
><%! %> : 선언문  
><%  %> : 자바 코드 구현 ( out.print("String") 상태에서 빠져나온 상태)  
><%= %> : 해당 자바 코드의 값을 out.print로 표현하는 상태(출력)  
><%-- --%>주석  
><%@ %> 디렉티브 코드


기본 흐름
![jspFlow](https://github.com/Sangha-Poliakov-Park/TIL/assets/165978538/77a40094-93d7-412f-b1bc-36a14143fe45)


## 로컬서버 환경 설정(JSP 구동)
> ※ 윈도우 환경  
>1. 환경변수 추가 -> 
>2. 변수 이름 : CATALINA_HOME  
변수 값(사용자 임의 지정) : Tomcat 설치 경로
>3. Path 변수 편집 후 %CATALINA_HOME%\bin; 추가 
>- 상기 방법으로 JAVA_HOME변수에 jdk경로 지정후 %JAVA_HOME%\bin;path에 추가한다.
>4. 톰캣 startup.bat 으로 잘 작동하는지 확인.


## Servlet Interface
+ xml 환경 설정 시 와일드 카드 사용으로 공용주소와 작업주소를 분리.

```xml
<servlet>
    <servlet-name>UserFrontController</servlet-name>
    <servlet-class>com.app.user.UserFrontController</servlet-class>
</servlet>
<servlet-mapping>
    <servlet-name>UserFrontController</servlet-name>
    <url-pattern>*.us</url-pattern>
</servlet-mapping>
 ```

+ 연습 용도의 가벼운 프로젝트는  @WebServlet(/url/*)의 형태로 구현. 
```java
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
@WebServlet("/myServlet")
public class MyServlet extends HttpServlet {
    // 여기서 주소를 구분할 때 request객체의 여러 메소드로 응용 가능하다.

    getRequestURI();
    getContextPath();
    getPathInfo();
    getParameter();
    getParameterMap();

    //contextPath substring하든, /기준으로 split 등 원하는 로직으로 구분해주면된다.
    
    /*
    doGet/doPost 시행때마다 doProcess를 호출한 후, 
    1) 특정 주소 미리 처리
    2) transfer 객체를 만들어 응답 redirect 혹은 request dispatcher를 DAO단에서 구성 후 처리하면 편하다.
    */
}
```
<hr>

### JSP - Servlet 데이터 전달
1. URL에 새로운 parameters & values 작성후 서버로 전달 
2. form 태그를 사용하여 request 객체에 담아서 전달.
    > request.getAttribute("message")  -> Object 업캐스팅 상태
    request.setAttribute("key", "value")
3. cookie에 등록 후 전달
    > *Syntax 모음*  
    >>**생성 & 소멸**  
    >>Cookie cookie = new Cookie("name", "value"); // 쿠키 생성  
    >>cookie.setMaxAge(60\*60\*24); // 쿠키 유효 시간 설정 (예: 24시간)   
    >>=> age를 0으로 설정 후 response 객체로 오버라이드 시 쿠키 소멸  
    >>response.addCookie(cookie); // 응답에 쿠키 추가
    >>
    >> **접근**
    >>- 요청으로부터 쿠키 배열 가져오기: `Cookie[] cookies = request.getCookies();`  
    >> - 쿠키 값 접근 예제 코드:  
    >>   ```java
    >>   if (cookies != null) {
    >>       for (Cookie cookie : cookies) {
    >>           if ("name".equals(cookie.getName())) {
    >>              String value = cookie.getValue();
    >>             // 쿠키 값 사용
    >>        }
    >>   }
    >>}
    >  
    >당장은 쿠키를 request에 담아서 보내는 방식말고는 더 편한 방법이 생각나지는 않는다. 




4. session에 등록 후 전달.(웬만하면 서버단에서 진행)
    >*Syntax 모음*  
    >>**등록&소멸**
    >>```java
    >>// 세션 생성
    >>HttpSession session = request.getSession(); 
    >>session.setAttribute("user", "John Doe"); 
    >>// 세션에 데이터 등록
    >>// 세션에서 특정 데이터 삭제
    >>session.removeAttribute("user");
    >>// 전체 세션 무효화
    >>session.invalidate();
    >>```
    >>**전달**  
    >>el문  
    >>${sessionScope.attributeName}  
    *scope request일 경우 requestScope로 참조*
    >>> 우선순위  
    >>> Page> Request > Session > Application  
　

