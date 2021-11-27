import * as PostModel from "../model/post";
import { Post } from "../model/types/post";

export async function get() {
  try {
    const postList: Post[] = await PostModel.get();
    return postList;
  } catch (error) {
    throw error;
  }
}
