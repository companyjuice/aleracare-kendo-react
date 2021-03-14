import * as React from 'react';

export enum PROFILE {
    MARTY,
    RYAN,
    MAT,
}

export interface ProfileContextType {
    profile: PROFILE,
    onProfileChange?: any
}

export const ProfileContext = React.createContext<ProfileContextType>({
    profile: PROFILE.MARTY
});
