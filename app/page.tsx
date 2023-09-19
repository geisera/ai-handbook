'use client'
import {
  useState
} from 'react'

export default function Home() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  async function createIndexAndEmbeddings() {
    try {
      const result = await fetch('/api/setup', {
        method: "POST"
      })
      const json = await result.json()
      console.log('result: ', json)
    } catch (err) {
      console.log('err:', err)
    }
  }
  async function sendQuery() {
    if (!query) return
    setResult('')
    setLoading(true)
    try {
      const result = await fetch('/api/read', {
        method: "POST",
        body: JSON.stringify(query)
      })
      const json = await result.json()
      setResult(json.data)
      setLoading(false)
    } catch (err) {
      console.log('err:', err)
      setLoading(false)
    }
  }
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">


        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            What do you want to know?
          </h2>

            <div>
              <input className="block w-full rounded-md border-0 my-5 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={e => setQuery(e.target.value)} />
            </div>
            <div>
                <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={sendQuery}>Ask M&S</button>
            </div>
            
        </div>
      </div>

      {
        loading && <p>Asking M&S handbook ...</p>
      }
      {
        result && <p>{result}</p>
      }
      {/* consider removing this button from the UI once the embeddings are created ... */}
      {/* <button onClick={createIndexAndEmbeddings}>Create index and embeddings</button> */}
    </main>
  )
}
