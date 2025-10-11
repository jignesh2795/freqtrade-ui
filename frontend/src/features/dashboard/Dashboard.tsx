import {
  PerformanceSummary,
  ActiveTrades,
  RecentActivity,
  BotStatusCard,
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

      {/* Performance Summary */}
      <PerformanceSummary />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Takes 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          <ActiveTrades />
          <RecentActivity />
        </div>

        {/* Right Column - Takes 1/3 */}
        <div className="space-y-6">
          <BotStatusCard />
        </div>
      </div>
    </div>
  );
}