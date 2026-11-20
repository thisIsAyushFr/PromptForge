import { useEffect, useState } from 'react'
import AISelection from './AISelection'
const SUPPORTED_AI = ['Claude', 'Gemini']

/*
 * Accent colors per AI.
 * Gemini gets a light, watery blue. Every other AI (Claude, and the
 * "coming soon" ones) keeps the original orange.
 * Class names are written out in full so Tailwind can detect them.
 */
const ORANGE_ACCENT = {
    border: 'border-[#bd6346]',
    badgeBorder: 'border-[#c96d4c]',
    bg: 'bg-[#d97757]',
    hover: 'hover:bg-[#cf6d4e]',
    badgeShadow: 'shadow-[1px_2px_4px_rgba(80,40,20,0.22)]',
    smallShadow: 'shadow-[2px_2px_4px_rgba(80,40,20,0.2)]',
    copyShadow:
        'shadow-[2px_2px_4px_rgba(80,40,20,0.2),inset_1px_1px_2px_rgba(255,255,255,0.3)]',
    analyzeShadow:
        'shadow-[3px_3px_6px_rgba(80,40,20,0.25),inset_1px_1px_2px_rgba(255,255,255,0.35)]',
    analyzeActiveShadow: 'active:shadow-[inset_2px_2px_4px_rgba(80,40,20,0.25)]',
    textareaFocus:
        'focus:border-[#d0a08e] focus:shadow-[inset_1px_1px_3px_rgba(0,0,0,0.1),0_0_0_2px_rgba(217,119,87,0.15)]',
}

const BLUE_ACCENT = {
    border: 'border-[#4f89dc]',
    badgeBorder: 'border-[#4f89dc]',
    bg: 'bg-[#6fa8f5]',
    hover: 'hover:bg-[#5a96e8]',
    badgeShadow: 'shadow-[1px_2px_4px_rgba(40,80,140,0.22)]',
    smallShadow: 'shadow-[2px_2px_4px_rgba(40,80,140,0.2)]',
    copyShadow:
        'shadow-[2px_2px_4px_rgba(40,80,140,0.2),inset_1px_1px_2px_rgba(255,255,255,0.3)]',
    analyzeShadow:
        'shadow-[3px_3px_6px_rgba(40,80,140,0.25),inset_1px_1px_2px_rgba(255,255,255,0.35)]',
    analyzeActiveShadow: 'active:shadow-[inset_2px_2px_4px_rgba(40,80,140,0.25)]',
    textareaFocus:
        'focus:border-[#8ab4f8] focus:shadow-[inset_1px_1px_3px_rgba(0,0,0,0.1),0_0_0_2px_rgba(111,168,245,0.2)]',
}

/* Neutral surface colors: warm beige/brown (orange theme) */
const ORANGE_LIGHT = {
    page: 'bg-[#e8e0d8] text-[#3d3833]',
    card: 'bg-[#e8e0d8] border-[#d2c7bd]',
    inner: 'bg-[#ded5cc] border-[#d0c4ba]',
    input: 'bg-[#f8f5f2] border-[#cfc4bb] text-[#3d3833]',
    heading: 'text-[#2f2a26]',
    muted: 'text-[#81766d]',
    subtle: 'text-[#9b9087]',
    divider: 'border-[#e2d9d1]',
    dropdown: 'bg-[#f8f5f2] border-[#cfc4bb]',
    dropdownHover: 'hover:bg-[#eee7e0]',
    errorBg: 'bg-[#f3ddd5]',
    errorBorder: 'border-[#d29a8a]',
    errorText: 'text-[#9b4d38]',
    successText: 'text-[#6f806f]',
    toggle: 'border-[#cfc4bb] bg-[#ded5cc] text-[#81766d]',
}

const ORANGE_DARK = {
    page: 'bg-[#24211f] text-[#eee8e2]',
    card: 'bg-[#2d2926] border-[#49413b]',
    inner: 'bg-[#38312d] border-[#504740]',
    input: 'bg-[#201d1b] border-[#4c433d] text-[#eee8e2]',
    heading: 'text-[#f2ece6]',
    muted: 'text-[#a89d94]',
    subtle: 'text-[#8e8279]',
    divider: 'border-[#4b433d]',
    dropdown: 'bg-[#302b28] border-[#514841]',
    dropdownHover: 'hover:bg-[#3d3631]',
    errorBg: 'bg-[#422d29]',
    errorBorder: 'border-[#795048]',
    errorText: 'text-[#e6a898]',
    successText: 'text-[#9dbba0]',
    toggle: 'border-[#5d5149] bg-[#3b342f] text-[#f1d8a5]',
}

