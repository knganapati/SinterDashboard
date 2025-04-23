import React, { createContext, useContext, useState, useEffect } from 'react';
import { simulatePrediction } from '../utils/simulatePrediction';
import { 
  ParametersType, 
  PredictionDataType,
  KnowledgeEntryType,
  RecommendationType,
  HistoryDataType,
  FeatureImportanceType,
  RagInsightsType,
} from '../types';

interface NewKnowledgeEntryType {
  text: string;
  source: string;
  topic: string;
  confidence: number | string;
}

interface DashboardContextType {
  parameters: ParametersType;
  handleParameterChange: (param: string, value: string | number) => void;
  predictionData: PredictionDataType | null;
  setPredictionData: React.Dispatch<React.SetStateAction<PredictionDataType | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  knowledgeEntries: KnowledgeEntryType[];
  relevantEntries: KnowledgeEntryType[];
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  recommendations: RecommendationType[];
  setRecommendations: React.Dispatch<React.SetStateAction<RecommendationType[]>>;
  historyData: HistoryDataType[];
  featureImportance: FeatureImportanceType[];
  ragInsights: RagInsightsType | null;
  performance: Record<string, number>;
  modelConfidence: Record<string, number>;
  newKnowledgeEntry: NewKnowledgeEntryType;
  setNewKnowledgeEntry: React.Dispatch<React.SetStateAction<NewKnowledgeEntryType>>;
  addKnowledgeEntry: () => void;
  simulatePrediction: () => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Parameters State
  const [parameters, setParameters] = useState<ParametersType>({
    basicity: 2.1,
    mg_content: 4.0,
    al_content: 1.5,
    silica: 5.2,
    temperature: 1250,
    bed_height: 550,
    fuel_rate: 45,
    moisture: 6.5,
    strand_speed: 3.2,
    coke_rate: 5.5
  });

  // Prediction State
  const [predictionData, setPredictionData] = useState<PredictionDataType | null>(null);
  const [loading, setLoading] = useState(false);
  const [ragInsights, setRagInsights] = useState<RagInsightsType | null>(null);

