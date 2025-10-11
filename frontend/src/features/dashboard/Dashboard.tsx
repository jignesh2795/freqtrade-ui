import {
  PerformanceSummary,
  ActiveTrades,
  RecentActivity,
  BotStatusCard,
  DailyProfitChart,
  PairPerformance,
  TradeStatistics,
} from './components';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-dark-50">Dashboard</h1>
        <p className="text-dark-400 mt-1">
          Monitor your bot performance and active trades
        </p>
      </div>

      {/* Performance Summary Cards */}
      <PerformanceSummary />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Daily Profit Chart */}
          <DailyProfitChart />

          {/* Active Trades */}
          <ActiveTrades />

          {/* Trade Statistics */}
          <TradeStatistics />
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          {/* Bot Status */}
          <BotStatusCard />

          {/* Pair Performance */}
          <PairPerformance />

          {/* Recent Activity */}
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}