import { useState } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Input,
  Select,
  Modal,
  ModalFooter,
  Badge,
  Switch,
  Slider,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Spinner,
  Skeleton,
  Tooltip,
  ToastContainer,
} from '@/components/ui';
import { useToast } from '@/hooks';
import { Search, Mail, Lock } from 'lucide-react';

export const ComponentShowcase = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [switchValue, setSwitchValue] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);
  const [selectValue, setSelectValue] = useState('');
  const { toasts, success, error, warning, info } = useToast();

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 p-8">
      <ToastContainer toasts={toasts} />

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2 text-gradient">
            Component Showcase
          </h1>
          <p className="text-dark-300">
            All UI components ready for Phase 1 development
          </p>
        </div>

        <Tabs defaultValue="buttons">
          <TabsList className="mb-6">
            <TabsTrigger value="buttons">Buttons</TabsTrigger>
            <TabsTrigger value="inputs">Inputs</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="data">Data Display</TabsTrigger>
            <TabsTrigger value="loading">Loading</TabsTrigger>
          </TabsList>

          {/* Buttons Tab */}
          <TabsContent value="buttons">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Button Variants</CardTitle>
                  <CardDescription>
                    Different button styles for various actions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex gap-2 flex-wrap">
                      <Button variant="primary">Primary</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button variant="danger">Danger</Button>
                      <Button variant="success">Success</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Button Sizes</CardTitle>
                  <CardDescription>Small, medium, and large sizes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex gap-2 items-center flex-wrap">
                      <Button size="sm">Small</Button>
                      <Button size="md">Medium</Button>
                      <Button size="lg">Large</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Button States</CardTitle>
                  <CardDescription>Loading and disabled states</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex gap-2 flex-wrap">
                      <Button loading>Loading</Button>
                      <Button disabled>Disabled</Button>
                      <Button fullWidth>Full Width</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Inputs Tab */}
          <TabsContent value="inputs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Input Fields</CardTitle>
                  <CardDescription>Text inputs with various options</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Input
                      label="Email"
                      type="email"
                      placeholder="Enter your email"
                      leftIcon={<Mail className="w-4 h-4" />}
                    />
                    <Input
                      label="Password"
                      type="password"
                      placeholder="Enter password"
                      leftIcon={<Lock className="w-4 h-4" />}
                    />
                    <Input
                      label="Search"
                      placeholder="Search..."
                      leftIcon={<Search className="w-4 h-4" />}
                      helperText="Search by name or ID"
                    />
                    <Input
                      label="Error State"
                      error="This field is required"
                      placeholder="Required field"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Select & Controls</CardTitle>
                  <CardDescription>Dropdowns, switches, and sliders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Select
                      label="Choose Strategy"
                      options={[
                        { value: 'strategy1', label: 'Strategy 1' },
                        { value: 'strategy2', label: 'Strategy 2' },
                        { value: 'strategy3', label: 'Strategy 3' },
                      ]}
                      value={selectValue}
                      onChange={setSelectValue}
                      placeholder="Select a strategy"
                    />

                    <Switch
                      checked={switchValue}
                      onChange={setSwitchValue}
                      label="Enable Auto-trading"
                    />

                    <Slider
                      label="Risk Level"
                      value={sliderValue}
                      onChange={setSliderValue}
                      min={0}
                      max={100}
                      showValue
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Feedback Tab */}
          <TabsContent value="feedback">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Toasts</CardTitle>
                  <CardDescription>
                    Notification messages for user feedback
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button
                      variant="success"
                      onClick={() => success('Success!', 'Operation completed')}
                      fullWidth
                    >
                      Show Success Toast
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => error('Error!', 'Something went wrong')}
                      fullWidth
                    >
                      Show Error Toast
                    </Button>
                    <Button
                      onClick={() => warning('Warning!', 'Please be careful')}
                      fullWidth
                    >
                      Show Warning Toast
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => info('Info', 'Here is some information')}
                      fullWidth
                    >
                      Show Info Toast
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Modal</CardTitle>
                  <CardDescription>
                    Dialog for important information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => setIsModalOpen(true)} fullWidth>
                    Open Modal
                  </Button>

                  <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title="Confirm Action"
                    description="Are you sure you want to proceed with this action?"
                  >
                    <p className="text-dark-300">
                      This action cannot be undone. Please confirm that you want to
                      continue.
                    </p>
                    <ModalFooter>
                      <Button
                        variant="secondary"
                        onClick={() => setIsModalOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => {
                          setIsModalOpen(false);
                          success('Confirmed', 'Action completed');
                        }}
                      >
                        Confirm
                      </Button>
                    </ModalFooter>
                  </Modal>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tooltips</CardTitle>
                  <CardDescription>Helpful hints on hover</CardDescription>
                </CardHeader>
                <CardContent>
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
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Data Display Tab */}
          <TabsContent value="data">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Badges</CardTitle>
                  <CardDescription>Status indicators and labels</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="default">Default</Badge>
                      <Badge variant="primary">Primary</Badge>
                      <Badge variant="success">Success</Badge>
                      <Badge variant="danger">Danger</Badge>
                      <Badge variant="warning">Warning</Badge>
                      <Badge variant="info">Info</Badge>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="success" dot>
                        Active
                      </Badge>
                      <Badge variant="danger" dot>
                        Error
                      </Badge>
                      <Badge variant="warning" dot>
                        Pending
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Card Variants</CardTitle>
                  <CardDescription>Different card styles</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Card variant="default" padding="sm">
                      <p className="text-dark-200">Default Card</p>
                    </Card>
                    <Card variant="glass" padding="sm">
                      <p className="text-dark-200">Glass Card</p>
                    </Card>
                    <Card variant="gradient" padding="sm" hover>
                      <p className="text-dark-200">Gradient Card (Hover me)</p>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Loading Tab */}
          <TabsContent value="loading">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Spinners</CardTitle>
                  <CardDescription>Loading indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-6 items-center">
                    <Spinner size="sm" />
                    <Spinner size="md" />
                    <Spinner size="lg" />
                    <Spinner size="xl" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Skeletons</CardTitle>
                  <CardDescription>Placeholder loading states</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Skeleton variant="text" width="100%" />
                    <Skeleton variant="text" width="80%" />
                    <Skeleton variant="text" width="60%" />
                    <div className="flex gap-3 items-center mt-4">
                      <Skeleton variant="circular" width={50} height={50} />
                      <div className="flex-1 space-y-2">
                        <Skeleton variant="text" width="100%" />
                        <Skeleton variant="text" width="70%" />
                      </div>
                    </div>
                    <Skeleton variant="rectangular" width="100%" height={100} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};