/* Neutral surface colors: pale blue (Gemini theme) */
const BLUE_LIGHT = {
    page: 'bg-[#e6f0fc] text-[#1f3350]',
    card: 'bg-[#e6f0fc] border-[#bcd3f2]',
    inner: 'bg-[#d6e6fa] border-[#b5cef0]',
    input: 'bg-[#f5f9ff] border-[#b8d0f0] text-[#1f3350]',
    heading: 'text-[#14253f]',
    muted: 'text-[#5f7596]',
    subtle: 'text-[#7f93b0]',
    divider: 'border-[#d3e3f8]',
    dropdown: 'bg-[#f5f9ff] border-[#b8d0f0]',
    dropdownHover: 'hover:bg-[#e3eefc]',
    errorBg: 'bg-[#f3ddd5]',
    errorBorder: 'border-[#d29a8a]',
    errorText: 'text-[#9b4d38]',
    successText: 'text-[#6f806f]',
    toggle: 'border-[#b8d0f0] bg-[#d6e6fa] text-[#5f7596]',
}

const BLUE_DARK = {
    page: 'bg-[#141c2b] text-[#e3ecf9]',
    card: 'bg-[#1b2638] border-[#35496a]',
    inner: 'bg-[#223148] border-[#3c5379]',
    input: 'bg-[#101826] border-[#38507a] text-[#e3ecf9]',
    heading: 'text-[#edf3fc]',
    muted: 'text-[#9db2d1]',
    subtle: 'text-[#7f95b8]',
    divider: 'border-[#33476a]',
    dropdown: 'bg-[#1f2c42] border-[#3d557f]',
    dropdownHover: 'hover:bg-[#2a3b57]',
    errorBg: 'bg-[#422d29]',
    errorBorder: 'border-[#795048]',
    errorText: 'text-[#e6a898]',
    successText: 'text-[#9dbba0]',
    toggle: 'border-[#4a6491] bg-[#2a3b57] text-[#cfe0fa]',
}

