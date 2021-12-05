export interface AuthMember {
  username: string;
  password: string;
}

export interface BaseMember extends AuthMember {
  nickname: string;
  created_at: Date;
  updated_at: Date;
}

export interface Member extends BaseMember {
  id: number;
}

export interface PayloadMember {
  id: number;
  username: string;
}

export interface TokenMember {
  id: number;
  refreshToken: string;
}
