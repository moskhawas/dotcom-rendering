const config = {
    name: 'The Guardian',
    isAccessibleForFree: 'True',
};

const ampMarkup = `
<script async custom-element="amp-subscriptions"
src="https://cdn.ampproject.org/v0/amp-subscriptions-0.1.js"></script>
<script async custom-element="amp-subscriptions-google" src="https://cdn.ampproject.org/v0/amp-subscriptions-google-0.1.js"></script>
<script type="application/json" id="amp-subscriptions">
{
  "services": [
    {
     "authorizationUrl": "http://localhost:5000/oauth",
     "pingbackUrl": "http://localhost:5000/pingback",
     "actions":{
       "login": "http://localhost:5000/login",
       "subscribe": "http://localhost:5000/subscribe#viewerUrl=https://google.com"
     }
   },
    {
      "serviceId": "subscribe.google.com"
    }
  ]
}
</script>
<script type="application/ld+json">
{
  "@context": "http://schema.org",
  "@type": "NewsArticle",
  "isAccessibleForFree": "False",
  "publisher": {
    "@type": "Organization",
    "name": "${config.name}",
    "logo": "https://picsum.photos/200/300"
  },
  "hasPart": {
    "@type": "WebPageElement",
    "isAccessibleForFree": "${config.isAccessibleForFree}",
    "cssSelector" : ".paywall"
  },
  "isPartOf": {
    "@type": ["CreativeWork", "Product"],
    "name" : "${config.name}",
    "productID": "${config.name.toLowerCase().replace(' ', '')}.com:basic"
  }
}
</script>
`;

export default ampMarkup;
