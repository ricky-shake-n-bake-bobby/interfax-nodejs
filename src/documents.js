class Documents {

  constructor(client) {
    this._client = client;
  }

  create(filename, file_size, options, callback) {
    if (typeof(options) === 'function') {
      callback = options;
      options = {};
    }
    options = options || {};
    options.name = filename;
    options.size = file_size;

    return this._client.post('/outbound/documents', options, callback);
  }

  all(params, callback) {
    return this._client.get('/outbound/documents', params, callback);
  }

  find(id, callback) {
    return this._client.get(`/outbound/documents/${id}`, callback);
  }

  cancel(id, callback) {
    return this._client.delete(`/outbound/documents/${id}`, callback);
  }

  upload(id, range_start, range_end, chunk, callback) {
    let headers = { 'Range': `bytes=${range_start}-${range_end}` };
    return this._client.request('POST', `/outbound/documents/${id}`, headers, chunk, {}, callback);
  }
}

export default Documents;