  // Knowledge Base State
  const [knowledgeEntries, setKnowledgeEntries] = useState<KnowledgeEntryType[]>([
    {
      id: 1,
      text: "Increasing basicity (CaO/SiO2 ratio) typically improves the Reduction Index (RI) of sinter. Studies have shown that basicity between 1.8-2.2 provides optimal RI values, with each 0.1 increase in basicity correlating to approximately 0.8-1.2% increase in RI. However, very high basicity (>2.5) can lead to diminishing returns and may negatively impact other sinter properties.",
      metadata: {
        source: "Metallurgical literature review",
        topic: "basicity impact",
        confidence: 0.95,
        parameters: {
          basicity: {
            optimal_range: [1.8, 2.2], 
            effect_on_ri: "positive", 
            effect_on_rdi: "mixed"
          }
        }
      },
      similarity: 0.0
    },
    {
      id: 2,
      text: "MgO addition in the range of 1.5-2.5% significantly improves the RDI (Reduction Degradation Index) of sinter. Experimental results from multiple plants indicate that increasing MgO from 1.0% to 2.0% can decrease RDI by 4-7 percentage points. This improvement is attributed to the formation of magnesioferrite phases that enhance the mechanical stability during reduction.",
      metadata: {
        source: "Plant operational data",
        topic: "MgO impact",
        confidence: 0.92,
        parameters: {
          mg_content: {
            optimal_range: [1.5, 2.5], 
            effect_on_ri: "slightly positive", 
            effect_on_rdi: "strongly positive"
          }
        }
      },
      similarity: 0.0
    },
    {
      id: 3,
      text: "Al2O3 content above 2.0% in sinter has been shown to deteriorate both RI and RDI values. Each 0.5% increase in Al2O3 above this threshold correlates with approximately 1.2-1.8% decrease in RI and 2.0-3.5% increase in RDI. The negative impact is attributed to the formation of calcium aluminum ferrites that are less reducible and more prone to disintegration during reduction.",
      metadata: {
        source: "Research study",
        topic: "Al2O3 impact",
        confidence: 0.9,
        parameters: {
          al_content: {
            optimal_range: [0.5, 1.5], 
            effect_on_ri: "negative", 
            effect_on_rdi: "negative"
          }
        }
      },
      similarity: 0.0
    },
    {
      id: 4,
      text: "Case study: Plant A achieved a significant improvement in RI (from 65% to 72%) by adjusting the following parameters: increasing basicity from 1.7 to 2.1, reducing Al2O3 from 2.2% to 1.4%, and optimizing sinter bed height from 500mm to 600mm. The RDI remained relatively stable at 32-33% during these changes.",
      metadata: {
        source: "Case study",
        topic: "success case",
        confidence: 0.96,
        parameters: {
          basicity: {value: 2.1},
          al_content: {value: 1.4},
          bed_height: {value: 600}
        },
        results: {
          ri: 72,
          rdi: 32.5
        }
      },
      similarity: 0.0
    },
    {
      id: 5,
      text: "Sintering temperature has a complex relationship with RI and RDI. Optimal temperature range for balanced RI-RDI performance is 1250-1300°C. Higher temperatures (>1350°C) typically result in lower RI due to denser structure with less porosity, but can improve RDI due to stronger bonding between particles. Lower temperatures (<1200°C) generally yield higher RI but poorer RDI values.",
      metadata: {
        source: "Process engineering handbook",
        topic: "temperature impact",
        confidence: 0.88,
        parameters: {
          temperature: {
            optimal_range: [1250, 1300], 
            effect_on_ri: "complex", 
            effect_on_rdi: "complex"
          }
        }
      },
      similarity: 0.0
    }
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [relevantEntries, setRelevantEntries] = useState<KnowledgeEntryType[]>([]);
  const [newKnowledgeEntry, setNewKnowledgeEntry] = useState<NewKnowledgeEntryType>({
    text: "",
    source: "",
    topic: "",
    confidence: 0.8
  });

  // Other State
  const [recommendations, setRecommendations] = useState<RecommendationType[]>([
    { parameter: 'Basicity', current: 2.1, recommended: 2.3, impact: 'Increase RI by ~2.5%, minimal RDI impact' },
    { parameter: 'MgO Content', current: 4.0, recommended: 4.5, impact: 'Decrease RDI by ~3.2%, slight RI improvement' },
    { parameter: 'Bed Height', current: 550, recommended: 580, impact: 'Better permeability, +1.5% RI, -2.0% RDI' }
  ]);
  const [historyData, setHistoryData] = useState<HistoryDataType[]>([
    { id: 1, timestamp: '2025-04-15 08:30', ri: 67.2, rdi: 33.8, basicity: 2.0, mg_content: 3.8 },
    { id: 2, timestamp: '2025-04-15 10:45', ri: 68.5, rdi: 35.2, basicity: 2.1, mg_content: 4.0 },
    { id: 3, timestamp: '2025-04-15 12:15', ri: 70.1, rdi: 32.9, basicity: 2.2, mg_content: 4.2 },
    { id: 4, timestamp: '2025-04-15 14:30', ri: 66.8, rdi: 34.5, basicity: 1.9, mg_content: 3.5 },
    { id: 5, timestamp: '2025-04-15 16:45', ri: 69.3, rdi: 31.7, basicity: 2.3, mg_content: 4.3 },
    { id: 6, timestamp: '2025-04-16 09:15', ri: 71.2, rdi: 30.5, basicity: 2.4, mg_content: 4.5 },
    { id: 7, timestamp: '2025-04-16 11:30', ri: 65.8, rdi: 36.2, basicity: 1.8, mg_content: 3.2 }
  ]);
  const [featureImportance, setFeatureImportance] = useState<FeatureImportanceType[]>([
    { name: 'Basicity', ri_impact: 85, rdi_impact: 75 },
    { name: 'MgO Content', ri_impact: 65, rdi_impact: 90 },
    { name: 'Al₂O₃ Content', ri_impact: 45, rdi_impact: 70 },
    { name: 'Temperature', ri_impact: 80, rdi_impact: 60 },
    { name: 'Bed Height', ri_impact: 40, rdi_impact: 50 },
    { name: 'Fuel Rate', ri_impact: 60, rdi_impact: 40 },
    { name: 'Moisture', ri_impact: 35, rdi_impact: 55 }
  ]);
  const [performance] = useState({
    accuracy: 94.5,
    precision: 92.7,
    recall: 93.1,
    f1_score: 92.9,
    mse: 3.2,
    r2: 0.91
  });
  const [modelConfidence] = useState({
    xgboost: 0.92,
    lightgbm: 0.88,
    catboost: 0.90,
    lstm: 0.85,
    transformer: 0.87
  });

  // Handle parameter change
  const handleParameterChange = (param: string, value: string | number) => {
    setParameters({
      ...parameters,
      [param]: typeof value === 'string' ? parseFloat(value) : value
    });
  };

  // Add knowledge entry
  const addKnowledgeEntry = () => {
    const newEntry: KnowledgeEntryType = {
      id: knowledgeEntries.length + 1,
      text: newKnowledgeEntry.text,
      metadata: {
        source: newKnowledgeEntry.source,
        topic: newKnowledgeEntry.topic,
        confidence: typeof newKnowledgeEntry.confidence === 'string' 
          ? parseFloat(newKnowledgeEntry.confidence) 
          : newKnowledgeEntry.confidence,
        timestamp: new Date().toISOString()
      },
      similarity: 0
    };
    
    setKnowledgeEntries([...knowledgeEntries, newEntry]);
    setNewKnowledgeEntry({
      text: "",
      source: "",
      topic: "",
      confidence: 0.8
    });
  };

  // Search knowledge base when query changes
  useEffect(() => {
    if (!searchQuery.trim()) {
      setRelevantEntries([]);
      return;
    }

    // Simple search simulation
    const results = knowledgeEntries
      .map(entry => {
        // Calculate simple keyword match similarity
        const queryWords = searchQuery.toLowerCase().split(/\s+/);
        const textWords = entry.text.toLowerCase();
        
        let matchCount = 0;
        queryWords.forEach(word => {
          if (textWords.includes(word)) matchCount++;
        });
        
        const similarity = queryWords.length > 0 ? matchCount / queryWords.length : 0;
        
        return {
          ...entry,
          similarity
        };
      })
      .filter(entry => entry.similarity > 0.2) // Filter for minimum relevance
      .sort((a, b) => b.similarity - a.similarity); // Sort by relevance
    
    setRelevantEntries(results);
  }, [searchQuery, knowledgeEntries]);

  // Simulate prediction with RAG enhancement
  const handleSimulatePrediction = () => {
    setLoading(true);
    
    // Simulate API call
    const timeout = setTimeout(() => {
      const { prediction, insights, newRecommendations, newHistoryEntry } = simulatePrediction(
        parameters, 
        knowledgeEntries,
        historyData
      );
      
      setPredictionData(prediction);
      setRagInsights(insights);
      
      if (newRecommendations && newRecommendations.length > 0) {
        setRecommendations(newRecommendations);
      }
      
      setHistoryData(prev => [...prev, newHistoryEntry]);
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timeout);
  };

  return (
    <DashboardContext.Provider
      value={{
        parameters,
        handleParameterChange,
        predictionData,
        setPredictionData,
        loading,
        setLoading,
        knowledgeEntries,
        relevantEntries,
        searchQuery,
        setSearchQuery,
        recommendations,
        setRecommendations,
        historyData,
        featureImportance,
        ragInsights,
        performance,
        modelConfidence,
        newKnowledgeEntry,
        setNewKnowledgeEntry,
        addKnowledgeEntry,
        simulatePrediction: handleSimulatePrediction
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};