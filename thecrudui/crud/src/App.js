import { useState } from "react"
const api_url = 'http://192.168.1.58:3000'

function App() {

const [books, setbooks] = useState([])

const search = async (category, term) => {
  let res = await fetch(`${api_url}/search/${category}/${term}`)
  let data = await res.json()

  console.log(data.results)
  setbooks(data.results)
}

let ambertooth = " bg-amber-200 text-neutral-500 px-1 rounded hover:bg-amber-400"
let formtitle = " text-xl flex justify-center text-amber-900 py-1"

//book cards for search results
const BookCard = ({ bobj }) => {
  return (
    <div className="py-5" >
    <div className="max-w-xs rounded overflow-hidden \
      shadow-lg bg-slate-100 text-gray-500 px-9 py-5 \
      hover:bg-slate-300" >
      <h6 className="font-thin text-xs" > {bobj.id} </h6>
      <h1 className="text-3xl" > {bobj.title} </h1>
      <h3 className="text-right"> - {bobj.authors} </h3>
    </div>
    </div>
  )
}

//search component
const SearchForm = () => {

  //these 2 are used in SearchForm Component
  const [cat, setcat] = useState('title')
  const [term, setterm] = useState('search here')

  const eatSubmit = (e) => {
    search(cat, term)
    e.preventDefault()
  }

  return (
    <div>
      <p className={formtitle}> Search </p>
      <form onSubmit={eatSubmit} >
        <label>
          <select value={cat} onChange={(e) => setcat(e.target.value)}>
            <option value="authors">authors</option>
            <option value="title">title</option>
          </select>
          <p></p>
          <input type="text" 
            name="term" 
            value={term} 
            onChange={(e) => {setterm(e.target.value)}}
            className="rounded px-1 w-5/6" />
        </label>
        <p className=" py-2 flex justify-center">
        <button type="submit" className={ambertooth} >Search</button>
        </p>
      </form>
    </div>
  )
}

//post componenet
const PostForm = () => {

  const  [Bookname, setBookname] = useState("Book name goes here")
  const  [Author, setAuthor] = useState("Author's here")

  const PostBook = (e) =>{
    var book = {
      "title": `${Bookname}`,
      "authors": `${Author}`
    }

    var form = []
    for (var key in book) {
      let enkey = encodeURIComponent(key)
      let enval = encodeURIComponent(book[key])
      form.push(enkey + "=" + enval)
    }
    form = form.join("&")
    
    fetch(`${api_url}/add`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: form
    })
    e.preventDefault()
  }

  return (
    <>
      <form onSubmit={PostBook}>
        <label className={formtitle}>Add one</label>
        <p></p>
        <input type="text"
          value={Author}
          onChange={(e) => {setAuthor(e.target.value)}}
          className="rounded px-1 w-5/6" ></input>
        <p></p>
        <input type="text"
          value={Bookname}
          onChange={(e) => {setBookname(e.target.value)}}
          className="rounded px-1 w-5/6" ></input>
        <p className=" py-2 flex justify-center">
        <button type="submit" className={ambertooth}>Add this Book</button>
        </p>
      </form>
    </>
  )
}

//update component
const UpdateForm = () => {

  const [Id, setId] = useState(-1)
  const [Cat, setCat] = useState('title')
  const [Data, setData] = useState('')

  const handleput = (e) => {

    var book = {
      "id": Id,
      "category": `${Cat}`,
      "data": `${Data}`
    }

    console.log(book)

    var form = []
    for (var key in book) {
      let enkey = encodeURIComponent(key)
      let enval = encodeURIComponent(book[key])
      form.push(enkey + "=" + enval)
    }
    form = form.join("&")
    
    fetch(`${api_url}/update`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: form
    })
    e.preventDefault()

  }

  return (
    <>
      <form onSubmit={handleput} >
        <label className={formtitle}>Update an entry</label>
        <select value={Cat} onChange = {(e) => {setCat(e.target.value)}} >
          <option value="authors">author</option>
          <option value="title">title</option>
        </select>
        <p>ID:</p>
        <input value={Id} onChange = {(e) => {setId(e.target.value)}}
            className="rounded px-1 w-5/6" />
        <p>Data to update</p>
        <input value={Data} onChange = {(e) => {setData(e.target.value)}}
            className="rounded px-1 w-5/6" />
        <p className=" py-2 flex justify-center">
        <button type="submit" className={ambertooth}> Submit </button>
        </p>
      </form>
    </>
  )
}

//Remove component
const RemoveForm = () => {

  const [id, setid] = useState(-1)

  const handle = (e) => {

    fetch(`${api_url}/remove/${id}`, {
      method: "DELETE"
    })
    e.preventDefault()
  }

  return (
    <>
      <form onSubmit={handle} >
        <label className={formtitle}>Remove</label>
        <p></p>
        <input value={id} onChange={(e)=>{setid(e.target.value)}}
            className="rounded px-1 w-5/6" />
        <p className=" py-2 flex justify-center">
        <button type="submit" className={ambertooth}>Delete</button>
        </p>
      </form>
    </>
  )
}

return (
  <div className=" bg-neutral-700 ">
    <div className=" bg-amber-900 max-w-full rounded overflow-hidden shadow-lg grid grid-cols-2">
      <div className=" text-5xl py-4 px-4 text-yellow-100" >
        Reader's Club
      </div>
      <div className=" text-xl flex justify-end">
        <a href="https://www.reddit.com/user/me" target="_blank" rel="noreferrer"
          className=" text-amber-400" >profile</a>
      </div>
    </div>
    <div className="flex content-center justify-center py-5" >
    <div className=" bg-neutral-200 rounded text-neutral-600 grid grid-cols-4 gap-1 px-1">
    <SearchForm />
    <PostForm/>
    <UpdateForm/>
    <RemoveForm/>
    </div>
    </div>

    <dev className="flex content-center justify-center" >
    {
      books?.length > 0 ? (
        <div className="grid grid-cols-3 gap-2" >
          {
            books.map((book) => (
              <BookCard key={book.id} bobj={book} />
            ))
          }
        </div>
      ) : (
        <div>
          <h2 className=" text-3xl">
            Welcome to the Book store
          </h2>
          <p className=" text-sm text-center" >powered by Qaggle</p>
        </div>
      )
    }
    </dev>
  </div>
)
}

export default App;