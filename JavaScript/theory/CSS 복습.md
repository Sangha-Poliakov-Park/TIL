# BFC
### [BFC 개념](https://velog.io/@eenaree/Block-Formatting-Context)
[원본링크](https://www.w3.org/TR/CSS2/visuren.html#normal-flow)

링크 블로거가 매우 정리를 잘 해놓았다. 개념을 잊은 경우에는 링크를 정독하면 바로 이해가 가능하다.   
*원문 참고*          
In a block formatting context, each box's left outer edge touches the left edge of the containing block (for right-to-left formatting, right edges touch). <u>This is true even in the presence of floats (although a box's line boxes may shrink due to the floats), <b>unless the box establishes a new block formatting context (in which case the box itself may become narrower due to the floats).</b></u>
        
마진 collapse를 제거하려면 해당 요소에 부모 블럭에 inline을 주는 방식으로 새로운 bfc를 생성하여 제거할 수 있다.
        
 Float 옆 블록에 overflow hidden을 주면 bfc로 생성되어 더 이상 이전 bfc영역에 속하지 않으므로 left edge로 도달하려는 속성이 사라진다. 

<hr>
<hr>

Background Poisition
-----------------
background_position 중 %를 사용하는 방식은 그 원리만 알면 제대로 활용할 수 있는데,   
이를 찾기가 매우 어려웠어서 기록을 남긴다.   
[Reference](https://blog.hubspot.com/website/css-background-position#:~:text=Setting%20the%20background%20position%20to,is%20assumed%20to%20be%2050%25.)

> %가 의미하는 바는 img의 x축 %가 요소의 x축 %에 일치시키는 위치를 말한다. 따라서 이미지의 사이즈가 100%면 %로는 움직일수가 없다  
><mark>Percentages are trickier than length values because they affect the alignment of the image and the container. Defining the property with X% means that the X% mark of the image will be on the X% mark of the container.


> 이 개념으로 하기 코드를 보면 텍스트 색상이 물결처럼 바뀌는 것을 쉽게 이해할 수 있다..
```css
p {
    background: linear-gradient(
        to right,
        #7953cd 20%,
        #00affa 30%,
        #0190cd 70%,
        #764ada 80%
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-fill-color: transparent;
    background-size: 500% auto;
    animation: textShine 5s ease-in-out infinite alternate;해서는 자바스크립트 사용이 바람직하다. 예를 들어 바운스, 중지, 일시 중지, 되감기 또는 감속과 같은 고급 효과는 자바스크립트가 훨씬 유용하다.
}

@keyframes textShine {
    0% {
        background-position: 0% 50%;
    }
    100% {
        background-position: 100% 50%;
    }
}
```
<hr><hr>

## Transform

> 기준점 정하기
> transform-origin: $x$ $y$ -> 외부 좌표도 가능하다.


## pseudo
태그의 앞뒤가 아닌 태그 속 content의 앞뒤를 의미하는 점을 놓치지 말자

## flex
[Reference](https://youtu.be/u044iM9xsWU?si=2M5ucHzDNDh-tRaF)

원리
 모든 것을 최소화 한 상태에서 한 줄에 배치하는 것.
width : max-content/min-content 기능에 대한 이해 후,
line break없이 가능한한 max-content를 유지하되 공간이 없으면 wrap한다.




### 실습 후 소감, 팁
  [예제를 이미지만 보고 재현해봄](./etc/Layout연습/1stLayout.html)
  > + toggle 버튼을 만들 때에는 span 외부 margin 처리보다 span 내부 absolute 처리가 더 편리하다
  > + X자로 변경시킬 때 중심원점을 잡고 회전시키기가 훨씬 편리하다.
  > + float는 left로만 해도 width에 맞게 주욱 이어지므로 반드시 좌우 지정할 이유는 없다. 
  > + width 대신 top -> right 를 이용하여 범위를 지정할 수 있다.
  > + clearfix 기법을 통해 그 하단부 블록이 가상 컨텐츠 밑으로 떨어지게 하여 footer를 구성할 수 있다.
  > + bottom 0 으로 바로 맨 밑으로 떨어뜨리는 방법
  > + absolute 시 아무런 부모 relative가 없다면 html 순서에 맞게 배치된후 부유객체화 됨 


단순 복습용 기록
------
### CSS Rule Set
<div style ="background-color :#DDDDDD;">  

![ruleset](https://poiemaweb.com/img/css-syntax.png)
</div>
*link 연결 syntax*  
```css 
<link rel="stylesheet" href="css/style.css">
```

### [Meyer's reset](./etc/Eric%20Meyer’s%20reset.md)

*Attribute Selector*
``` CSS
Selector[Attribute]  
Selector[Attribute ="value"]
=== value
 
Selector[Attribute ~="value"]  
_value_ : '_'은 공백만 가능,공백으로  분리된 value를 포함
~ 물결이라 생각하여 여러가지 속성의 집합을 다룬다고 생각하자

Selector[Attribute |="value"]
== value || value-%

Selector[Attribute ^="value"]  
value%  
^지수 기호 즉 value로부터 시작되는 상승기호라고 생각하자.


Selector[Attribute $="value"]  
%value  
value를 currency로 생각하자, 그러면 뒤로 와야한다 마치 %dollar %원 처럼


Selector[Attribute *="value"] 
%value%
전체를 의미하는 *의 특성으로 암기
```


*이외 복습*  
  
Parent  
\> child  
 (공백) descendant

Sibling Combinator   
\+ : adjacent  
\~ : General  

Pseudo 

:

<table border = "1">
<tr><td>가상</td><td>설명</td></tr>
<tr><td>hover</td><td>mouse over</td></tr>
<tr><td>visited</td><td>방문한 링크</td></tr>
<tr><td>link</td><td>방문 안한 링크</td></tr>
<tr><td>active</td><td>셀렉터 클릭상태</td></tr>
<tr><td>focus</td><td>포커스 중일때</td></tr>
<tr><td>checked</td><td>포커스 중일때</td></tr>
<tr><td>enabled</td><td></td></tr>
<tr><td>disabled</td><td></td></tr>
<tr><td>focus</td><td></td></tr>
</table>

```css
 <style>
    input:enabled + span {
      color: blue;
    }

    input:disabled + span {
      color: gray;
      text-decoration: line-through;
    }

    input:checked + span {
      color: red;
    }
```

### 구조 가상 클래스 
:first-child
:last-child
:nth-child(n)
:nth-last-child(n)  : 뒤에서 n번째

최종값이 0과 음수는 생략된다.
n은 0부터 시작한다. 하지만 대상 개체는 1부터 적용됨

마찬가지로 -of-type 적용

:not (셀렉터)
  부정 셀렉터 


### 정합성 검토 셀렉터
:valid(selector)
:invalid(selector)
```CSS
    input[type="text"]:valid {
      background-color: greenyellow;
    }
    input[type="text"]:invalid {
      background-color: red;
    }
```

```HTML
<label>특수문자를 포함하지 않는 4자리 문자 또는 숫자
    <input type="text" value="ab1!"
      pattern="[a-zA-Z0-9]{4}" required>
  </label>
```

<table border = "1">
<tr><td>가상</td><td>설명</td></tr>
<tr><td colspan="2">::first-letter</td>></tr>
<tr><td colspan="2">::first-line</td></tr>
<tr><td colspan="2">::after</td></tr>
<tr><td colspan="2">::before</td></tr>
<tr><td>::selection</td><td>드래그한 콘텐츠 선택</td></tr>
</table>


### 프로퍼티 단위

+ em : 자식, 자손의 중첩을 주의할 것  
+ rem : root em, html 기준 사이즈  
    + Reset CSS를 사용하여 사전에 html 요소의 font-size 지정이 필요하다. font-size 미지정 시에는 16px가 적용된다.

+ vw, vh, vmax(w,h중 큰 쪽의 1%), vmin
> #### *cal 정리*
> calc() 내에 +,-,*,/ 사용 가능 하며 value와 operator 사이 간격을 주어야 함

### 박스 모델
max-width
max-height

min-width
min-height

>width와 height로 지정한 콘텐츠 영역보다 실제 콘텐츠가 크면 콘텐츠 영역을 넘치게 된다는 것에 유의  
>박스모델 관련 프로퍼티(margin, padding, border, box-sizing 등)는 상속되지 않는다. 

>width와 height 프로퍼티의 초기값은 auto
>block 요소의 경우, width는 부모 요소의 100%, height는 콘텐츠의 높이(+ 약간의 여분)

border-width : 단순 border 1px 보다 상세하기 하나씩 정할 수 있음

*visibility*
hidden vs collapse (table 요소에 한정)
visibility: hidden을 사용하면 요소는 보이지 않게 되지만 공간은 그대로 유지
visibility: collapse는 테이블 요소(열 또는 행)를 숨길 때 사용되며, 이는 요소가 차지하는 공간을 완전히 제거, 렌더링하지 않으므로 로딩 개선 

## Background 
```css
    body {
      background-image: url("http://poiemaweb.com/img/bg/dot.png"), url("http://poiemaweb.com/img/bg/paper.gif");
      background-repeat: no-repeat, repeat;
    }
```

*background-size*의 첫번째 값은 width, 두번째 값은 height를 의미한다. 하나의 값만을 지정한 경우, 지정한 값은 width를 의미하게 되며 height는 auto로 지정된다. %는 속한 태그의 크기 기준이다.



<hr>
#### Background 기타

cover
배경이미지의 크기 비율을 유지한 상태에서 부모 요소의 width, height 중 큰값에 배경이미지를 맞춘다. 

 background-attachment: fixed;

 background-position 

 background-position: $25\%_{x축}$ $75\%_{y축}$
 이동 중심점은 부모 요소의 edge와 만나는 부분. 따라서 0, 0 일시 상측 좌측이 모서리에 만나는데서 멈춤.

 > *background shorthand*  
 > background: color || image || repeat || attachment || position||size;
 ```css
background: #FFEE99 url("http://poiemaweb.com/img/bg/dot.png") no-repeat center;
 ```





 수직 중앙 정렬 예제이다. a 요소의 line-height 값과 a 요소를 감싸는 div 요소의 height 값을 일치
 ```
    .button {
      width: 150px;
      height: 70px;
      background-color: #FF6A00;
      border-radius: 30px;
      box-shadow: 5px 5px 5px #A9A9A9;
    }
    .button > a {
      display: block;
      font: italic bold 2em/70px Arial, Helvetica, sans-serif;
      text-decoration: none;
      text-align: center;
    }

   <div class="button">
    <a href="#">Click</a>
  </div>
```

***text-decoration*** 

```
{ text-decoration: overline; }
{ text-decoration: line-through; }
{ text-decoration: underline; }
```


### white-space
두 가지로 나누어 볼 것 

>1. normal 계열  
    line break X   
    공백 1번만   
    자동 wrapping O
+ nowrap : 자동 wrap만 해제
>2. pre 계열  
    line break O   
    공백 O  
    wrapping X  
    
+ pre-wrap : 자동 wrapping만 O
+ pre-line : wrap에서 공백만 X로

### text-overflow
 부모 영역을 벗어난 wrapping이 되지 않은 텍스트 처리
 ```
.truncate {
  width: 150px;             /* width가 지정되어 있어야 한다. */
  white-space: nowrap;div

 ### word-wrap /word-break
 `.word-wrap { word-wrap: break-word; }`

줄바꿈이 일어났을 때 뒤에 단어와 구분을 주기 위해 wrap을 한번 해줌


 `{word-break : break-all}` 단순 줄바꿈으로만 진행함

### fixed 비교
position: fixed는 HTML 요소를 뷰포트에 대해 고정시킨다.  
background-attachment: fixed는 요소의 배경 이미지를 뷰포트에 대해 고정시킨다. - body에 넣는 경우가 많음


<del>### Float
float에 관해 이런 말이 있다.
주의할 것은 d1 클래스 요소가 d2 클래스 요소 위에 떠 있게 되어도 d2 클래스 요소의 width는 d1 클래스 요소가 차이한 width만큼 줄어들지 않고 100%를 유지한다는 것이다. 

즉 안에 글자가 있어서 밀렸다면 글자만 옆으로 밀리게 되는 것이지 블록 자체는 그 width를 유지한다</del>
BFC를 딥하게 파면 이것보다 세련된 설명이 가능할 것으로 유추된다.

*인라인 블록 사이 공백 제거 팁*  
부모 블럭을 형성해서 fontsize를 0으로 만들어버린다.

## 캐스캐이딩  
`head내 style > head.style 내 @import> link 연결 css파일> link 연결 css파일 내 import > 브라우저 디폴트 시트 `

`!important > 인라인 스타일 > 아이디 선택자 > 클래스/어트리뷰트/가상 선택자 > 태그 선택자 > 전체 선택자 > 상위 요소에 의해 상속된 속성`


## Transition
### *transition-timing-function*  

> transition-property  
> transition-duration  
> transition-timing-function  
> transition-delay  : 시작까지 대기시간  
> transition  `transition: property duration function delay`

ease =  느리게시작 - 가속 - 마지막에만  
linear : $y=x$
ease-in : 느리게시작 -> 일정한 속도 도달 -> 등속  
ease-out : 등속시작-> 느리게 -> 종료  
ease-in-out :느리게 - 가속하다 중간에서 느려짐 -> 종료   

### *animation*
+ keyframse "animation-name"

>animation-name
>animation-duration  
>animation-timing-function  
>animation-delay  
>animation-iteration-count : 1~ $\infty$  
>animation-direction  :   
$\left\{normal, reverse, alternate_{홀수번째 normal, 짝수번째 reverse}, alternate-reverse\right\}$  
>animation-fill-mode   
$\left\{none, forwards, backwards_{시작프레임으로 대기만}, both \right\}$   
>animation-play-state  :paused, running  
>`animation: name duration timing-function delay iteration-count direction fill-mode play-state`

