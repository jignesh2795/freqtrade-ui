import { BotControlPanel } from './components';

export default function BotControlPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-dark-50">Bot Control</h1>
        <p className="text-dark-400 mt-1">
          Start, stop, and monitor bot operations
        </p>
      </div>

      <BotControlPanel />
    </div>
  );
}