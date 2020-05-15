import React from 'react'

const Chat = () => {
  return (
    <div className="d-flex vh-100 row">
      <main className="align-self-start col-12 m-2">
        <h2>Chat</h2>
      </main>
      <footer className="align-self-end col-12">
        <input
          name="message"
          className="form-control"
          placeholder="chat input here..."
        />
      </footer>
    </div>
  )
}

export { Chat }