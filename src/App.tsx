import React from 'react'
import {
  BrowserRouter,
  HashRouter,
  Redirect,
  Route,
  Switch,
  useLocation
} from 'react-router-dom'

import styles from './styles/app.module.scss'
import './styles/main.scss'

import { Header } from './components/Header'
import { Footer } from './components/Footer'

import Dashboard from './pages/Dashboard.jsx'
import Planning from './pages/Planning.jsx'
import Profile from './pages/Profile.jsx'
import Sales from './pages/Sales.jsx'
import Stocks from './pages/Stocks.jsx'
import Info from './pages/Info.jsx'

import { StockPage } from './pages/StockPage'
import { HeatmapPage } from './pages/HeatmapPage'
import { VirtualizedPage } from './pages/VirtualizedPage'

import { UserProfile } from './components/User/UserProfile'

import DrawerRouterContainer from './components/DrawerRouterContainer.jsx'
import { AppContext } from './context/AppContext'
import { countries } from './resources/countries'
import { IntlProvider, load, LocalizationProvider, loadMessages } from '@progress/kendo-react-intl'

//import { load } from '@progress/kendo-react-intl'
import { CustomIntlProvider } from './components/CustomIntlProvider'

import { CurrencyContext, CURRENCY } from './context/CurrencyContext'
import { SectorContext, SECTOR } from './context/SectorContext'
import { SymbolsContext } from './context/SymbolsContext'
import { LanguageContext, LANGUAGE } from './context/LanguageContext'
import { ProfileContext, PROFILE } from './context/ProfileContext'

import { enMessages } from './messages/en-US'
import { frMessages } from './messages/fr'
import { esMessages } from './messages/es'

/* CLDR Data */

import likelySubtags from 'cldr-core/supplemental/likelySubtags.json'
import currencyData from 'cldr-core/supplemental/currencyData.json'
import weekData from 'cldr-core/supplemental/weekData.json'

import bgNumbers from 'cldr-numbers-full/main/bg/numbers.json'
import bgLocalCurrency from 'cldr-numbers-full/main/bg/currencies.json'
import bgCaGregorian from 'cldr-dates-full/main/bg/ca-gregorian.json'
import bgDateFields from 'cldr-dates-full/main/bg/dateFields.json'

import esNumbers from 'cldr-numbers-full/main/es/numbers.json'
import esLocalCurrency from 'cldr-numbers-full/main/es/currencies.json'
import esCaGregorian from 'cldr-dates-full/main/es/ca-gregorian.json'
import esDateFields from'cldr-dates-full/main/es/dateFields.json'

import frNumbers from 'cldr-numbers-full/main/fr/numbers.json'
import frLocalCurrency from 'cldr-numbers-full/main/fr/currencies.json'
import frCaGregorian from 'cldr-dates-full/main/fr/ca-gregorian.json'
import frDateFields from'cldr-dates-full/main/fr/dateFields.json'

import gbNumbers from 'cldr-numbers-full/main/en-GB/numbers.json'
import gbLocalCurrency from 'cldr-numbers-full/main/en-GB/currencies.json'
import gbCaGregorian from 'cldr-dates-full/main/en-GB/ca-gregorian.json'
import gbDateFields from 'cldr-dates-full/main/en-GB/dateFields.json'

import usNumbers from 'cldr-numbers-full/main/en/numbers.json'
import usLocalCurrency from 'cldr-numbers-full/main/en/currencies.json'
import usCaGregorian from 'cldr-dates-full/main/en/ca-gregorian.json'
import usDateFields from 'cldr-dates-full/main/en/dateFields.json'

load(
  likelySubtags,
  currencyData,
  weekData,
  bgNumbers,
  bgLocalCurrency,
  bgCaGregorian,
  bgDateFields,
  esNumbers,
  esLocalCurrency,
  esCaGregorian,
  esDateFields,
  frNumbers,
  frLocalCurrency,
  frCaGregorian,
  frDateFields,
  gbNumbers,
  gbLocalCurrency,
  gbCaGregorian,
  gbDateFields,
  usNumbers,
  usLocalCurrency,
  usCaGregorian,
  usDateFields
)

loadMessages(esMessages, 'es')
loadMessages(frMessages, 'fr')
loadMessages(enMessages, 'en-US')


const Main = () => {
  return (
    <Stocks />
  )
}


