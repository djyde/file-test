# file-test

Tool for the test cases that care about the generated directory structure and file content.

## Install

```bash
$ npm i file-test --save-dev
```

## Usage

```bash
- root
  - readme.md
  - A
    - a.js
    - b.js
  - B
    - a.ts 
    - b.ts
```

```js
const FileTest = require('file-test')

const ft = new FileTest(path.resolve(__dirname, './root'))

ft.includeFile('readme.md') // => true
ft.includeFile('blabla.md') // => false
ft.includeFile('A/a.js') // => true
ft.includeFile('A/b.js') // => true

ft.readFile('A/a.js') // => console.log('hello js')

ft.includeDirectory('A') // => true
ft.includeDirectory('B') // => true
ft.includeDirectory('A/a.js') // => false

ft.include([
  'readme.md',
  'A/a.js',
  'B/a.ts',
]) // => true

ft.include([
  'readme.md',
  'A/a.ts',
  'B/a.ts',
]) // => false

```

### Use with Jest

```js
test('blablabla', () => {
  expect(ft.includeDirectory('B')).toBe(true)
  expect(ft.includeDirectory('A/a.js')).toBe(false)
  expect(ft.readFile('A/a.js')).toEqual(`console.log('hello js')`)
  expect(ft.include([
    'readme.md',
    'A/a.js',
    'B/a.ts',
  ])).toBe(true)
})
```

## APIs

### FileTest(path: string)

The path for testing.

### include(fileName: string | string[]): boolean

Return `true` if the file (or all files) is existed **diretory and file**.

### includeFile(fileName: string | string[]): boolean

Return `true` if the file (or all files) only is existed **file**.

### includeDirectory(dirName: string | string[]): boolean

Return `true` if the file (or all files) only is existed **directory**.

### readFile(fileName: string, encoding = 'uft8'): string

Return the file content. Error will be thrown if file is not existed.

# License

MIT License