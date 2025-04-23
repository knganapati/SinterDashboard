export interface ParametersType {
  basicity: number;
  mg_content: number;
  al_content: number;
  silica: number;
  temperature: number;
  bed_height: number;
  fuel_rate: number;
  moisture: number;
  strand_speed: number;
  coke_rate: number;
}

export interface ParameterImpactType {
  name: string;
  impact: number;
}

export interface PredictionDataType {
  ri: string;
  rdi: string;
  timestamp: string;
  confidence: number;
  modelContributions: Record<string, number>;
  parameterImpact: ParameterImpactType[];
}

export interface KnowledgeMetadata {
  source: string;
  topic: string;
  confidence: number;
  parameters?: Record<string, any>;
  results?: Record<string, number>;
  timestamp?: string;
}

export interface KnowledgeEntryType {
  id: number;
  text: string;
  metadata: KnowledgeMetadata;
  similarity: number;
}

export interface RelevantKnowledgeType {
  parameter: string;
  excerpt: string;
  source: string;
  confidence: number;
}

export interface RagInsightsType {
  base_prediction: {
    ri: string;
    rdi: string;
  };
  adjustments: {
    ri: string;
    rdi: string;
  };
  final_prediction: {
    ri: string;
    rdi: string;
  };
  relevant_knowledge: RelevantKnowledgeType[];
}

export interface RecommendationType {
  parameter: string;
  current: number;
  recommended: number;
  impact: string;
}

export interface HistoryDataType {
  id: number;
  timestamp: string;
  ri: number;
  rdi: number;
  basicity: number;
  mg_content: number;
}

export interface FeatureImportanceType {
  name: string;
  ri_impact: number;
  rdi_impact: number;
}