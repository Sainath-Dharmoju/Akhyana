export type ExpertVerificationStatus = 'pending' | 'verified' | 'rejected' | 'unverified';

export type ArticleReviewStatus =
  | 'draft'
  | 'pending_review'
  | 'content_reviewed'
  | 'published'
  | 'under_review'
  | 'hidden'
  | 'removed';

export type HeritageSourceType =
  | 'academic'
  | 'archaeological'
  | 'museum'
  | 'archive'
  | 'government'
  | 'primary_source'
  | 'other';

export interface HeritageSource {
  id: string;
  title: string;
  author?: string;
  publisher?: string;
  year?: string;
  url?: string;
  sourceType: HeritageSourceType;
}

export interface HeritageCredential {
  id: string;
  title: string;
  institution?: string;
  year?: string;
  verificationNote?: string;
}

export interface HeritageExpert {
  id: string;
  name: string;
  profileImage?: string;
  designation?: string;
  institution?: string;
  fieldOfExpertise?: string;
  bio?: string;
  verificationStatus: ExpertVerificationStatus;
  isDemo?: boolean;
  credentials?: HeritageCredential[];
  articleIds: string[];
}

export interface HeritageArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  authorId: string;
  category: string;
  tags: string[];
  sources: HeritageSource[];
  verificationStatus: ExpertVerificationStatus;
  reviewStatus: ArticleReviewStatus;
  contentNote?: string;
  evidenceSummary?: string;
  authorPerspective?: string;
  publishedAt?: string;
  updatedAt?: string;
  readTimeMinutes?: number;
}

export type HeritageReportReason =
  | 'inaccurate_citation'
  | 'plagiarism'
  | 'misrepresented_evidence'
  | 'misinformation'
  | 'unsupported_claim'
  | 'misleading_interpretation'
  | 'hate_speech'
  | 'religious_sensitivity'
  | 'political_propaganda'
  | 'graphic_content'
  | 'offensive_content'
  | 'other';

export interface HeritageReport {
  id: string;
  articleId: string;
  reason: HeritageReportReason;
  details?: string;
  createdAt: string;
  status: 'pending' | 'reviewed' | 'resolved';
}
