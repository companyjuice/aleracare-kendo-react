import * as React from 'react';

export enum APP {
    MM,
    MM2,
}

export interface AppContextType {
    //app: APP,
    languageId?: any,
    firstName?: any,
    lastName?: any,
    middleName?: any,
    email?: any,
    phoneNumber?: any,
    avatar?: any,
    country?: any,
    isInPublicDirectory?: any,
    biography?: any,
    teamId?: any,
    onLanguageChange?: any,
    onProfileChange?: any
}

export const AppContext = React.createContext<AppContextType>({
    //app: APP.MM,
    languageId: 'en',
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
    phoneNumber: '',
    avatar: null,
    country: '',
    isInPublicDirectory: false,
    biography: '',
    teamId: null,
    onLanguageChange: () => {},
    onProfileChange: () => {}
});

AppContext.displayName = 'AppContext';