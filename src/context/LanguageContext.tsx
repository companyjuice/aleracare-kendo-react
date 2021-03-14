import * as React from 'react';

export enum LANGUAGE {
    ENGLISH,
    FRENCH,
}

export interface LanguageContextType {
    language: LANGUAGE,
    onLanguageChange?: any
}

export const LanguageContext = React.createContext<LanguageContextType>({
    language: LANGUAGE.ENGLISH
});
