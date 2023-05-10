const { basename, normalize } = require('path')
const { readFile: readFileCb } = require('fs')
const { promisify } = require('util')
const readFile = promisify(readFileCb)

const kolor = require('kleur')
const brotliSize = require('brotli-size')
const { log } = console
const pkg = require('../package.json')
main()

async function main () {
  const args = process.argv.splice(2)
  const filePaths = [...args.map(normalize)]
  const fileMetadata = await Promise.all(
    filePaths.map(async (filePath) => {
      return {
        path: filePath,
        blob: await readFile(filePath, { encoding: 'utf8' })
      }
    })
  )

  const output = await Promise.all(
    fileMetadata.map((metadata) => getSizeInfo(metadata.blob, metadata.path))
  )

  log(getFormatedOutput(pkg.name, output))
}

/**
 *
 * @param {string} pkgName
 * @param {string[]} filesOutput
 */
function getFormatedOutput (pkgName, filesOutput) {
  const MAGIC_INDENTATION = 3
  const WHITE_SPACE = ' '.repeat(MAGIC_INDENTATION)

  return (
    kolor.blue(`${pkgName} bundle sizes: 📦`) +
    `\n${WHITE_SPACE}` +
    readFile.name +
    filesOutput.join(`\n${WHITE_SPACE}`)
  )
}

/**
 *
 * @param {num} size
 */
function prettyBytes (num) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  if (num === 0) {
    return '0 B'
  }
  const exponent = Math.floor(Math.log2(num) / Math.log2(1024))
  const unit = units[exponent]
  const size = Number((num / Math.pow(1024, exponent)).toFixed(2))
  return `${size} ${unit}`
}

/**
 *
 * @param {number} size
 * @param {string} filename
 * @param {'br' | 'gz'} type
 * @param {boolean} raw
 */
async function formatSize (size, filename, type, raw) {
  // const prettyBytes = await import('pretty-bytes')
  const pretty = raw ? `${size} B` : prettyBytes(size)
  const color = size < 5000 ? 'green' : size > 40000 ? 'red' : 'yellow'
  const MAGIC_INDENTATION = type === 'br' ? 13 : 10

  return `${' '.repeat(MAGIC_INDENTATION - pretty.length)}${kolor[color](
    pretty
  )}: ${kolor.white(basename(filename))}.${type}`
}

/**
 *
 * @param {string} code
 * @param {string} filename
 * @param {boolean} [raw=false]
 */
async function getSizeInfo (code, filename, raw = false) {
  const { gzipSize } = (await import('gzip-size'))

  const isRaw = raw || code.length < 5000
  const gzip = await formatSize(await gzipSize(code), filename, 'gz', isRaw)
  const brotli = await formatSize(await brotliSize.sync(code), filename, 'br', isRaw)
  return gzip + '\n' + brotli
}
