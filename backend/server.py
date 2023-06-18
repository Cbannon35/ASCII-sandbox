from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"])

# @app.options("/")
# def preflight(request):
#     response = Response()
#     response.headers["Access-Control-Allow-Origin"] = "http://localhost:5173"  # Update with your desired origin
#     response.headers["Access-Control-Allow-Methods"] = "*"
#     response.headers["Access-Control-Allow-Headers"] = "*"
#     return response

@app.post("/")
def read_root():
    return {"Hello": "World"}