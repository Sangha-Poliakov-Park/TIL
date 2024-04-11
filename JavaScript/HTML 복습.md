[reference Global Attribute 자료](https://www.w3.org/TR/2010/WD-html-markup-20101019/global-attributes.html)  

Global Attribute : 페이지에 어떤 요소에서도 사용될 수 있기 때문에 global이라 표현한다.



>*흥미를 느낀 것만 정리*
>### Core Attribute
>> onload : window.onload 자주 쓰임.
>> - accesskey : 사용자 단축키 설정 부여(alt로 접근하는 것)  
```HTML <a href="index.html" accesskey="H">Home</a>```
>>- hidden : 요소 숨김 ! 데이터 전송과는 무관함, ajax로 활용 가능  
>>    - 데이터 전송이 가능한 태그는(name/value) : \<textarea>\<select>\<button>\<input type="hidden">  
>>- spellcheck  : \<textarea> \<input>에 사용 가능  
` <textarea spellcheck="true">Thsi text area will hve spellchcking enabled.</textarea>`   
   `<textarea spellcheck="false">Thsi text area wll not have spellchcking.</textarea>`  
>>- onfocus, onblur : Element lost focus  
>>`<input type="text" id="name" onblur="validateName()">`
>>- onchange : 입력 필드의 값 변경
>>- onkeydown, onkeypress, onkeyup
>>- onload : 요소나 문서의 로드 시
>>`<img src="image.jpg" onload="imageLoaded()">`
>>- onmouseover, onmouseout : Cluade, Perplixty은 JS처리보다 hover transition 처리가 더 빈번하다는 답변.  
>>-- JS 이벤트 핸들링 코드 복잡도, CSS브라우저 최적화 高
>>- onerror
>>- onsubmit
>>```javascript
>> <form id="myForm" onsubmit="validateForm(event)">  
>>  
>>    function validateForm(event) {
>>    event.preventDefault(); // 기본 폼 제출 동작 막기  
>>    // 폼 데이터 유효성 검사
>>    let name = document.getElementById('name').value.trim();
>>    let email = document.getElementById('email').value.trim();
>>    if (name === '' || email === '') {
>>      alert('Please fill in all fields.');
>>      return false;
>>    }
>>    // 유효성 검사를 통과한 경우 폼 제출
>>    document.getElementById('myForm').submit();
>>  }


> 이외 :   
onerror, onplay, onscroll
onmouseup, onmousedown,

<hr>

### Semantic
웹데이터의 접근과 입력을 용이하게 하기 위한 구조화, 의미부여 특징을 의미함.(Crawling)  
+ div, span : 폰트를 렌더링한 것에 불과
+ nav, section, article ... : 내용이 가진 의미를 부여함

<table border = "1">
    <td>Semantic</td>
    <td>Non-Semantic</td>
    </tr>
    <tr><td> strong </td><td> b </td></tr>
    <tr><td>em</td><td>i</td></tr>
</table>


### MetaData
정의 : Data that defines and describes other data

### HTML 공백에 대한 참고자료 해석
[Reference](https://poiemaweb.com/html5-tag-text)  
 <p>HTML은 1개 이상의 연속된 공백(space)과 1개 이상의 연속된 줄바꿈(enter)을 1개의 공백으로 표시한다.</p>

다만 JS가 InnerHTML을 가져올 때는 공백을 전부 값으로 가져온다  

<hr>

## href Attribute

>fragment identifier: (href="#top")  
mailto:  
href="javascript:alert(‘Hello’);"

```html
<a href="#">fragment identifier</a><br>
    <a href="mailto:someone@example.com?Subject=Hello again">Send Mail</a><br>
    <a href="javascript:alert('Hello');">Javascript</a>
```


## target Attribute
>\<a> 태그 클릭시 창 오픈 옵션  
target="_self" -> 현재 창에서 오픈  
target="_blank" -> 새 창/탭에서 오픈

> *사이트에서 발췌*  
target="_blank"를 사용해 외부 페이지를 오픈하는 경우, 이동한 외부 페이지에서 자바스크립트 코드를 사용해 악의적인 페이지로 리다이렉트할 수 있는 보안 취약점(Tabnabbing 피싱 공격)이 있다. 따라서 rel="noopener noreferrer"를 추가해 Tabnabbing 피싱 공격에 대비할 것을 권장한다. 참고로 noopener 속성은 성능 상 이점도 있는 것으로 알려져 있다. 자세한 내용은 아래 링크를 참고하기 바란다.

## list/ table 유용한 attribute
순서 문자 지정
+ \<ol type="I" || "i" || "a" || "A" || 1>
리스트 시작값 지정
+ \<ol start = 3>
순서 역순
+ \<ol reversed>
중첩목록
+ 하위 리스트 내에 새로 리스트 생성
```html
<li>Coffee
    <ol>
        <li>CafeLatte</li>
        <li>CafeMocha</li>
    </ol>
</li>
```
## 미디어 자료 활용

>autoplay loop controls 는 명시적으로 true false값을 가지지 않는다. 
태그에 포함되면 true 아니면 false로 간주한다.

>preload는 웹페이지가 로드 될 때 preload="auto||none||metadata"로 구분   
>>preload 속성은 사용자가 실제로 미디어를 재생하기 전에 필요한 데이터를 미리 준비함으로써, 미디어 재생의 시작 지연을 최소화하고, 더 부드러운 재생 경험을 제공하기 위해 사용.  
 >
 >>서버 및 사용자의 데이터 대역폭 사용에 영향을 줄 수 있음을 숙지해야 함

### &nbsp;&nbsp;&nbsp; AUDIO

```html
    <h2>다양한 파일 형식으로 오디오 재생하기</h2>
    <audio controls preload="auto" autoplay loop>
        <!-- MP3 파일 형식 -->
        <source src="audio/example.mp3" type="audio/mpeg">
        <!-- OGG 파일 형식 -->
        <source src="audio/example.ogg" type="audio/ogg">
        <!-- WAV 파일 형식 -->
        <source src="audio/example.wav" type="audio/wav">
        이 메시지는 브라우저가 audio 요소를 지원하지 않을 때 표시됩니다. <!-- 모든 source를 순회했을 때 실행되는게 없으면 텍스트 출력 -->
    </audio>
```

### &nbsp;&nbsp;&nbsp; VIDEO

poster : 로딩 중 보여지는 화면

```html
  <video controls poster="images/video-poster.jpg" width="640" height="360">
        <source src="videos/example.mp4" type="video/mp4">
        <source src="videos/example.ogg" type="video/ogg">
        이 메시지는 브라우저가 video 요소를 지원하지 않을 때 표시됩니다.
    </video>
```

## Form
*get*   
1개 이상 전송 데이터 &로 구분  
최대 255자 

*post*
get보다 속도 느림

[input 타입 열거](./inputType열거.md) 

## select 태그

select.name, option.value를 key-value 형태로 가짐 

```html
  <select name="cars1">
      <option value="volvo" selected>Volvo</option>
      <option value="saab" disabled>Saab</option>
      <option value="fiat">Fiat</option>
      <option value="audi">Audi</option>
    </select>
```

option 그룹화

```html
  <select name="cars3">
      <optgroup label="Swedish Cars">
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
      </optgroup>
      <optgroup label="German Cars" disabled>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </optgroup>
    </select>
```

textarea : value 값이 없음을 주의 할 것
```html
<textarea name="message" rows="10" cols="30">Write something here</textarea>
```

