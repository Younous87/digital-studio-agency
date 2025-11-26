import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

// Security: add SANITY_WEBHOOK_SECRET to Vercel/GitHub Actions env
// Use in webhook: https://your-site/external/api/revalidate?secret=MY_SECRET

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

    const pathsToRevalidate: string[] = ['/']

    // Map some common doc types to paths
    if (docType === 'project' || docType === 'work' || docType === 'projectType') {
      if (slug) pathsToRevalidate.push(`/work/${slug}`)
      pathsToRevalidate.push('/work')
    } else if (docType === 'service') {
      if (slug) pathsToRevalidate.push(`/services/${slug}`)
      pathsToRevalidate.push('/services')
    } else if (docType === 'post' || docType === 'article' || docType === 'blogPost') {
      if (slug) pathsToRevalidate.push(`/blog/${slug}`)
      pathsToRevalidate.push('/blog')
    } else if (docType === 'homePage' || docType === 'siteSettings') {
      pathsToRevalidate.push('/')
    }

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
