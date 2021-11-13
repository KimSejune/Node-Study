export interface BaseMember {
  username: string;
  password: string;
  nickname: string;
  created_at: Date;
  updated_at: Date;
}

export interface Member extends BaseMember {
  id: number;
}
