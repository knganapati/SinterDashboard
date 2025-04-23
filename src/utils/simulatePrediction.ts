import { 
  ParametersType, 
  KnowledgeEntryType, 
  PredictionDataType, 
  RagInsightsType,
  RecommendationType,
  HistoryDataType
} from '../types';

export const simulatePrediction = (
  parameters: ParametersType,
  knowledgeEntries: KnowledgeEntryType[],
  historyData: HistoryDataType[]
) => {
  // Calculate base RI/RDI prediction
  const baseRI = 55 + (parameters.basicity * 5) + (parameters.mg_content * 0.8) - 
                (parameters.al_content * 1.5) + (parameters.temperature - 1200) * 0.03;
  
  const baseRDI = 45 - (parameters.basicity * 3) - (parameters.mg_content * 1.2) + 
                  (parameters.al_content * 2) - (parameters.temperature - 1200) * 0.02;
  
  // Add some randomness to base prediction
  const baseRIWithNoise = baseRI + (Math.random() * 4 - 2);
  const baseRDIWithNoise = baseRDI + (Math.random() * 3 - 1.5);
  
  // *** RAG Enhancement ***
  // Find relevant knowledge entries for current parameters
  const relevantKnowledge: { parameter: string; knowledge: KnowledgeEntryType }[] = [];
  
  // Check each parameter against knowledge base
  Object.entries(parameters).forEach(([param, value]) => {
    const matchingEntries = knowledgeEntries.filter(entry => {
      const params = entry.metadata?.parameters || {};
      return params[param];
    });
    
    if (matchingEntries.length > 0) {
      // Sort by confidence
      matchingEntries.sort((a, b) => 
        (b.metadata?.confidence || 0) - (a.metadata?.confidence || 0)
      );
      
      // Take top match for this parameter
      relevantKnowledge.push({
        parameter: param,
        knowledge: matchingEntries[0]
      });
    }
  });
  
  // Calculate RAG adjustments
  let riAdjustment = 0;
  let rdiAdjustment = 0;
  
  relevantKnowledge.forEach(({ parameter, knowledge }) => {
    const paramInfo = knowledge.metadata.parameters?.[parameter];
    if (!paramInfo) return;
    
    const confidence = knowledge.metadata.confidence || 0.8;
    
    // Check if parameter is in optimal range
    if (paramInfo.optimal_range) {
      const [min, max] = paramInfo.optimal_range;
      const currentValue = parameters[parameter as keyof ParametersType];
      
      // If outside optimal range, apply adjustment
      if (currentValue < min || currentValue > max) {
        const deviation = currentValue < min ? 
          (min - currentValue) / min : 
          (currentValue - max) / max;
        
        // Effect mapping
        const effectStrength: Record<string, number> = {
          "positive": 1,
          "slightly positive": 0.5,
          "neutral": 0,
          "slightly negative": -0.5,
          "negative": -1,
          "complex": 0,
          "strongly positive": 1.5,
          "strongly negative": -1.5,
          "mixed": 0.2
        };
        
        // Apply effects
        if (paramInfo.effect_on_ri) {
          const effect = effectStrength[paramInfo.effect_on_ri] || 0;
          riAdjustment += effect * deviation * confidence * 3; // Scale factor
        }
        
        if (paramInfo.effect_on_rdi) {
          const effect = effectStrength[paramInfo.effect_on_rdi] || 0;
          rdiAdjustment += effect * deviation * confidence * 3; // Scale factor
        }
      }
    }
  });
  
  // Clamp adjustments
  riAdjustment = Math.max(Math.min(riAdjustment, 5), -5);
  rdiAdjustment = Math.max(Math.min(rdiAdjustment, 5), -5);
  
  // Final prediction with RAG adjustment
  const finalRI = baseRIWithNoise + riAdjustment;
  const finalRDI = baseRDIWithNoise + rdiAdjustment;
  
  // Generate recommendations based on knowledge
  const knowledgeBasedRecommendations: RecommendationType[] = relevantKnowledge
    .filter(({ parameter, knowledge }) => {
      const paramInfo = knowledge.metadata.parameters?.[parameter];
      if (!paramInfo || !paramInfo.optimal_range) return false;
      
      const [min, max] = paramInfo.optimal_range;
      const currentValue = parameters[parameter as keyof ParametersType];
      return currentValue < min || currentValue > max;
    })
    .map(({ parameter, knowledge }) => {
      const paramInfo = knowledge.metadata.parameters?.[parameter];
      if (!paramInfo || !paramInfo.optimal_range) {
        return {
          parameter: parameter.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
          current: parameters[parameter as keyof ParametersType],
          recommended: parameters[parameter as keyof ParametersType],
          impact: 'No impact data available'
        };
      }
      
      const [min, max] = paramInfo.optimal_range;
      const currentValue = parameters[parameter as keyof ParametersType];
      const targetValue = (min + max) / 2;
      
      let impact = '';
      if (paramInfo.effect_on_ri && paramInfo.effect_on_rdi) {
        impact = `${paramInfo.effect_on_ri === 'negative' ? 'Decrease' : 'Increase'} RI, `;
        impact += `${paramInfo.effect_on_rdi === 'negative' ? 'Increase' : 'Decrease'} RDI`;
      }
      
      return {
        parameter: parameter.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
        current: currentValue,
        recommended: targetValue,
        impact: impact || 'Optimize process stability'
      };
    });
  
  // Build RAG insights
  const ragInsights: RagInsightsType = {
    base_prediction: {
      ri: baseRIWithNoise.toFixed(1),
      rdi: baseRDIWithNoise.toFixed(1)
    },
    adjustments: {
      ri: riAdjustment.toFixed(1),
      rdi: rdiAdjustment.toFixed(1)
    },
    final_prediction: {
      ri: finalRI.toFixed(1),
      rdi: finalRDI.toFixed(1)
    },
    relevant_knowledge: relevantKnowledge.map(rk => ({
      parameter: rk.parameter,
      excerpt: rk.knowledge.text.substring(0, 150) + '...',
      source: rk.knowledge.metadata.source,
      confidence: rk.knowledge.metadata.confidence
    }))
  };
  
  // Build new prediction data
  const prediction: PredictionDataType = {
    ri: finalRI.toFixed(1),
    rdi: finalRDI.toFixed(1),
    timestamp: new Date().toLocaleString(),
    confidence: 0.86 + (Math.random() * 0.1),
    modelContributions: {
      xgboost: 0.25 + (Math.random() * 0.05),
      lightgbm: 0.20 + (Math.random() * 0.05),
      catboost: 0.15 + (Math.random() * 0.05),
      lstm: 0.10 + (Math.random() * 0.05),
      transformer: 0.05 + (Math.random() * 0.05),
      rag: 0.25 // RAG contribution is significant
    },
    parameterImpact: [
      { name: 'Basicity', impact: parameters.basicity * 5.2 },
      { name: 'MgO Content', impact: parameters.mg_content * 3.8 },
      { name: 'Al₂O₃ Content', impact: -parameters.al_content * 4.5 },
      { name: 'Temperature', impact: (parameters.temperature - 1200) * 0.08 },
      { name: 'Bed Height', impact: (parameters.bed_height - 500) * 0.03 },
      { name: 'Other Factors', impact: 12.5 }
    ]
  };
  
  // Build new history entry
  const newHistoryEntry: HistoryDataType = {
    id: historyData.length + 1,
    timestamp: new Date().toLocaleString('en-US', { 
      month: 'numeric', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric' 
    }),
    ri: parseFloat(prediction.ri),
    rdi: parseFloat(prediction.rdi),
    basicity: parameters.basicity,
    mg_content: parameters.mg_content
  };
  
  return {
    prediction,
    insights: ragInsights,
    newRecommendations: knowledgeBasedRecommendations.length > 0 ? knowledgeBasedRecommendations : undefined,
    newHistoryEntry
  };
};