import { useState } from 'react';
import { Select } from '@/components/ui';
import { Search } from 'lucide-react';

export interface PairSelectorProps {
  pairs: string[];
  selected: string;
  onSelect: (pair: string) => void;
}

export const PairSelector: React.FC<PairSelectorProps> = ({
  pairs,
  selected,
  onSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPairs = pairs.filter((pair) =>
    pair.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pairOptions = filteredPairs.map((pair) => ({
    value: pair,
    label: pair,
  }));

  return (
    <div className="w-64">
      <Select
        options={pairOptions}
        value={selected}
        onChange={onSelect}
        placeholder="Select pair"
      />
    </div>
  );
};