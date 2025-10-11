
import { Button } from '../components/ui/Button';
import { Tooltip } from '../components/ui/Tooltip';

export const TooltipDemo = () => {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-dark-50">Tooltip Demo</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-dark rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-dark-100">Position Examples</h2>
          <div className="flex gap-4 flex-wrap">
            <Tooltip content="Top tooltip" position="top">
              <Button variant="primary">Top</Button>
            </Tooltip>
            
            <Tooltip content="Bottom tooltip" position="bottom">
              <Button variant="secondary">Bottom</Button>
            </Tooltip>
            
            <Tooltip content="Left tooltip" position="left">
              <Button variant="ghost">Left</Button>
            </Tooltip>
            
            <Tooltip content="Right tooltip" position="right">
              <Button variant="success">Right</Button>
            </Tooltip>
          </div>
        </div>
        
        <div className="glass-dark rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-dark-100">Content Examples</h2>
          <div className="flex gap-4 flex-wrap">
            <Tooltip content="Simple text tooltip">
              <Button>Text Content</Button>
            </Tooltip>
            
            <Tooltip content={
              <div className="text-center">
                <p className="font-semibold">Rich Content</p>
                <p className="text-xs mt-1">This is a tooltip with HTML content</p>
              </div>
            }>
              <Button>Rich Content</Button>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};