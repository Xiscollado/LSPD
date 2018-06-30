export default {
  // Get all penal code from DDBB
  // TODO change this for an axios call
  getPenalCode () {
    return [
      {
        id: 1,
        title: 'Uso excesivo del claxon',
        description: 'Utilizar de forma repetida el claxon',
        chapter: 1,
        fine: 125,
        months: 0,
        updated: '06/06/2018'
      },
      {
        id: 2,
        title: 'Alteración del orden público',
        description: 'Momento en el que por medio hay una agresión física. Exceso de ruido en la vía pública, increpar constantemente a civiles',
        chapter: 2,
        fine: 1000,
        months: 10,
        updated: '04/01/2017'
      }
    ]
  },
  getPenalCodeChapters () {
    return [
      {
        id: 1,
        number: 1,
        title: 'Chapter 1 title'
      },
      {
        id: 2,
        number: 2,
        title: 'Chapter 2 title'
      },
      {
        number: 3,
        title: 'Chapter 3 title'
      }
    ]
  },
}
