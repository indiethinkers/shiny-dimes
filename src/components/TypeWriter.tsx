"use client"

import Link from 'next/link'

interface TypeWriterProps {
  title: string
  blurb: string
  author: string
  link: string
}

export default function TypeWriter({ title, blurb, author, link }: TypeWriterProps) {
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
