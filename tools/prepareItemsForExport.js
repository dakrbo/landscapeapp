import path from 'path';
import fs from 'fs';
import settings from 'dist/settings';
import Parser from 'json2csv/lib/JSON2CSVParser'

const fields = settings => [{
  label: 'id',
  value: 'id'
}, {
  label: 'Name',
  value: 'name'
}, {
  label: 'Organization',
  value: 'organization'
}, {
  label: 'Homepage',
  value: 'homepage_url'
}, {
  label: 'Logo',
  value: (row) => `${settings.global.website}/logos/${row.image_data.fileName}`
}, {
  label: 'Twitter',
  value: 'twitter'
}, {
  label: 'Crunchbase URL',
  value: 'crunchbase'
}, {
  label: 'Market Cap',
  value: 'yahoo_finance_data.market_cap'
}, {
  label: 'Ticker',
  value: 'yahoo_finance_data.effective_ticker'
}, {
  label: 'Funding',
  value: 'crunchbaseData.funding'
}, {
  label: 'Member',
  value: 'member'
}, {
  label: 'Relation',
  value: 'relation'
}, {
  label: 'License',
  value: 'license'
}, {
  label: 'Headquarters',
  value: 'headquarters'
}, {
  label: 'Latest Tweet Date',
  value: (row) => formatDate(row, 'latestTweetDate.original')
}, {
  label: 'Description',
  value: 'description'
}, {
  label: 'Crunchbase Description',
  value: 'crunchbaseData.description'
}, {
  label: 'Crunchbase Homepage',
  value: 'crunchbaseData.homepage'
}, {
  label: 'Crunchbase City',
  value: 'crunchbaseData.city'
}, {
  label: 'Crunchbase Region',
  value: 'crunchbaseData.region'
}, {
  label: 'Crunchbase Country',
  value: 'crunchbaseData.country'
}, {
  label: 'Crunchbase Twitter',
  value: 'crunchbaseData.twitter'
}, {
  label: 'Crunchbase Linkedin',
  value: 'crunchbaseData.linkedin'
}, {
  label: 'Crunchbase Ticker',
  value: 'crunchbaseData.ticker'
}, {
  label: 'Crunchbase Kind',
  value: 'crunchbaseData.kind'
}, {
  label: 'Crunchbase Min Employees',
  value: 'crunchbaseData.numEmployeesMin'
}, {
  label: 'Crunchbase Max Employees',
  value: 'crunchbaseData.numEmployeesMax'
}, {
  label: 'Category',
  value: 'category'
}, {
  label: 'Subcategory',
  value: (row) => row.landscape.split(' / ')[1]
}, {
  label: 'OSS',
  value: 'oss'
}, {
  label: 'Github Repo',
  value: 'repo_url'
}, {
  label: 'Github Stars',
  value: 'github_data.stars'
}, {
  label: 'Github Description',
  value: 'github_data.description'
}, {
  label: 'Github Latest Commit Date',
  value: (row) => formatDate(row, 'latest_commit_date')
}, {
  label: 'Github Latest Commit Link',
  value: (row) => row.github_data ? ('https://github.com' + row.github_data.latest_commit_link) : ''
}, {
  label: 'Github Release Date',
  value: (row) => formatDate(row, 'github_data.release_date')
}, {
  label: 'Github Release Link',
  value: 'github_data.release_link'
}, {
  label: 'Github Start Commit Date',
  value: (row) => formatDate(row, 'github_start_commit_data.start_date')
}, {
  label: 'Github Start Commit Link',
  value: (row) => row.github_start_commit_data ? ('https://github.com' + row.github_start_commit_data.start_commit_link) : ''
}, {
  label: 'Github Contributors Count',
  value: 'github_data.contributors_count'
}, {
  label: 'Github Contributors Link',
  value: 'github_data.contributors_link'
}]

function formatDate(row, field) {
  const fieldParts = field.split('.');
  var value = row[fieldParts[0]];
  if (!value) {
    return '';
  }
  if (fieldParts[1]) {
    value = value[fieldParts[1]];
  }
  if (!value) {
    return '';
  }
  return value.substring(0, 10) + ' ' + value.substring(11, 19);
}

const prepareItemsForExport = items => {
  const parser = new Parser({ fields: fields(settings), quote: '' })

  return items.map(item => {
    const { fields } = parser.opts
    return fields.map(field => [field.label, parser.processValue(field.value(item))])
  })
}

export default prepareItemsForExport
