const path = require('path')
const fs = require('fs')

class FileTest {
  constructor(dir) {
    this.dir = dir
  }

  readFile (file, encoding = 'utf8') {
    const content = fs.readFileSync(path.resolve(this.dir, file), { encoding })
    return content
  }

  include (file) {
    const main = (f) => {
      try {
        fs.statSync(path.resolve(this.dir, f))
        return true
      } catch (e) {
        return false
      }
    }

    if (Array.isArray(file)) {
      return file.map(f => main(f)).every(Boolean)
    } else {
      return main(file)
    }
  }

  includeFile (file) {
    const main = (f) => {
      try {
        const stat = fs.statSync(path.resolve(this.dir, f))
        return stat.isFile()
      } catch (e) {
        return false
      }
    }

    if (Array.isArray(file)) {
      return file.map(f => main(f)).every(Boolean)
    } else {
      return main(file)
    }
  }

  includeDirectory(dir) {
    const main =(d) => {
      try {
        const stat = fs.statSync(path.resolve(this.dir, d))
        return stat.isDirectory()
      } catch (e) {
        return false
      }
    }
    if (Array.isArray(dir)) {
      return dir.map(d => main(d)).every(Boolean)
    } else {
      return main(dir)
    }
  }
}

module.exports = FileTest
