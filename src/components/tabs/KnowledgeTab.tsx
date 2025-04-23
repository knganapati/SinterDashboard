import React from 'react';
import KnowledgeBaseCard from '../cards/KnowledgeBaseCard';

interface KnowledgeTabProps {
  onAddKnowledge: () => void;
}

const KnowledgeTab: React.FC<KnowledgeTabProps> = ({ onAddKnowledge }) => {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <KnowledgeBaseCard onAddKnowledge={onAddKnowledge} />
    </div>
  );
};

export default KnowledgeTab;