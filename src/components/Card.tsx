"use client"

import Link from 'next/link'

interface CardProps {
  title: string
  blurb: string
  author: string
  link: string
}

export default function Card({ title, blurb, author, link }: CardProps) {
  return (
    <div className="flex justify-center items-center p-4 flex-col">
      <div className="w-[600px] h-[360px] bg-[#f0f0f2] shadow-md rounded-sm overflow-hidden border border-[#d0d0d0] flex flex-col v0-styling">
        {/* Title section */}
        <div className="relative flex-none" style={{ height: "45px" }}>
          <div className="w-full h-full bg-transparent text-lg font-medium px-4 py-2 truncate max-w-[62ch]">
            {title}
          </div>
          {/* Red line */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#d13b40]"></div>
        </div>

        {/* Content section */}
        <div 
          className="flex-1 relative p-4 flex flex-col justify-between"
          style={{
            backgroundImage:
              "repeating-linear-gradient(transparent, transparent 29.5px, #a0b4d8 29.5px, #a0b4d8 30px)",
            backgroundPosition: "0 0",
          }}
        >
          <div className="text-lg min-h-[240px]" style={{ lineHeight: "30px", paddingTop: "14px" }}>
            {blurb}
          </div>
          
          <div className="flex justify-between items-center mt-4 text-sm bg-[#f0f0f2] -mx-4 px-4 py-2">
            <span className="text-gray-600">By {author}</span>
            <Link 
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              View Source →
            </Link>
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-500 mt-2">(hit the spacebar for another card)</div>

      {/* Custom v0-like styling */}
      <style jsx global>{`
        /* v0-like font family */
        .v0-styling {
          font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        }
        
        /* v0-like text selection styling */
        .v0-styling *::selection {
          background-color: rgba(35, 131, 226, 0.28);
          color: #000;
        }
      `}</style>
    </div>
  )
}
