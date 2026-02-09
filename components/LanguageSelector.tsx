"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useLanguage, languages, type Language } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

interface LanguageSelectorProps {
  variant?: 'button' | 'compact';
  className?: string;
}

export function LanguageSelector({ variant = 'button', className = '' }: LanguageSelectorProps) {
  const { language, setLanguage, currentLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  if (variant === 'compact') {
    return (
      <div className={`relative ${className}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Globe className="w-5 h-5 text-gray-600" />
          <span className="text-2xl">{currentLanguage.flag}</span>
          <span className="font-medium text-gray-900">{currentLanguage.nativeName}</span>
          <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50 max-h-96 overflow-y-auto"
              >
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {t('selectLanguage')}
                  </p>
                </div>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleSelect(lang.code)}
                    className={`w-full flex items-center justify-between px-4 py-3 hover:bg-emerald-50 transition-colors ${
                      language === lang.code ? 'bg-emerald-50' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{lang.flag}</span>
                      <div className="text-left">
                        <p className="font-semibold text-gray-900">{lang.nativeName}</p>
                        <p className="text-xs text-gray-500">{lang.name}</p>
                      </div>
                    </div>
                    {language === lang.code && (
                      <Check className="w-5 h-5 text-emerald-600" />
                    )}
                  </button>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 border-2"
      >
        <Globe className="w-4 h-4" />
        <span className="text-xl">{currentLanguage.flag}</span>
        <span className="hidden sm:inline">{currentLanguage.nativeName}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border-2 border-gray-200 py-3 z-50 max-h-96 overflow-y-auto"
            >
              <div className="px-4 py-2 border-b border-gray-100 mb-2">
                <p className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-emerald-600" />
                  {t('selectLanguage')}
                </p>
              </div>
              <div className="space-y-1 px-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleSelect(lang.code)}
                    className={`w-full flex items-center justify-between px-3 py-3 rounded-xl hover:bg-emerald-50 transition-all ${
                      language === lang.code ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200' : 'border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{lang.flag}</span>
                      <div className="text-left">
                        <p className={`font-bold ${language === lang.code ? 'text-emerald-600' : 'text-gray-900'}`}>
                          {lang.nativeName}
                        </p>
                        <p className="text-xs text-gray-500">{lang.name}</p>
                      </div>
                    </div>
                    {language === lang.code && (
                      <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
