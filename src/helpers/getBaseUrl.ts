export default function getBaseUrl(url?: string) {

  return `${process.env.NEXT_PUBLIC_BASE_PATH}/${url}`;

}
