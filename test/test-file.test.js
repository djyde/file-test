const FileTest = require('../lib')
const path = require('path')

describe('file test', () => {

  const fixtures = path.resolve(__dirname, './fixtures')
  const tf = new FileTest(fixtures)

  test('include', () => {

    expect(tf.include('foo')).toBe(true)
    expect(tf.include('bar')).toBe(true)
    expect(tf.include('foo/bar.js')).toBe(true)
    expect(tf.include('barz')).toBe(false)
    expect(tf.include('foo/ba.js')).toBe(false)

    // array

    expect(tf.include([
      'foo',
      'bar',
      'foo/bar.js'
    ])).toBe(true)

    expect(tf.include([
      'foo',
      'bar',
      'foo/bar.js',
      'barz'
    ])).toBe(false)

  })

  test('includeFile', () => {
    expect(tf.includeFile('foo')).toBe(false)
    expect(tf.includeFile('bar')).toBe(false)
    expect(tf.includeFile('foo/bar.js')).toBe(true)

    // array

    expect(tf.includeFile([
      'foo/bar.js',
      'bar/bar.ts'
    ])).toBe(true)

    expect(tf.includeFile([
      'foo/bar.js',
      'bar/bar.ts',
      'foo'
    ])).toBe(false)
  })

  test('includeDirectory', () => {
    expect(tf.includeDirectory('foo/bar.js')).toBe(false)
    expect(tf.includeDirectory('bar')).toBe(true)
    expect(tf.includeDirectory('foo')).toBe(true)

    expect(tf.includeDirectory([
      'foo',
      'bar',
    ])).toBe(true)

    expect(tf.includeDirectory([
      'foo',
      'boo',
      'foo/bar.js'
    ])).toBe(false)
  })

  test('readFile', () => {
    expect(tf.readFile('foo/bar.js')).toEqual(`console.log('hello js')`)
    expect(() => tf.readFile('foo/baz.js')).toThrow()

  })
})
