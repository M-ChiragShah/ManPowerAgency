from fastapi import FastAPI,Path
from typing import Optional
from pydantic import BaseModel
app = FastAPI()

students = {
   1 : {
       "name":"Chirag",
       "age":"20",
       "sem":"5th sem"
   }
}

class Student(BaseModel):
    name : str
    age : int
    sem : str
@app.get("/")

def index():
    return{"name":"first data"}

@app.get("/get-student/{student_id}")
def get_student(student_id: int = Path(None, description="student you want to view")):
    return students[student_id ]

@app.get("/get-name")
def get_name(student_id:int,name : str):
    for student_id in students:
        if students[student_id]["name"]==name:
            return students[student_id]
    return {"data": "not found"}


@app.post("/create-student/{student_id}")
def create(student_id: int, student: Student):
    if student_id in students:
        return {"error":"student exists"}
    students[student_id] = student
    return students[student_id]