function App() {
    const [prompt, setPrompt] = useState('')
    const [showAISelection, setShowAISelection] = useState(false)
    const [optimizedPrompt, setOptimizedPrompt] = useState('')
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [copied, setCopied] = useState(false)
    const [error, setError] = useState('')
    const [errorType, setErrorType] = useState<'empty' | 'optimization' | 'copy' | ''>('')
    const [selectedAI, setSelectedAI] = useState('Claude')
    const [showResult, setShowResult] = useState(false)
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('promptforge-theme') === 'dark'
    })
    // True until we know which AI site the active tab is on
    const [isDetecting, setIsDetecting] = useState(true)

    useEffect(() => {
        if (!SUPPORTED_AI.includes(selectedAI)) {
            return
        }

        const handleMessage = (message: {
            type: string
            prompt?: string
        }) => {
            if (message.type === 'PROMPT_CHANGED') {
                setPrompt(message.prompt ?? '')
            }
        }

        chrome.runtime.onMessage.addListener(handleMessage)

        const refreshPrompt = async () => {
            const [tab] = await chrome.tabs.query({
                active: true,
                currentWindow: true,
            })

            if (!tab.id) {
                return
            }

            chrome.tabs.sendMessage(
                tab.id,
                { type: 'GET_PROMPT' },
                (response) => {
                    if (chrome.runtime.lastError) {
                        return
                    }

                    if (response?.prompt !== undefined) {
                        setPrompt(response.platform === selectedAI ? response.prompt : '')
                    }
                }
            )
        }

        refreshPrompt()

        const interval = setInterval(() => {
            refreshPrompt()
        }, 700)

        return () => {
            chrome.runtime.onMessage.removeListener(handleMessage)
            clearInterval(interval)
        }
    }, [selectedAI])

    useEffect(() => {
        const platformFromUrl = (url?: string) => {
            if (!url) return null
            if (url.includes('gemini.google.com')) return 'Gemini'
            if (url.includes('claude.ai')) return 'Claude'
            return null
        }

        const detectPlatform = async () => {
            const [tab] = await chrome.tabs.query({
                active: true,
                currentWindow: true,
            })

            if (!tab?.id) {
                setIsDetecting(false)
                return
            }

            // 1) Use the tab's address when the browser gives it to us
            const fromUrl = platformFromUrl(tab.url)
            if (fromUrl) {
                setSelectedAI(fromUrl)
                setIsDetecting(false)
            }

            // 2) Otherwise ask the page's content script which AI it is
            chrome.tabs.sendMessage(
                tab.id,
                { type: 'GET_PROMPT' },
                (response) => {
                    if (
                        !chrome.runtime.lastError &&
                        response?.platform &&
                        SUPPORTED_AI.includes(response.platform)
                    ) {
                        setSelectedAI(response.platform)
                    }

                    setIsDetecting(false)
                }
            )
        }

        detectPlatform()

        // Safety net: never leave the popup blank if nothing answers
        const fallback = setTimeout(() => setIsDetecting(false), 600)
        return () => clearTimeout(fallback)
    }, [])

    const toggleDarkMode = () => {
        setIsDarkMode((current) => {
            const next = !current

            localStorage.setItem(
                'promptforge-theme',
                next ? 'dark' : 'light'
            )

            return next
        })
    }

    const selectAI = (ai: string) => {
        setSelectedAI(ai)
        setOptimizedPrompt('')
        setShowResult(false)
        setError('')
        setErrorType('')
        setCopied(false)

        if (!SUPPORTED_AI.includes(ai)) {
            setPrompt('')
        }
    }

    const analyzePrompt = async () => {
        if (!prompt.trim()) {
            setError(`No prompt was detected. Start typing in ${selectedAI} first.`)
            setErrorType('empty')
            return
        }

        setIsAnalyzing(true)
        setOptimizedPrompt('')
        setShowResult(false)
        setCopied(false)
        setError('')
        setErrorType('')

        try {
            const response = await fetch('http://localhost:3000/optimize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to optimize prompt')
            }

            if (!data.optimizedPrompt) {
                throw new Error('No optimized prompt was returned')
            }

            setOptimizedPrompt(data.optimizedPrompt)

            setTimeout(() => {
                setShowResult(true)
            }, 30)
        } catch (error) {
            console.error('Failed to optimize prompt:', error)

            setError(
                'We could not optimize your prompt. Make sure the PromptForge backend is running and try again.'
            )

            setErrorType('optimization')
        } finally {
            setIsAnalyzing(false)
        }
    }

    const copyOptimizedPrompt = async () => {
        try {
            await navigator.clipboard.writeText(optimizedPrompt)

            setCopied(true)
            setError('')
            setErrorType('')

            setTimeout(() => {
                setCopied(false)
            }, 1800)
        } catch (error) {
            console.error('Failed to copy prompt:', error)

            setError('Could not copy the optimized prompt to your clipboard.')
            setErrorType('copy')
        }
    }

    const isComingSoon = !SUPPORTED_AI.includes(selectedAI)
    const promptLength = prompt.length

    // Only Gemini is blue. Claude and everything else stays orange.
    const isGemini = selectedAI === 'Gemini'
    const accent = isGemini ? BLUE_ACCENT : ORANGE_ACCENT
    const theme = isGemini
        ? isDarkMode
            ? BLUE_DARK
            : BLUE_LIGHT
        : isDarkMode
            ? ORANGE_DARK
            : ORANGE_LIGHT

    // Wait until we know which AI the tab is on, so it never flashes Claude first
    if (isDetecting) {
        return null
    }

    if (showAISelection) {
        return (
            <AISelection
                selectedAI={selectedAI}
                onSelect={(ai) => {
                    setSelectedAI(ai)
                    setShowAISelection(false)
                    setOptimizedPrompt('')
                    setShowResult(false)
                    setError('')
                    setErrorType('')
                    setCopied(false)
                }}
                onBack={() => setShowAISelection(false)}
            />
        )
    }

    return (
        <div
            className={`min-h-screen w-80 p-3.5 transition-colors duration-300 ${theme.page}`}
        >
            <div
                className={`rounded-2xl border p-4 shadow-[inset_2px_2px_5px_rgba(255,255,255,0.08),inset_-2px_-2px_5px_rgba(0,0,0,0.12),4px_4px_10px_rgba(0,0,0,0.2)] transition-colors duration-300 ${theme.card}`}
            >

                {/* Header */}
                <div className="mb-4">

                    <div className="flex items-start justify-between">
                        <h1
                            className={`text-[21px] font-black leading-none tracking-[0.025em] ${theme.heading}`}
                        >
                            PROMPTFORGE
                        </h1>

                        <button
                            onClick={toggleDarkMode}
                            title={isDarkMode ? 'Light mode' : 'Dark mode'}
                            className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs transition-all duration-200 hover:-translate-y-[1px] active:translate-y-[1px] ${theme.toggle}`}
                        >
                            {isDarkMode ? '☀' : '☾'}
                        </button>
                    </div>

                    <p
                        className={`mt-1.5 text-[10px] font-bold tracking-[0.14em] ${theme.muted}`}
                    >
                        PROMPT IMPROVEMENT TOOL
                    </p>

                    <button
                        onClick={() => setShowAISelection(true)}
                        className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[9px] font-black tracking-wider text-white transition-all duration-150 hover:-translate-y-[1px] active:translate-y-[1px] ${accent.badgeBorder} ${accent.bg} ${accent.hover} ${accent.badgeShadow}`}
                    >
                        <span>{selectedAI.toUpperCase()}</span>

                        <span className="text-[7px]">
                            ▼
                        </span>
                    </button>
                </div>

                {isComingSoon ? (
                    <div
                        className={`rounded-xl border p-6 text-center shadow-[inset_2px_2px_5px_rgba(0,0,0,0.08),inset_-1px_-1px_3px_rgba(255,255,255,0.08)] transition-all duration-300 ${theme.inner}`}
                    >
                        <div className="mb-3 text-3xl">
                            🔧
                        </div>

                        <h2
                            className={`text-base font-black tracking-wide ${theme.heading}`}
                        >
                            {selectedAI.toUpperCase()}
                        </h2>

                        <p
                            className={`mt-1 text-[10px] font-black tracking-[0.16em] ${theme.muted}`}
                        >
                            COMING SOON
                        </p>

                        <p
                            className={`mt-3 text-xs leading-relaxed ${theme.muted}`}
                        >
                            PromptForge support for {selectedAI} is currently under
                            construction.
                        </p>

                        <button
                            onClick={() => selectAI('Claude')}
                            className={`mt-4 rounded-lg border px-4 py-2 text-xs font-bold tracking-wide text-white transition-all duration-150 hover:-translate-y-[1px] active:translate-y-[1px] ${accent.border} ${accent.bg} ${accent.hover} ${accent.smallShadow}`}
                        >
                            BACK TO CLAUDE
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Current Prompt */}
                        <div
                            className={`rounded-xl border p-3 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.06),inset_-1px_-1px_3px_rgba(255,255,255,0.08)] transition-colors duration-300 ${theme.inner}`}
                        >
                            <div className="mb-2 flex items-center justify-between">
                                <p
                                    className={`text-[10px] font-black tracking-[0.14em] ${theme.muted}`}
                                >
                                    CURRENT PROMPT
                                </p>

                                {prompt.trim() ? (
                                    <div className="flex items-center gap-1.5">
                                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#6f9b73]" />

                                        <span
                                            className={`text-[8px] font-black tracking-wider ${theme.successText}`}
                                        >
                                            DETECTED
                                        </span>
                                    </div>
                                ) : (
                                    <span
                                        className={`text-[8px] font-bold tracking-wider ${theme.subtle}`}
                                    >
                                        WAITING
                                    </span>
                                )}
                            </div>

                            <div
                                className={`min-h-20 rounded-lg border p-2.5 text-sm leading-relaxed shadow-[inset_1px_1px_3px_rgba(0,0,0,0.1)] transition-all duration-200 ${theme.input}`}
                            >
                                {prompt ? (
                                    <div className="max-h-28 overflow-y-auto whitespace-pre-wrap break-words">
                                        {prompt}
                                    </div>
                                ) : (
                                    <div className="flex min-h-14 items-center justify-center text-center">
                                        <span
                                            className={`text-xs font-medium ${theme.subtle}`}
                                        >
                                            Start typing a prompt in {selectedAI}...
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="mt-2 flex items-center justify-between">
                                <span
                                    className={`text-[8px] font-medium tracking-wide ${theme.subtle}`}
                                >
                                    Automatically detected from {selectedAI}
                                </span>

                                <span
                                    className={`text-[8px] font-bold ${theme.subtle}`}
                                >
                                    {promptLength} {promptLength === 1 ? 'CHAR' : 'CHARS'}
                                </span>
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <div
                                className={`mt-3 flex items-start gap-2 rounded-xl border p-3 transition-all duration-200 ${theme.errorBg} ${theme.errorBorder} ${theme.errorText}`}
                            >
                                <span className="mt-0.5 text-sm">
                                    {errorType === 'empty' && '⌕'}
                                    {errorType === 'optimization' && '⚠'}
                                    {errorType === 'copy' && '▣'}
                                </span>

                                <div>
                                    <p className="text-[9px] font-black tracking-widest">
                                        {errorType === 'empty' && 'NO PROMPT DETECTED'}
                                        {errorType === 'optimization' && 'OPTIMIZATION FAILED'}
                                        {errorType === 'copy' && 'COPY FAILED'}
                                    </p>

                                    <p className="mt-1 text-[10px] leading-relaxed">
                                        {error}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Optimized Prompt */}
                        {optimizedPrompt && (
                            <div
                                className={`mt-3 rounded-xl border p-3 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.06),inset_-1px_-1px_3px_rgba(255,255,255,0.08)] transition-all duration-300 ${
                                    showResult
                                        ? 'translate-y-0 opacity-100'
                                        : 'translate-y-2 opacity-0'
                                } ${theme.inner}`}
                            >
                                <div className="mb-2 flex items-center justify-between">
                                    <p
                                        className={`text-[10px] font-black tracking-[0.14em] ${theme.muted}`}
                                    >
                                        OPTIMIZED PROMPT
                                    </p>

                                    <span
                                        className={`text-[8px] font-bold tracking-wider ${theme.successText}`}
                                    >
                                        READY
                                    </span>
                                </div>

                                <textarea
                                    value={optimizedPrompt}
                                    onChange={(e) => setOptimizedPrompt(e.target.value)}
                                    className={`min-h-32 w-full resize-y rounded-lg border p-2 text-sm leading-relaxed outline-none shadow-[inset_1px_1px_3px_rgba(0,0,0,0.1)] transition-all duration-200 focus:scale-[1.005] ${accent.textareaFocus} ${theme.input}`}
                                />

                                <button
                                    onClick={copyOptimizedPrompt}
                                    className={`mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-bold tracking-wide text-white transition-all duration-150 hover:-translate-y-[1px] active:translate-y-[1px] ${accent.copyShadow} ${
                                        copied
                                            ? 'border-[#718d72] bg-[#78977a]'
                                            : `${accent.border} ${accent.bg} ${accent.hover}`
                                    }`}
                                >
                                    {copied ? (
                                        <>
                                            <span className="animate-[pop_200ms_ease-out] text-sm">
                                                ✓
                                            </span>

                                            COPIED TO CLIPBOARD
                                        </>
                                    ) : (
                                        'COPY OPTIMIZED PROMPT'
                                    )}
                                </button>
                            </div>
                        )}

                        {/* Analyze */}
                        <button
                            onClick={analyzePrompt}
                            disabled={isAnalyzing}
                            className={`mt-3 flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-bold tracking-wide text-white transition-all duration-150 hover:-translate-y-[1px] active:translate-y-[2px] disabled:cursor-wait disabled:translate-y-0 disabled:opacity-80 ${accent.border} ${accent.bg} ${accent.hover} ${accent.analyzeShadow} ${accent.analyzeActiveShadow}`}
                        >
                            {isAnalyzing ? (
                                <>
                                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                                    <span>REFINING PROMPT</span>
                                </>
                            ) : (
                                'ANALYZE PROMPT'
                            )}
                        </button>

                        {/* Footer */}
                        <div className="mt-3 text-center">
                            <span
                                className={`text-[8px] font-medium tracking-wider ${theme.subtle}`}
                            >
                                PROMPTFORGE • {selectedAI.toUpperCase()} EDITION
                            </span>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default App