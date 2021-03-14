import React, { useState } from 'react'
import {
  BrowserRouter,
  HashRouter,
  Redirect,
  Route,
  Switch,
  useLocation
} from 'react-router-dom'

import { StockPage } from './StockPage'
import { HeatmapPage } from './HeatmapPage'
import { VirtualizedPage } from './VirtualizedPage'

import { UserProfile } from '../components/User/UserProfile'

import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

const Stocks = () => {
  const locations = useLocation()
  return (
    <>
      <Route path={"/profile"}>
        <UserProfile />
      </Route>
      <Route path="/heatmap">
        <Header />
        <HeatmapPage />
      </Route>
      <Route path="/virtualized">
        <Header />
        <VirtualizedPage />
      </Route>
      <Route path={["/stocks/:symbol?"]}  >
        <Header />
        <StockPage />
      </Route>
      {locations.pathname === '/' ? <Redirect to="/stocks" /> : null}
    </>
  )
}

export default Stocks