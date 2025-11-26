import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { client } from '@/lib/sanity/client'

// Security: add SANITY_WEBHOOK_SECRET to Vercel/GitHub Actions env
// Use in webhook: https://your-site/external/api/revalidate?secret=MY_SECRET

function basePathsForDoc(docType: string | undefined, slug?: string | undefined) {
  const set = new Set<string>()
  if (docType === 'project' || docType === 'work' || docType === 'projectType') {
    if (slug) set.add(`/work/${slug}`)
    set.add('/work')
    return set
  }
  if (docType === 'service') {
    if (slug) set.add(`/services/${slug}`)
    set.add('/services')
    return set
  }
  if (docType === 'post' || docType === 'article' || docType === 'blogPost') {
    if (slug) set.add(`/blog/${slug}`)
    set.add('/blog')
    return set
  }
  if (docType === 'homePage' || docType === 'siteSettings') {
    const sitePaths = ['/', '/about', '/contact', '/services', '/work', '/blog']
    for (const p of sitePaths) set.add(p)
    return set
  }
  return set
}

async function siteSettingsDynamicPaths() {
  const set = new Set<string>()
  try {
    const slugs = await client.fetch(`*[_type in ["project","service","post"] && defined(slug.current)].slug.current`)
    if (slugs && Array.isArray(slugs)) {
      for (const s of slugs) {
        set.add(`/work/${s}`)
        set.add(`/services/${s}`)
        set.add(`/blog/${s}`)
      }
    }
  } catch (err) {
    console.error('Error fetching slugs for revalidation', err)
  }
  return set
}

async function getPathsForDoc(docType: string | undefined, slug?: string | undefined) {
  const set = basePathsForDoc(docType, slug)
  if (docType === 'siteSettings') {
    const dynamic = await siteSettingsDynamicPaths()
    for (const p of dynamic) set.add(p)
  }
  return set
}

export async function POST(req: Request) {
  try {
    const url = new URL(req.url)
    const secret = url.searchParams.get('secret')
    if (!secret || secret !== process.env.SANITY_WEBHOOK_SECRET) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const payload = await req.json()
    // Sanity webhook payload varies; it includes `type`, `id`, `dataset`, and often `document` or `result` fields.
    // Attempt to detect the doc type and slug
    const doc = payload?.document || payload?.result || payload?.body || payload
    const docType = doc?._type || payload?.type || payload?.event || payload?.action
    const slug = doc?.slug?.current || doc?.slug

    const pathsToRevalidate = new Set<string>(['/'])

    const docPaths = await getPathsForDoc(docType, slug)
    for (const p of docPaths) pathsToRevalidate.add(p)

    // Always revalidate the index and maybe search/list pages
    // For safety, avoid revalidating everything; only revalidate mapped paths

    for (const path of pathsToRevalidate) {
      try {
        await revalidatePath(path)
      } catch (err) {
        console.error('Revalidate failed for path', path, err)
      }
    }

    return new NextResponse('Revalidated', { status: 200 })
  } catch (error) {
    console.error('Revalidate endpoint error', error)
    return new NextResponse('Error', { status: 500 })
  }
}