const App: React.FunctionComponent<any> = () => {
  
  const [contextState, setContextState] = React.useState({
    localeId: 'en-US',
    firstName: 'Martin',
    lastName: 'McGee',
    middleName: 'Andrew',
    email: 'mcgee.marty@gmail.com',
    phoneNumber: '(+1) 707-980-1136',
    avatar: null,
    country: countries[33].name,
    isInPublicDirectory: true,
    biography: '',
    teamId: 1
  })

  const handleLanguageChange = React.useCallback(
    (event) => { 
      setContextState({...contextState, localeId: event.value.localeId}) 
    },
    [contextState, setContextState]
  )

  const handleProfileChange = React.useCallback(
    (event) => {
      setContextState({...contextState, ...event.dataItem})
    },
    [contextState, setContextState]
  )

  const selectedSymbols = React.useRef<string[]>(["SNAP"])
  const [symbols, setSymbols] = React.useState<any>({
    [SECTOR.HEALTHCARE]: ['SYK', "GILD", "DHR", "CVS", "BMY", "TMO", "SNY"],
    [SECTOR.TECHNOLOGY]: ['TWTR', 'AAPL', "MSFT", "SNAP", "NVDA", "CSCO"]
  })
  const [sector, setSector] = React.useState<SECTOR>(SECTOR.TECHNOLOGY)
  const [currency, setCurrency] = React.useState<CURRENCY>(CURRENCY.USD)

  const locales = {
    [CURRENCY.USD]: 'en-US',
    [CURRENCY.BGN]: 'bg-BG',
    [CURRENCY.GBP]: 'en-GB'
  }

  const handleCurrencyChange = React.useCallback(
    (value: CURRENCY) => { setCurrency(value) },
    [setCurrency]
  )

  const handleSectorChange = React.useCallback(
    (value: SECTOR) => { setSector(value) },
    [setSector]
  )

  const handleSymbolsChange = React.useCallback(
    (value: string[]) => { setSymbols({ ...symbols, [sector]: value }) },
    [setSymbols, sector, symbols]
  )

  const handleSelectedSymbolsChange = React.useCallback(
    (value: [string]) => { selectedSymbols.current = value },
    [selectedSymbols]
  )

  const handleSymbolsRemove = React.useCallback(
    () => {
      const newSymbols = symbols[sector].filter((s: string) => !selectedSymbols.current.some((x) => x === s))
      selectedSymbols.current = []
      setSymbols({ ...symbols, [sector]: newSymbols })
    },
    [setSymbols, symbols, sector]
  )

  return (
    <div className="App">
      <LocalizationProvider language={contextState.localeId}>
        <IntlProvider locale={contextState.localeId}>
          {/* */}
          <AppContext.Provider value={{
            ...contextState,
            onLanguageChange: handleLanguageChange,
            onProfileChange: handleProfileChange
          }}>
                <CustomIntlProvider locale={locales[currency]}>
                  <SymbolsContext.Provider value={{
                    selectedSymbols,
                    symbols, 
                    onSymbolsChange: handleSymbolsChange,
                    onSelectedSymbolsChange: handleSelectedSymbolsChange,
                    onSymbolsRemove: handleSymbolsRemove
                  }}>
                    <SectorContext.Provider value={{ sector, onSectorChange: handleSectorChange }}>
                      <CurrencyContext.Provider value={{ currency, onCurrencyChange: handleCurrencyChange }}>
                        <HashRouter>
                          <DrawerRouterContainer>
                            <Switch>
                              <Route exact={true} path="/" component={Dashboard} />
                              <Route exact={true} path="/planning" component={Planning} />
                              <Route exact={true} path="/profile" component={Profile} />
                              <Route exact={true} path="/sales" component={Sales} />
                              <Route exact={true} path="/stocks" component={Stocks} />
                              <Route exact={true} path="/info" component={Info} />
                            </Switch>
                          </DrawerRouterContainer>
                          {/*
                          <main className={styles.main}>
                            <Main />
                          </main>
                          */}
                        </HashRouter>
                        <Footer />
                      </CurrencyContext.Provider>
                    </SectorContext.Provider>
                  </SymbolsContext.Provider>
                </CustomIntlProvider>
          {/* */}
          </AppContext.Provider>
          {/* */}
        </IntlProvider>
      </LocalizationProvider>
    </div>
  )
}

export default App
