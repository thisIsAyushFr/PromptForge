let currentEditor: HTMLElement | null = null

const isGemini = (): boolean => location.hostname === 'gemini.google.com'

const platformName = (): string => (isGemini() ? 'Gemini' : 'Claude')

const CLAUDE_SELECTOR = '[data-testid="chat-input"]'

const GEMINI_SELECTOR = [
  'rich-textarea .ql-editor[contenteditable="true"]',
  'div.ql-editor[contenteditable="true"]',
  'div[contenteditable="true"][role="textbox"]',
].join(', ')

const getEditor = (): HTMLElement | null =>
  document.querySelector<HTMLElement>(
    isGemini() ? GEMINI_SELECTOR : CLAUDE_SELECTOR
  )

const getPrompt = (): string => {
  const editor = getEditor()

  if (!editor) {
    return ''
  }

  const text = editor.innerText

  return isGemini() ? text.trim() : text
}

const attachEditorListener = (): void => {
  const editor = getEditor()

  if (!editor || editor === currentEditor) {
    return
  }

  currentEditor = editor

  editor.addEventListener('input', () => {
    console.log(`Current ${platformName()} prompt:`, getPrompt())
  })

  console.log(`PromptForge attached to ${platformName()} editor`)
}

console.log('PromptForge content script loaded')

attachEditorListener()

const observer = new MutationObserver(() => {
  attachEditorListener()
})

observer.observe(document.body, {
  childList: true,
  subtree: true,
})

chrome.runtime.onMessage.addListener(
  (message, _sender, sendResponse) => {
    if (message.type === 'GET_PROMPT') {
      sendResponse({
        platform: platformName(),
        prompt: getPrompt(),
      })
    }
  }
)

export {}