from fastapi import FastAPI
from typing import List, Union
from pydantic import BaseModel
from fastapi import Request
from methode import main;

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/process_json")
async def process_json(request: Request):
    body = await request.json()
    data = main(body)
    return  data
