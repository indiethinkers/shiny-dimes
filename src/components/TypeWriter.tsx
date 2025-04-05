"use client"

interface TypeWriterProps {
  blurb: string
}

export default function TypeWriter({ blurb }: TypeWriterProps) {
  return (
    <div className="px-4">
      <div className="w-[600px] min-h-[150px] font-mono flex">
        <div className="whitespace-pre-wrap leading-relaxed">
          {blurb}
        </div>
      </div>


    </div>
  )
}
