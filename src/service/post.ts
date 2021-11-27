import * as PostModel from "../model/post";
import { Post } from "../model/types/post";

export async function getList() {
  try {
    const postList: Post[] = await PostModel.getList();
    return postList;
  } catch (error) {
    throw error;
  }
}

export async function get(id: number) {
  try {
    const post: Post = await PostModel.get(id);
    return post;
  } catch (error) {
    throw error;
  }
}
