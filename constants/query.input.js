/**
 * `query`
 *
 * @constant
 * @type {InputDef}
 */
module.exports = {
  friendlyName: 'Query (s3q)',
  description: 'A stage three Waterline query.',
  extendedDescription: 'The `meta` key of this dictionary is reserved for certain special "meta keys" (e.g. flags, signals, etc.) and other custom, adapter-specific extensions.',
  moreInfoUrl: 'https://github.com/balderdashy/waterline/blob/90d7113a383fba4bbc77ac4dd2e072634cba2681/ARCHITECTURE.md#stage-3-query',
  required: true,
  readOnly: true,
  example: '==='//e.g. `{ method: 'create', using: 'the_table_name', ... }`
};
