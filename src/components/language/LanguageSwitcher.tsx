import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Check } from 'lucide-react';
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
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe size={20} />
            Select Language / भाषा चुनें / ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto">
            {supportedLanguages.map((lang) => (
              <Button
                key={lang.code}
                variant={language === lang.code ? "default" : "outline"}
                onClick={() => handleLanguageChange(lang.code)}
                className="justify-start h-auto p-3"
              >
                <div className="flex items-center gap-3 w-full">
                  <span className="text-lg">{lang.flag}</span>
                  <div className="text-left flex-1">
                    <p className="font-medium">{lang.nativeName}</p>
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
            className="w-full mt-4"
          >
            Close
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsExpanded(true)}
        className="flex items-center gap-2"
      >
        <Globe size={16} />
        <span className="hidden sm:inline">{currentLanguage?.nativeName || 'English'}</span>
        <span className="sm:hidden">{currentLanguage?.flag || '🇺🇸'}</span>
      </Button>
    </div>
  );
};

export default LanguageSwitcher;