import React from 'react'
import './App.scss'
import TopNavigation from './components/TopNavigation'
import Footer from './components/Footer'
import { Switch, Route, Redirect } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import { Layout } from 'antd'
import Dashboard from './components/Dashboard'
import Checkout from './components/Checkout/index'

const App = () => {
  const { Content } = Layout

  return (
    <div className="main-app">
      <TopNavigation />
      <main>
        <Layout className="main-app__content">
          <Sidebar />
          <Content>
            <Switch>
              <Route exact path="/">
                <Redirect to="/admin/posted-product" />
              </Route>
              <Route exact path={['/admin/posted-product', '/admin/edit/:id']}>
                <Dashboard />
              </Route>
              <Route exact path="/admin/product-deleted">
                <Checkout />
              </Route>
              <Route exact path="/settings/account">
                <>
                  Please add components Breadcrumb and Content of Account over
                  here
                </>
              </Route>
              <Route path="*">
                <Redirect to="/" />
              </Route>
            </Switch>
          </Content>
        </Layout>
      </main>
      <Footer />
    </div>
  )
}

export default App
