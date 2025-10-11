import { useState, useEffect, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Tabs, TabsList, TabsTrigger, TabsContent, Pagination } from '@/components/ui';
import { Plus, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks';
import { useTradeStore } from '@/store';
import { Trade } from '@/types';
import {
  TradeTable,
  TradeFilters,
  TradeDetailsModal,
  ForceEntryModal,
} from './components';
import { EmptyState, Loading } from '@/components/common';
import { TrendingUp } from 'lucide-react';

export default function TradesPage() {
  const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showForceEntryModal, setShowForceEntryModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'open' | 'closed'>('open');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const { success, error: showError } = useToast();
  const {
    openTrades,
    closedTrades,
    isLoading,
    fetchOpenTrades,
    fetchClosedTrades,
    forceExit,
    filters,
    setFilters,
    clearFilters,
  } = useTradeStore();

  useEffect(() => {
    fetchOpenTrades();
    fetchClosedTrades(100); // Fetch last 100 closed trades

    // Auto-refresh every 10 seconds
    const interval = setInterval(() => {
      fetchOpenTrades();
    }, 10000);

    return () => clearInterval(interval);
  }, [fetchOpenTrades, fetchClosedTrades]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        fetchOpenTrades(),
        fetchClosedTrades(100),
      ]);
      success('Trades Refreshed', 'Trade list has been updated');
    } catch (err) {
      showError('Refresh Failed', 'Unable to refresh trades');
    } finally {
      setRefreshing(false);
    }
  };

  const handleTradeClick = (trade: Trade) => {
    setSelectedTrade(trade);
    setShowDetailsModal(true);
  };

  const handleForceExit = async (tradeId: number) => {
    try {
      const success = await forceExit(tradeId);
      if (success) {
        showError('Trade Closed', 'Trade has been force-exited');
        fetchOpenTrades();
        fetchClosedTrades(100);
      }
    } catch (err) {
      showError('Force Exit Failed', 'Unable to close trade');
    }
  };

  // Filter trades based on active filters
  const filteredOpenTrades = useMemo(() => {
    return openTrades.filter((trade) => {
      if (filters.pair && !trade.pair.toLowerCase().includes(filters.pair.toLowerCase())) {
        return false;
      }
      
      if (filters.minProfit !== undefined) {
        const profit = (trade.profit_ratio || 0) * 100;
        if (profit < filters.minProfit) return false;
      }
      
      if (filters.maxProfit !== undefined) {
        const profit = (trade.profit_ratio || 0) * 100;
        if (profit > filters.maxProfit) return false;
      }

      return true;
    });
  }, [openTrades, filters]);

  const filteredClosedTrades = useMemo(() => {
    return closedTrades.filter((trade) => {
      if (filters.pair && !trade.pair.toLowerCase().includes(filters.pair.toLowerCase())) {
        return false;
      }
      
      if (filters.minProfit !== undefined) {
        const profit = (trade.close_profit_pct || 0);
        if (profit < filters.minProfit) return false;
      }
      
      if (filters.maxProfit !== undefined) {
        const profit = (trade.close_profit_pct || 0);
        if (profit > filters.maxProfit) return false;
      }

      return true;
    });
  }, [closedTrades, filters]);

  const currentTrades = activeTab === 'open' ? filteredOpenTrades : filteredClosedTrades;
  
  // Pagination
  const totalPages = Math.ceil(currentTrades.length / pageSize);
  const paginatedTrades = currentTrades.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark-50">Trades</h1>
          <p className="text-dark-400 mt-1">
            Manage your open and closed trades
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button
            onClick={() => setShowForceEntryModal(true)}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Force Entry
          </Button>
        </div>
      </div>

      {/* Filters */}
      <TradeFilters
        onFilterChange={setFilters}
        activeFiltersCount={activeFilterCount}
      />

      {/* Trades Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'open' | 'closed')}>
              <TabsList>
                <TabsTrigger value="open">
                  Open Trades ({filteredOpenTrades.length})
                </TabsTrigger>
                <TabsTrigger value="closed">
                  Closed Trades ({filteredClosedTrades.length})
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6">
              <Loading message="Loading trades..." />
            </div>
          ) : currentTrades.length === 0 ? (
            <div className="p-6">
              <EmptyState
                icon={TrendingUp}
                title={`No ${activeTab} trades`}
                description={
                  activeFilterCount > 0
                    ? 'No trades match your filter criteria'
                    : `No ${activeTab} trades available`
                }
                action={
                  activeFilterCount > 0
                    ? {
                        label: 'Clear Filters',
                        onClick: () => {
                          clearFilters();
                          setCurrentPage(1);
                        },
                      }
                    : undefined
                }
              />
            </div>
          ) : (
            <>
              <TradeTable
                trades={paginatedTrades}
                onSelectTrade={handleTradeClick}
              />
              
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  pageSize={pageSize}
                  onPageSizeChange={(size) => {
                    setPageSize(size);
                    setCurrentPage(1);
                  }}
                  totalItems={currentTrades.length}
                />
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Modals */}
      <TradeDetailsModal
        trade={selectedTrade}
        isOpen={showDetailsModal}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedTrade(null);
        }}
        onForceExit={handleForceExit}
      />

      <ForceEntryModal
        isOpen={showForceEntryModal}
        onClose={() => setShowForceEntryModal(false)}
      />
    </div>
  );
}