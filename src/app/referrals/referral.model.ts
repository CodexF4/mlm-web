export interface ReferralLookup {
  sponsorName: string;
}

export interface MyReferral {
  code: string;
  directCount: number;
}

export interface ReferralNode {
  id: string;
  firstName: string;
  lastName: string;
  username: string | null;
  sponsorId: string | null;
  level: number;
  createdAt: string;
}

export interface Downline {
  totalCount: number;
  maxDepth: number;
  members: ReferralNode[];
}
