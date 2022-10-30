export function getPocketbaseMedia(collectionName, recordId, file) {
  const url = `${collectionName}/${recordId}/${file}`
  // Otherwise prepend the URL path with the Strapi URL
  return `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/files/${url}`
}
