import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select, SelectOption } from '../components/ui/Select';
import { Modal } from '../components/ui/Modal';
import { ModalFooter } from '../components/ui/Modal';
import { Badge } from '../components/ui/Badge';
import { Switch } from '../components/ui/Switch';
import { Slider } from '../components/ui/Slider';
import { Search, Lock } from 'lucide-react';
import { Tooltip } from '../components/ui/Tooltip';

export const ComponentDemo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [switchValue, setSwitchValue] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);
  
  const selectOptions: SelectOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3', disabled: true },
    { value: 'option4', label: 'Option 4' },
  ];

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-dark-50">Component Demo</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Button Variants */}
        <Card>
          <CardHeader>
            <CardTitle>Button Component</CardTitle>
            <CardDescription>Different button variants and sizes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="success">Success</Button>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button loading>Loading</Button>
              <Button disabled>Disabled</Button>
              <Button fullWidth>Full Width</Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Card Variants */}
        <Card>
          <CardHeader>
            <CardTitle>Card Component</CardTitle>
            <CardDescription>Different card variants and configurations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <Card variant="default" padding="sm">
                <CardHeader>
                  <CardTitle>Default Card</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-dark-300">This is a default card variant.</p>
                </CardContent>
              </Card>
              
              <Card variant="glass" padding="sm">
                <CardHeader>
                  <CardTitle>Glass Card</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-dark-300">This is a glass card variant.</p>
                </CardContent>
              </Card>
              
              <Card variant="gradient" padding="sm">
                <CardHeader>
                  <CardTitle>Gradient Card</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-dark-300">This is a gradient card variant.</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="primary" size="sm">Card Action</Button>
          </CardFooter>
        </Card>
        
        {/* Input Component */}
        <Card>
          <CardHeader>
            <CardTitle>Input Component</CardTitle>
            <CardDescription>Different input configurations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input 
              label="Default Input" 
              placeholder="Enter text..." 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            
            <Input 
              label="Input with Left Icon" 
              placeholder="Search..." 
              leftIcon={<Search className="w-4 h-4" />}
            />
            
            <Input 
              label="Input with Right Icon" 
              placeholder="Password" 
              type="password"
              rightIcon={<Lock className="w-4 h-4" />}
            />
            
            <Input 
              label="Error State" 
              placeholder="Enter email..." 
              error="Please enter a valid email"
            />
          </CardContent>
        </Card>
        
        {/* Select Component */}
        <Card>
          <CardHeader>
            <CardTitle>Select Component</CardTitle>
            <CardDescription>Custom dropdown select</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select
              label="Select Option"
              options={selectOptions}
              value={selectValue}
              onChange={setSelectValue}
              placeholder="Choose an option"
            />
            
            <Select
              label="Error State"
              options={selectOptions}
              error="Please select an option"
            />
          </CardContent>
        </Card>
        
        {/* Modal Component */}
        <Card>
          <CardHeader>
            <CardTitle>Modal Component</CardTitle>
            <CardDescription>Custom modal dialog</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
            
            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="Modal Title"
              description="This is a modal description"
            >
              <p className="text-dark-300 mb-4">This is the modal content. You can put any content here.</p>
              <ModalFooter>
                <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsModalOpen(false)}>
                  Confirm
                </Button>
              </ModalFooter>
            </Modal>
          </CardContent>
        </Card>
        
        {/* Badge & Switch Components */}
        <Card>
          <CardHeader>
            <CardTitle>Badge & Switch</CardTitle>
            <CardDescription>Badges and toggle switches</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Default</Badge>
              <Badge variant="primary">Primary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="danger">Danger</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="info">Info</Badge>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Badge size="sm">Small</Badge>
              <Badge size="md">Medium</Badge>
              <Badge size="lg">Large</Badge>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Badge dot variant="primary">Dot Badge</Badge>
              <Badge dot variant="success">Online</Badge>
            </div>
            
            <div className="flex items-center gap-4 pt-4">
              <Switch 
                checked={switchValue}
                onChange={setSwitchValue}
                label="Toggle Switch"
              />
              
              <Switch 
                checked={true}
                onChange={() => {}}
                label="Disabled"
                disabled
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Slider Component */}
        <Card>
          <CardHeader>
            <CardTitle>Slider Component</CardTitle>
            <CardDescription>Range slider with marks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Slider
              label="Volume"
              value={sliderValue}
              onChange={setSliderValue}
              min={0}
              max={100}
              step={1}
              showValue
            />
            
            <Slider
              label="Range with Marks"
              value={sliderValue}
              onChange={setSliderValue}
              min={0}
              max={100}
              step={10}
              showValue
              marks={[
                { value: 0, label: '0%' },
                { value: 50, label: '50%' },
                { value: 100, label: '100%' },
              ]}
            />
          </CardContent>
        </Card>
        
        {/* Tooltip Component */}
        <Card>
          <CardHeader>
            <CardTitle>Tooltip Component</CardTitle>
            <CardDescription>Contextual help with positioning</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4 flex-wrap">
              <Tooltip content="Top tooltip" position="top">
                <Button>Top</Button>
              </Tooltip>
              
              <Tooltip content="Bottom tooltip" position="bottom">
                <Button>Bottom</Button>
              </Tooltip>
              
              <Tooltip content="Left tooltip" position="left">
                <Button>Left</Button>
              </Tooltip>
              
              <Tooltip content="Right tooltip" position="right">
                <Button>Right</Button>
              </Tooltip>
            </div>
            
            <div className="flex gap-4 flex-wrap pt-4">
              <Tooltip content="Simple text tooltip">
                <Button variant="secondary">Text Content</Button>
              </Tooltip>
              
              <Tooltip content={
                <div className="text-center">
                  <p className="font-semibold">Rich Content</p>
                  <p className="text-xs mt-1">This is a tooltip with HTML content</p>
                </div>
              }>
                <Button variant="ghost">Rich Content</Button>
              </Tooltip>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};