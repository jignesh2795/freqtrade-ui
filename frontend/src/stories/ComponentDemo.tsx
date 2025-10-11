import React from 'react';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';

export const ComponentDemo = () => {
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
      </div>
    </div>
  );
};