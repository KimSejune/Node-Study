import * as PostModel from "../model/post";
import { Post, PostInfo, updateInfo } from "../model/types/post";

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

export async function create(postInfo: PostInfo) {
  try {
    return await PostModel.create(postInfo);
  } catch (error) {
    throw error;
  }
}

export async function remove(id: number, memberId: number) {
  try {
    await checkPostOwner(id, memberId);
    return await PostModel.remove(id);
  } catch (error) {
    throw error;
  }
}

export async function update(updateInfo: updateInfo) {
  try {
    await checkPostOwner(updateInfo.id, updateInfo.member_id);
    return await PostModel.update(updateInfo);
  } catch (error) {
    throw error;
  }
}

export async function checkPostOwner(id: number, memberId: number) {
  const post: Post = await PostModel.get(id);
  if (!post) {
    throw new Error("없는 포스트입니다!");
  }
  if (post.member_id !== memberId) {
    throw new Error("작성자가 아니다!");
  }
}
