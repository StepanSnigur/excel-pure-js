class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string' ?
      document.querySelector(selector) :
      selector
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML
  }
  text(text) {
    if (typeof text === 'string') {
      this.$el.textContent = text
      return this
    }
    if (this.$el.tagName.toUpperCase() === 'input') return this.$el.value.trim()
    return this.$el.textContent.trim()
  }
  clear() {
    this.html('')
    return this
  }
  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }
  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }
  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }
    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }

    return this
  }
  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }
  find(selector) {
    return $(this.$el.querySelector(selector))
  }
  focus() {
    this.$el.focus()
    return this
  }
  addClass(className) {
    this.$el.classList.add(className)
    return this
  }
  removeClass(className) {
    this.$el.classList.remove(className)
    return this
  }
  id(parse) {
    if (parse) {
      const parsed = this.id().split(':')
      return {
        row: +parsed[0],
        col: +parsed[1]
      }
    }
    return this.$el.dataset.id
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tag, classes = '') => {
  const el = document.createElement(tag)
  if (classes) el.classList.add(classes)
  return $(el)
}
