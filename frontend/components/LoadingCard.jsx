"use client"
import { CircleNotchIcon } from "@phosphor-icons/react"

const LoadingCard = ({text}) => {
  return (
    <div className="flex flex-col items-center gap-3 justify-self-center">
        <CircleNotchIcon size={32} className="text-neutral-950 animate-spin" />
        <span className="text-neutral-950 font-medium font-sans">{text}</span>
    </div>
  )
}
export default LoadingCard