"use client"

interface TypeWriterProps {
  title: string
  blurb: string
  author: string
  link: string
}

export default function TypeWriter({ blurb, link }: TypeWriterProps) {
  return (
    <div className="px-4">
      <div className="w-[600px] min-h-[150px] font-mono flex flex-col items-center">
        <div className="whitespace-pre-wrap leading-relaxed text-center">
          {blurb}
        </div>
        <div className="mt-6">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-800 transition-colors text-sm"
          >
            (view essay)
          </a>
        </div>
      </div>


    </div>
  )
}
