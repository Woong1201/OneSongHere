from pydantic import BaseModel


class CoverImage(BaseModel):
    studio_id: int
    user_id: int
    text : str
