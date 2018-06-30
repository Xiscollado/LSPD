export default {
  getFiles () {
    return [
      {
        id: 1,
        name: 'Antonio Montoya',
        cardID: '512FXC',
        crimesCount: 23,
        isOnSeek: true,
        updatedDate: '26-06-2018',
        image: 'https://www.beatstats.com/images/artist/large/200360.jpg',
      },
      {
        id: 2,
        name: 'Floid Mbaka',
        cardID: '784RDF',
        crimesCount: 12,
        isOnSeek: false,
        updatedDate: '26-06-2018',
        image: 'https://www.diversifiedriskmanagement.com/photos/county-criminal-record-search-lg.jpg',
      },
      {
        id: 3,
        name: 'Roberto Morales',
        cardID: '632YGH',
        crimesCount: 2,
        isOnSeek: false,
        updatedDate: '26-06-2018',
        image: 'https://www.usnews.com/dims4/USNEWS/81f0186/2147483647/thumbnail/970x647/quality/85/?url=http%3A%2F%2Fmedia.beam.usnews.com%2Ffa%2Fada61368bc48120d8d9674ef9f7bba%2F49979WideModern_CriminalMugShot_131118.jpg',
      },
      {
        id: 4,
        name: 'Louis Strauss',
        cardID: '045FDS',
        crimesCount: 122,
        isOnSeek: false,
        updatedDate: '26-06-2018',
        image: 'https://s.mxmcdn.net/images-storage/albums4/3/9/9/2/9/5/37592993_800_800.jpg',
      }
    ]
  },
  getFileByID (id, files) {
    let i
    for (i = 0; i < files.length; i++) {
      if (files[i].id === parseInt(id)) {
        return files[i]
      }
    }
  }
}
