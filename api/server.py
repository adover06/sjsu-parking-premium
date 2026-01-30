from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from main import get_garage_levels

# import the function that produces the dictionary

app = FastAPI()

# allow Vite dev server (adjust origins as needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/garage-levels")
async def garage_levels():
    try:
        data = get_garage_levels()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    return data


if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)