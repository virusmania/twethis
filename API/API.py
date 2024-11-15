from fastapi import FastAPI
from pydantic import BaseModel
import GPT_scraper
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    # 理論上OK
    # 多分
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Tweets(BaseModel):
    tweets: str


@app.post("/tweets/")
def return_tweets(tweets: Tweets):
    return GPT_scraper.scraping(tweets.tweets)