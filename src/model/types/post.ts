export interface Post extends PostInfo {
  id: number;
  created_at: Date;
  updated_at: Date;
}

export interface PostInfo {
  member_id: number;
  title: string;
  description: string;
}

export interface UpdateInfo extends PostInfo {
  id: number;
}
