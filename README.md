![](https://ws3.sinaimg.cn/large/006tNc79ly1g1ufjkrqjsj31kw0hkmz1.jpg)

Tool for the test cases that care about the generated directory structure and file content.

## Install

```bash
$ npm i test-file --save-dev
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
const TestFile = require('test-file')

const tf = new TestFile(path.resolve(__dirname, './root'))

tf.includeFile('readme.md') // => true
tf.includeFile('blabla.md') // => false
tf.includeFile('A/a.js') // => true
tf.includeFile('A/b.js') // => true

tf.readFile('A/a.js') // => console.log('hello js')

tf.includeDirectory('A') // => true
tf.includeDirectory('B') // => true
tf.includeDirectory('A/a.js') // => false

tf.include([
  'readme.md',
  'A/a.js',
  'B/a.ts',
]) // => true

tf.include([
  'readme.md',
  'A/a.ts',
  'B/a.ts',
]) // => false

```

### Use with Jest

```js
test('blablabla', () => {
  expect(tf.includeDirectory('B')).toBe(true)
  expect(tf.includeDirectory('A/a.js')).toBe(false)
  expect(tf.readFile('A/a.js')).toEqual(`console.log('hello js')`)
  expect(tf.include([
    'readme.md',
    'A/a.js',
    'B/a.ts',
  ])).toBe(true)
})
```

## APIs

### TestFile(path: string)

The path for testing.

### include(fileName: string | string[]): boolean

Return `true` if the file (or all files) is existed **diretory and file**.

### includeFile(fileName: string | string[]): boolean

Return `true` if the file (or all files) only is existed **file**.

### includeDirectory(dirName: string | string[]): boolean

Return `true` if the file (or all files) only is existed **directory**.

### readFile(fileName: string, encoding = 'utf8'): string

Return the file content. Error will be thrown if file is not existed.

# License

MIT License