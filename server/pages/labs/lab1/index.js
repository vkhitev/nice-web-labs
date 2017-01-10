const data = require('./data.json')

function normalizeSites (sites) {
  return sites.map(sites => {
    return {
      link: sites.link,
      site: sites.link.replace(/^.+\/\//, '').replace(/\/$/, ''),
      description: sites.description.charAt(0).toLowerCase() + sites.description.slice(1)
    }
  })
}

const sites = normalizeSites(data.sites)

module.exports = () => ({
  sites: sites,
  books: data.books
})
