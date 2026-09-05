let currentEditor: HTMLElement | null = null

const getClaudePrompt = (): string => {
  const editor = document.querySelector(
    '[data-testid="chat-input"]'
  ) as HTMLElement | null

  if (!editor) {
    return ''
  }

  return editor.innerText
}

const attachEditorListener = (): void => {
  const editor = document.querySelector(
    '[data-testid="chat-input"]'
  ) as HTMLElement | null

  if (!editor || editor === currentEditor) {
    return
  }

  currentEditor = editor

    editor.addEventListener('input', () => {
    const prompt = getClaudePrompt()

    console.log("Current Claude prompt:", prompt)

    chrome.runtime.sendMessage({
        type: 'PROMPT_CHANGED',
        prompt,
    })
    })

  console.log("PromptForge attached to Claude editor")
}

console.log("PromptForge content script loaded")

attachEditorListener()

const observer = new MutationObserver(() => {
  attachEditorListener()
})

observer.observe(document.body, {
  childList: true,
  subtree: true,
})
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === 'GET_PROMPT') {
    sendResponse({
      prompt: getClaudePrompt(),
    })
  }
})
