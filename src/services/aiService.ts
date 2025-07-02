import { Forecast } from '@/types';

class AIService {
  async getForecast(zone?: string): Promise<Forecast[]> {
    // Simulate AI forecasting with dummy data
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const forecasts: Forecast[] = months.map(month => ({
      period: `${month} 2024`,
      incidents: Math.floor(Math.random() * 30) + 10,
      confidence: Math.floor(Math.random() * 20) + 80,
      riskLevel: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)] as any,
      recommendations: [
        'Increase patrol frequency in high-risk areas',
        'Install additional monitoring equipment',
        'Conduct awareness campaigns',
        'Strengthen grid infrastructure'
      ].slice(0, Math.floor(Math.random() * 3) + 1)
    }));
    
    return forecasts;
  }

  async analyzeImage(imageData: string): Promise<{ isValid: boolean; confidence: number; issues?: string[] }> {
    // Simulate meter image validation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const isValid = Math.random() > 0.2;
    const confidence = Math.floor(Math.random() * 30) + 70;
    
    return {
      isValid,
      confidence,
      issues: isValid ? undefined : ['Blurry image', 'Meter not fully visible', 'Poor lighting']
    };
  }

  async processNLPCommand(text: string): Promise<{ intent: string; entities: any; confidence: number }> {
    // Simple NLP processing for demo
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('bill') && (lowerText.includes('generate') || lowerText.includes('show'))) {
      return { intent: 'show_bill', entities: {}, confidence: 0.95 };
    }
    
    if (lowerText.includes('meter') && lowerText.includes('reading')) {
      return { intent: 'submit_meter_reading', entities: {}, confidence: 0.90 };
    }
    
    if (lowerText.includes('complaint') || lowerText.includes('complain')) {
      return { intent: 'register_complaint', entities: {}, confidence: 0.88 };
    }
    
    if (lowerText.includes('pay') && lowerText.includes('bill')) {
      return { intent: 'pay_bill', entities: {}, confidence: 0.92 };
    }
    
    return { intent: 'unknown', entities: {}, confidence: 0.1 };
  }
}

export const aiService = new AIService();