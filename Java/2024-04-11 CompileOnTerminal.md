### Windows Unix 차이
<table>
<tr>
<td>내용</td>
<td>Window  </td>
<td>Unix  </td>
</tr>
<tr><td>경로</td>
<td>\</td>
<td>/</td></tr>
<tr><td>파일구분자</td>
<td>;</td>
<td>:</td></tr>
</table>

### CMD 경로 지정

```cmd
cd . 현재경로
cd ..   : 이전경로
cd \ :루트경로
cd "절대경로"
경로 내 공백이 있을시 쌍따옴표 사용
```
### JAVA Compile/Run
> 현재 경로
>```cmd
>javac [].java :컴파일
>java [] :런
>```

>package내부 .java  
>자바는 저장될 때 그 명칭 자체에 package를 포함하므로 package의 부모로 올라갸아함
>*부모경로로 이동*
>```cmd
>javac \[상대경로]\[상대경로...]\[java명].java
>java [package명].JAVACLASS파일명
>```

>임포트
>```cmd
>javac -cp "/path/to/your/library.jar"; YourMainClass.java
>java -cp "/path/to/your/library.jar"; YourMainClass
>```
>직접 구현
>```cmd 
> 절대경로
>C:\Users\user1\Desktop>java -cp "java -cp 
>C:\Users\user1\Desktop\study\workspace_study\algorithm\src\algorithm\algs4.jar; algorithm.Algorithm
>상대 경로
>C:\Users\user1\Desktop\study\workspace_study\algorithm\src>java -cp algorithm\algs4.jar; algorithm.Algorithm
>```
>
