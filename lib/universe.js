/**
 * create a new array of size and
 * all element initialized calling initializer
 * @param { int } size of the array
 * @param { callback } initializer for the elements
 * @returns
 */
function _helper (size, initializer) {
  const arr = new Array(size)
  for (let i = 0; i < size; i++) {
    arr[i] = initializer()
  }
  return arr
}

/**
 * crop arr from start to end
 * @param { T[] } arr to crop
 * @param { int } start new start
 * @param { int } end new end
 */
function _crop (arr, start, end) {
  arr.splice(end + 1, arr.length - end)
  arr.splice(0, start)
}

/**
 * coordinate to locate cells in the universe
 */
export class Point2D {
  constructor (x, y) {
    this.x = x
    this.y = y
  }
}

/**
 * basic rappresentation of a cell
 * in the universe with its coordinates
 * and data that tell if it's attive or not
 */
export class Cell {
  constructor (data, x, y) {
    this.data = data
    this.coordinate = new Point2D(x, y)
  }
}

/**
 * 3x3 matrix with it's coordinate
 * to locate it in the universe.
 * The coordinate refers to its center
 */
export class Sector {
  constructor (data, x, y) {
    this.data = data
    this.coordinate = new Point2D(x, y)
  }
}

/**
 * the grid of the universe with it's 2d matrix
 * to maintain informations of it's cells.
 * the rows refer to x coordinate
 * and cols refers to y coordinate
 */
export class Grid {
  /**
   * initialize the grid of the universe
   * with initialSize and set the cellInitializer.
   * create the first matrix calling _createMatrix
   * @param { int } initialSize
   * @param { callback } cellInitializer
   */
  constructor (initialSize, cellInitializer) {
    this.size = initialSize
    this._cellInitializer = cellInitializer
    this.matrix = this._createMatrix(initialSize)
  }

  /**
   * create a matrix with size and cells initialized
   * calling this._cellInitializer
   * @param { int } size for the matrix
   * @returns the newly created matrix
   */
  _createMatrix (size) {
    return _helper(size, () => this._createRow(size))
  }

  /**
   * create a row with size and cells initialized
   * calling this._cellInitializer
   * @param { int } size for the row
   * @returns the newly created row
   */
  _createRow (size) {
    return _helper(size, this._cellInitializer)
  }

  /**
   * add extention times row/col in all 4 directions
   * this.size is update adding 2 times extention
   * because extention is applied in every directions
   * @param { int } extention for the matrix
   */
  expand (extention) {
    // extend starts and ends of each rows
    for (let i = 0; i < this.size; i++) {
      this.matrix[i].unshift(...this._createRow(extention))
      this.matrix[i].push(...this._createRow(extention))
    }
    // update size.
    // the estention is applied all size
    this.size += 2 * extention
    for (let i = 0; i < extention; i++) {
      this.matrix.unshift(this._createRow(this.size))
      this.matrix.push(this._createRow(this.size))
    }
  }

  /**
   * crop the matrix to fit into a rectangle
   * located by min and max
   * @param { Point2D } min point for the crop
   * @param { Point2D } max point for the crop
   */
  crop (min, max) {
    _crop(this.matrix, min.y, max.y)
    this.matrix.forEach(row => _crop(row, min.x, max.x))
  }

  /**
   * get the sector in the grid with center
   * @param { Point2D } center of the sector
   * @Returns the sector of center
   */
  getSector (center) {
    const matrix3 = this.matrix.slice(center.y - 1, center.y + 2)
      .flatMap(arr => arr
        .slice(center.x - 1, center.x + 2)
        .map(cell => cell.value)
      ).join('')
    return new Sector(matrix3, center.x, center.y)
  }

  /**
   * create and returns all the sectors in the universe
   * @returns an array containing all the 3x3 matrix of the grid
   */
  explode () {
    const cellPoints = []
    for (let y = 1, h = this.matrix.length - 1; y < h; y++) {
      for (let x = 1, b = this.matrix[y].length - 1; x < b; x++) {
        cellPoints.push(new Point2D(x, y))
      }
    }
    return cellPoints.map(point => this.getSector(point))
  }

  updateCell (cell) {
    this.matrix[cell.coordinate.y][cell.coordinate.x].value = Number.parseInt(cell.data)
  }
}
