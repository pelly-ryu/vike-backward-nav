export { Layout }

import React from 'react'
import PropTypes from 'prop-types'
import { childrenPropType } from './PropTypeValues'
import { PageContextProvider } from './usePageContext'
import './css/index.css'
import './Layout.css'

Layout.propTypes = {
  pageContext: PropTypes.any,
  children: childrenPropType
}
function Layout({ pageContext, children }) {
  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
          {children}
      </PageContextProvider>
    </React.StrictMode>
  )
}
