import React from 'react'

import Adopters from '../components/layouts/adopters/adopters'
import Coding from '../components/layouts/coding/coding'
import FeatureContent from '../components/layouts/feature-content/feature-content'
import Hero from '../components/layouts/hero/hero'
import Layout from '../components/layouts/layout/layout'
import Quickstart from '../components/layouts/quickstart/quickstart'
import Quotes from '../components/layouts/quotes/quotes'
import SEO from '../components/layouts/seo/seo'
import Stats from '../components/layouts/stats/stats'
import * as content from '../page-content/content-cloud'
import { sharedAdopters } from '../page-content/shared/content-adopters'
import { sharedQuotes } from '../page-content/shared/content-quotes'
import { sharedStats } from '../page-content/shared/content-stats'

const CloudPage = () => (
  <Layout>
    <SEO {...content.seo} />
    <Hero {...content.hero} />
    <Adopters {...sharedAdopters} />
    <FeatureContent {...content.featureContentCloud} />
    <FeatureContent {...content.featureContentUX} />
    <Coding {...content.coding} />
    <Stats {...sharedStats} />
    <Quotes {...sharedQuotes} />
    <Quickstart {...content.quickstart} />
  </Layout>
)

export default CloudPage
