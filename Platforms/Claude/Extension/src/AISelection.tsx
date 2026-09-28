type AISelectionProps = {
    selectedAI: string
    onSelect: (ai: string) => void
    onBack: () => void
}

const AISelection = ({
    selectedAI,
    onSelect,
    onBack,
}: AISelectionProps) => {
    const platforms = [
        { name: 'Claude', icon: '✦' },
        { name: 'ChatGPT', icon: '◉' },
        { name: 'Gemini', icon: '✦' },
        { name: 'Grok', icon: '◉' },
        { name: 'Perplexity', icon: '◉' },
        { name: 'DeepSeek', icon: '◉' },
        { name: 'Lovable', icon: '◉' },
        { name: 'Copilot', icon: '◉' },
    ]

    return (
        <div className="min-h-screen w-80 bg-[#e8e0d8] p-3.5 text-[#3d3833]">
            <div className="rounded-2xl border border-[#d2c7bd] bg-[#e8e0d8] p-4 shadow-[inset_2px_2px_5px_rgba(255,255,255,0.08),inset_-2px_-2px_5px_rgba(0,0,0,0.12),4px_4px_10px_rgba(0,0,0,0.2)]">

                <button
                    onClick={onBack}
                    className="mb-4 flex items-center gap-2 text-xs font-black tracking-wide text-[#81766d] transition hover:text-[#d97757]"
                >
                    ← BACK
                </button>

                <h1 className="text-[21px] font-black tracking-[0.025em] text-[#2f2a26]">
                    SELECT AI
                </h1>

                <p className="mt-1.5 text-[10px] font-bold tracking-[0.14em] text-[#81766d]">
                    CHOOSE YOUR AI PLATFORM
                </p>

                <div className="mt-4 space-y-2">
                    {platforms.map((platform) => (
                        <button
                            key={platform.name}
                            onClick={() => onSelect(platform.name)}
                            className="flex w-full items-center justify-between rounded-xl border border-[#cfc4bb] bg-[#f8f5f2] px-3.5 py-3 text-left transition-all hover:-translate-y-[1px] hover:border-[#d97757] hover:shadow-[2px_3px_6px_rgba(0,0,0,0.12)] active:translate-y-[1px]"
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-sm text-[#d97757]">
                                    {platform.icon}
                                </span>

                                <span className="text-xs font-black text-[#3d3833]">
                                    {platform.name}
                                </span>
                            </div>

                            {selectedAI === platform.name && (
                                <span className="text-sm font-black text-[#d97757]">
                                    ✓
                                </span>
                            )}
                        </button>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default AISelection