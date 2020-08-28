import "quill/dist/quill.snow.css"

import React from "react"
import ReactQuill from "react-quill"

class MessageEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = { editorHtml: "", theme: "snow" }
    this.handleChange = this.handleChange.bind(this)
    this.quill = null
  }

  handleChange(html) {
    this.setState({ editorHtml: html })
  }

  onKeyDown = async (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      const content = this.state.editorHtml
      await this.props.onSave(content)
      this.setState({ editorHtml: content })
    }
  }

  handleThemeChange(newTheme) {
    if (newTheme === "core") newTheme = null
    this.setState({ theme: newTheme })
  }

  apiPostNewsImage = (data) => {
    console.log(data)
  }

  imageHandler = async () => {
    const input = document.createElement("input")

    input.setAttribute("type", "file")
    input.setAttribute("accept", "image/*")
    input.click()

    input.onchange = async () => {
      const file = input.files[0]
      const formData = new FormData()

      formData.append("image", file)

      const range = this.quill.getSelection(true)

      // Insert temporary loading placeholder image
      this.quill.insertEmbed(
        range.index,
        "image",
        `${window.location.origin}/images/loaders/placeholder.gif`
      )

      // Move cursor to right side of image (easier to continue typing)
      this.quill.setSelection(range.index + 1)

      const res = await this.apiPostNewsImage(formData) // API post, returns image location as string e.g. 'http://www.example.com/images/foo.png'

      // Remove placeholder image
      this.quill.deleteText(range.index, 1)

      // Insert uploaded image
      // this.quill.insertEmbed(range.index, 'image', res.body.image);
      this.quill.insertEmbed(range.index, "image", res)
    }
  }

  modules = {
    toolbar: {
      container: "#toolbar",
      handlers: {
        image: this.imageHandler,
      },
    },
  }

  render() {
    return (
      <div>
        <ReactQuill
          ref={(el) => {
            this.quill = el
          }}
          theme="snow"
          onChange={this.handleChange}
          value={this.state.editorHtml}
          onKeyDown={this.onKeyDown}
          modules={this.modules}
        />
        <div id="toolbar" className="border-t-0">
          <button className="ql-bold" />
          <button className="ql-italic" value="italic" />
          <button className="ql-strike" value="strike" />
          <button className="ql-underline" value="underline" />
          <button className="ql-code-block" value="code-block" />
          <button className="ql-image" value="image" />
        </div>
      </div>
    )
  }
}

export { MessageEditor }
