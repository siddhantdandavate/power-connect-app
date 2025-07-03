import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { supportedLanguages, getLanguageByCode } from '@/data/languages';
import { useTranslation } from '@/hooks/useTranslation';
import { LanguageContext } from '@/contexts/LanguageContext';
import { useContext } from 'react';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  const currentLanguage = getLanguageByCode(language);

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    setIsExpanded(false);
  };

  if (isExpanded) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto bg-background border border-border">
          <CardHeader className="bg-background">
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Globe size={20} />
              Select Language / भाषा चुनें / ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ
            </CardTitle>
          </CardHeader>
          <CardContent className="bg-background">
            <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto">
              {supportedLanguages.map((lang) => (
                <Button
                  key={lang.code}
                  variant={language === lang.code ? "default" : "outline"}
                  onClick={() => handleLanguageChange(lang.code)}
                  className="justify-start h-auto p-3 text-foreground hover:bg-accent hover:text-accent-foreground border-border"
                >
                  <div className="flex items-center gap-3 w-full">
                    <span className="text-lg">{lang.flag}</span>
                    <div className="text-left flex-1">
                      <p className="font-medium text-foreground">{lang.nativeName}</p>
                      <p className="text-xs text-muted-foreground">{lang.name}</p>
                    </div>
                    {language === lang.code && (
                      <Check className="text-green-600" size={16} />
                    )}
                  </div>
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              onClick={() => setIsExpanded(false)}
              className="w-full mt-4 text-foreground border-border hover:bg-accent"
            >
              Close
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsExpanded(true)}
        className="flex items-center gap-2 bg-white/10 text-white border-white/30 hover:bg-white/20 hover:text-white"
      >
        <Globe size={16} />
        <span className="hidden sm:inline">{currentLanguage?.nativeName || 'English'}</span>
        <span className="sm:hidden">{currentLanguage?.flag || '🇺🇸'}</span>
        <ChevronDown size={12} />
      </Button>
    </div>
  );
};

export default LanguageSwitcher;