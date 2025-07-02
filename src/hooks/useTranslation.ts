import { useContext } from 'react';
import { LanguageContext } from '@/contexts/LanguageContext';
import { getTranslation } from '@/data/translations';

export const useTranslation = () => {
  const { language } = useContext(LanguageContext);
  
  const t = (key: string): string => {
    return getTranslation(key, language);
  };
  
  return { t, language };
};