import { useEffect } from 'react'

interface SeoHeadProps {
  title: string
  description: string
  path?: string
  keywords?: string[]
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>
}

const SITE_NAME = 'GigHub'
const SITE_URL = 'https://fintie.github.io/GigLift'
const DEFAULT_IMAGE = `${SITE_URL}/favicon.svg`

function upsertMeta(selector: string, create: () => HTMLMetaElement, updater: (node: HTMLMetaElement) => void) {
  let node = document.head.querySelector(selector) as HTMLMetaElement | null
  if (!node) {
    node = create()
    document.head.appendChild(node)
  }
  updater(node)
}

function upsertLink(selector: string, create: () => HTMLLinkElement, updater: (node: HTMLLinkElement) => void) {
  let node = document.head.querySelector(selector) as HTMLLinkElement | null
  if (!node) {
    node = create()
    document.head.appendChild(node)
  }
  updater(node)
}

export function SeoHead({ title, description, path = '/', keywords = [], jsonLd }: SeoHeadProps) {
  useEffect(() => {
    const canonicalUrl = `${SITE_URL}${path === '/' ? '/' : path}`
    document.title = `${title} | ${SITE_NAME}`

    upsertMeta('meta[name="description"]', () => {
      const meta = document.createElement('meta')
      meta.name = 'description'
      return meta
    }, (node) => {
      node.content = description
    })

    upsertMeta('meta[name="keywords"]', () => {
      const meta = document.createElement('meta')
      meta.name = 'keywords'
      return meta
    }, (node) => {
      node.content = keywords.join(', ')
    })

    upsertMeta('meta[property="og:title"]', () => {
      const meta = document.createElement('meta')
      meta.setAttribute('property', 'og:title')
      return meta
    }, (node) => {
      node.content = `${title} | ${SITE_NAME}`
    })

    upsertMeta('meta[property="og:description"]', () => {
      const meta = document.createElement('meta')
      meta.setAttribute('property', 'og:description')
      return meta
    }, (node) => {
      node.content = description
    })

    upsertMeta('meta[property="og:type"]', () => {
      const meta = document.createElement('meta')
      meta.setAttribute('property', 'og:type')
      return meta
    }, (node) => {
      node.content = 'website'
    })

    upsertMeta('meta[property="og:url"]', () => {
      const meta = document.createElement('meta')
      meta.setAttribute('property', 'og:url')
      return meta
    }, (node) => {
      node.content = canonicalUrl
    })

    upsertMeta('meta[property="og:image"]', () => {
      const meta = document.createElement('meta')
      meta.setAttribute('property', 'og:image')
      return meta
    }, (node) => {
      node.content = DEFAULT_IMAGE
    })

    upsertMeta('meta[name="twitter:card"]', () => {
      const meta = document.createElement('meta')
      meta.name = 'twitter:card'
      return meta
    }, (node) => {
      node.content = 'summary'
    })

    upsertMeta('meta[name="twitter:title"]', () => {
      const meta = document.createElement('meta')
      meta.name = 'twitter:title'
      return meta
    }, (node) => {
      node.content = `${title} | ${SITE_NAME}`
    })

    upsertMeta('meta[name="twitter:description"]', () => {
      const meta = document.createElement('meta')
      meta.name = 'twitter:description'
      return meta
    }, (node) => {
      node.content = description
    })

    upsertLink('link[rel="canonical"]', () => {
      const link = document.createElement('link')
      link.rel = 'canonical'
      return link
    }, (node) => {
      node.href = canonicalUrl
    })

    const structuredDataId = 'gighub-jsonld'
    const existingJsonLd = document.getElementById(structuredDataId)
    if (existingJsonLd) {
      existingJsonLd.remove()
    }

    if (jsonLd) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.id = structuredDataId
      script.textContent = JSON.stringify(jsonLd)
      document.head.appendChild(script)
    }

    return () => {
      const node = document.getElementById(structuredDataId)
      if (node) node.remove()
    }
  }, [description, jsonLd, keywords, path, title])

  return null
}
