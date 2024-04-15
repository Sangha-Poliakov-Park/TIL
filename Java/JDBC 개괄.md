> 기본정리
executeUpdate():

INSERT, UPDATE, DELETE, 그리고 DDL 명령어(예: CREATE TABLE, DROP TABLE) 등 데이터베이스에서 데이터를 변경하는 작업에 사용.
리턴값은 int 형이며, <u>쿼리에 의해 영향 받은 행의 수.</u> 예를 들어, 하나의 행을 추가하는 INSERT 쿼리를 실행하면 1을 리턴하고, 여러 행을 변경한 경우에는 변경된 행의 수를 리턴.

return >1 인 경우 예시
`INSERT INTO messages (title, content) VALUES ('Title1', 'Content1'), ('Title2', 'Content2');`
`UPDATE products SET price = price * 0.9 WHERE category = 'electronics';`
`DELETE FROM users WHERE last_login < '2021-01-01'; `

executeQuery();
resultset return함.

> 수동커밋
Connection conn = DriverManager.getConnection(url, user, password); : 서버연결 open 시점.
conn.setAutoCommit(false); : auto-commit 해제
conn.commit(); : commit 시
conn.rollback() : transaction 취소
conn.close() : 서버 연결 닫기.

>try with 구문으로 리소스 관리 (롤백을 하지 못하는 단점)
>리소스는 AutoCloseable 인터페이스를 구현한 객체
```java
String sql = "SELECT * FROM my_table";
try (Connection conn = DriverManager.getConnection(url, user, password);
     PreparedStatement stmt = conn.prepareStatement(sql);
     ResultSet rs = stmt.executeQuery()) {

    while (rs.next()) {
        // 결과 처리
    }
} catch (SQLException e) {
    // 예외 처리
}
```


> 드라이버 환경 설정 (싱글톤)
```java
package edu.kh.test.user.model.dao;

import java.sql.Connection;
import java.sql.DriverManager;

public class DBConnection {
	private static Connection conn;

	public static Connection getConnection() {
		if (conn == null) {
			try {
				Class.forName("com.mysql.cj.jdbc.Driver");
				String url = "jdbc:mysql://localhost:3306/gb";
				String user = "root";
				String password = "1234";
				Connection conn = DriverManager.getConnection(url, user, password);
				return conn;
			} catch (Exception e) {
				System.out.println(e);
			}
		}
		return conn;
	}
}

```
> Insert Query문
```java
	public boolean insertUser(UserDTO user) {
		int result = 0;
		String sql = "insert into user values(?,?,?)";
		try {
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, user.getUserid());
			ps.setString(2, user.getUserpw());
			ps.setString(3, user.getUsername());
			result = ps.executeUpdate();
		} catch (Exception e) {
		}
		return result == 1;
	}
```

> Select 쿼리문
> ResultSet: DB의 row , initially set to row before the first row
> ResultSet.next() : 다음 행 존재시 true return 및 행넘김, 행 없을시 false return 
> getInt("Column명")/getString("Column명") ...  
```java
package test.user.model.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import test.user.model.vo.UserDTO;;

public class UserDAO {
	Connection conn;
	PreparedStatement ps;
	ResultSet rs;

	public UserDAO() {
		conn = DBConnection.getConnection();
	}

	public UserDTO findByUserNo(int user_no) {
		String sql = "select * from TB_User where USER_NO= ?";
		try {
			ps = conn.prepareStatement(sql);
			ps.setInt(1, user_no);
			rs = ps.executeQuery();
			if (rs.next()) {
				UserDTO user = new UserDTO();
				user.setUser_no(rs.getInt("user_no"));
				user.setUser_id(rs.getString("user_id"));
				user.setUser_name(rs.getString("user_name"));
				user.setUser_age(rs.getInt("user_age"));
				return user;
			}
		} catch (Exception e) {
		}
		return null;
	}
}
```



MYBATIS