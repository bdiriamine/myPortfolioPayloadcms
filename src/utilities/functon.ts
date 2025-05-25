import { Media } from '@/payload-types'

export const getImageUrl = (image: string | Media | null | undefined, fallback: string) => {
  if (!image) return fallback
  return typeof image === 'string' ? image : image.url || fallback
}
