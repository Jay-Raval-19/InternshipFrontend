
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Palette } from 'lucide-react';

const ThemeSwitcher = () => {
  const [currentTheme, setCurrentTheme] = useState('blue');
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { id: 'blue', name: 'Ocean Blue', color: 'bg-blue-500', description: 'Professional & Trustworthy' },
    { id: 'green', name: 'Nature Green', color: 'bg-green-500', description: 'Sustainable & Fresh' },
    { id: 'purple', name: 'Royal Purple', color: 'bg-purple-500', description: 'Premium & Innovative' }
  ];

  const switchTheme = (themeId: string) => {
    const body = document.body;
    body.classList.remove('theme-blue', 'theme-green', 'theme-purple');
    body.classList.add(`theme-${themeId}`);
    setCurrentTheme(themeId);
    setIsOpen(false);
    
    // Update CSS custom properties for dynamic theming
    const root = document.documentElement;
    switch (themeId) {
      case 'blue':
        root.style.setProperty('--theme-hue', '217');
        break;
      case 'green':
        root.style.setProperty('--theme-hue', '142');
        break;
      case 'purple':
        root.style.setProperty('--theme-hue', '262');
        break;
    }
  };

  return (
    <div className="fixed top-6 right-6 z-50">
      <div className="relative">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="outline"
          size="sm"
          className="bg-white shadow-lg border-2"
        >
          <Palette className="h-4 w-4 mr-2" />
          Theme
        </Button>

        {isOpen && (
          <Card className="absolute top-12 right-0 w-64 p-4 bg-white shadow-xl border-2">
            <h3 className="font-semibold mb-3 text-gray-800">Choose Your Theme</h3>
            <div className="space-y-2">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => switchTheme(theme.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all hover:shadow-md ${
                    currentTheme === theme.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full ${theme.color}`}></div>
                  <div className="text-left">
                    <div className="font-medium text-gray-800">{theme.name}</div>
                    <div className="text-xs text-gray-600">{theme.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ThemeSwitcher;
