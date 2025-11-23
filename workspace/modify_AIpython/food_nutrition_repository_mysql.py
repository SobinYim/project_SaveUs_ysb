from typing import Optional
import mysql.connector

from typing import Optional
import mysql.connector

def get_food_nutrition_by_name(food_name: str) -> Optional[dict]:
    conn = None
    cursor = None
    try:
        conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="3306",
            database="saveus",
            charset="utf8"
        )
        cursor = conn.cursor()

        query = """
        SELECT * FROM food_nutrition
        WHERE food_name = %s
        """

        cursor.execute(query, (food_name,))
        row = cursor.fetchone()

        if not row:
            return None

        # 🔥 핵심 수정: 컬럼명을 소문자로 변환해줘야 Pydantic과 매칭됨!
        columns = [desc[0].lower() for desc in cursor.description]
        return dict(zip(columns, row))

    except Exception as e:
        print("MySQL ERROR:", e)
        return None

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()



if __name__ == "__main__":
    print(get_food_nutrition_by_name("고구마"))
    print(get_food_nutrition_by_name("김밥"))
    print(get_food_nutrition_by_name(""))
