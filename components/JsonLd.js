// Renders one or more JSON-LD objects. "<" is escaped so content can never close the script tag.
export default function JsonLd({ data }) {
  const items = Array.isArray(data) ? data : [data]
  return items.map((d, i) => (
    <script key={i} type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(d).replace(/</g, '\\u003c') }} />
  ))
}
