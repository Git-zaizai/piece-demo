self.importScripts('https://cdn.bootcdn.net/ajax/libs/spark-md5/3.0.2/spark-md5.js')

self.onmessage = event => {
  const spark = new self.SparkMD5.ArrayBuffer()
  const fileReader = new FileReader()
  fileReader.onload = e => {
    spark.append(e.target.result)
    self.postMessage({
        index: event.data.index,
        hash: spark.end()
    })
  }
  fileReader.readAsArrayBuffer(event.data.file)
}