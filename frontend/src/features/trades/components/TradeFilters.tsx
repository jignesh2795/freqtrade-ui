import { useState } from 'react';
import { Input, Select, Button, Badge } from '@/components/ui';
import { Search, Filter, X } from 'lucide-react';
import { TradeFilters as Filters } from '@/store/slices/tradeSlice';

interface TradeFiltersProps {
  onFilterChange: (filters: Filters) => void;
  activeFiltersCount: number;
}

export const TradeFilters: React.FC<TradeFiltersProps> = ({
  onFilterChange,
  activeFiltersCount,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [localFilters, setLocalFilters] = useState<Filters>({});

  const handleFilterChange = (key: keyof Filters, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    setLocalFilters({});
    onFilterChange({});
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="flex-1">
          <Input
            placeholder="Search by pair..."
            leftIcon={<Search className="w-4 h-4" />}
            value={localFilters.pair || ''}
            onChange={(e) => handleFilterChange('pair', e.target.value)}
          />
        </div>

        {/* Filter Toggle */}
        <Button
          variant="secondary"
          onClick={() => setShowFilters(!showFilters)}
          className="relative"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge
              variant="primary"
              className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center text-xs"
            >
              {activeFiltersCount}
            </Badge>
          )}
        </Button>

        {/* Clear Filters */}
        {activeFiltersCount > 0 && (
          <Button variant="ghost" onClick={handleClearFilters}>
            <X className="w-4 h-4 mr-2" />
            Clear
          </Button>
        )}
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-dark-800 rounded-lg border border-dark-700">
          <div>
            <label className="block text-sm font-medium text-dark-300 mb-2">
              Min Profit %
            </label>
            <Input
              type="number"
              placeholder="0"
              value={localFilters.minProfit || ''}
              onChange={(e) =>
                handleFilterChange('minProfit', parseFloat(e.target.value) || undefined)
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-300 mb-2">
              Max Profit %
            </label>
            <Input
              type="number"
              placeholder="100"
              value={localFilters.maxProfit || ''}
              onChange={(e) =>
                handleFilterChange('maxProfit', parseFloat(e.target.value) || undefined)
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-300 mb-2">
              Pair
            </label>
            <Input
              placeholder="BTC/USDT"
              value={localFilters.pair || ''}
              onChange={(e) => handleFilterChange('pair', e.target.value || undefined)}
            />
          </div>
        </div>
      )}
    </div>
  );
};