
export default {
  getFileByID (id, files) {
    let i
    for (i = 0; i < files.length; i++) {
      if (files[i].id === id) {
        return files[i]
      }
    }
  },
  addCrimesToFile (fileId, crimes){
    return true
  }
}
