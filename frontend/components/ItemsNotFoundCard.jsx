"use client"
import { MagnifyingGlassIcon } from "@phosphor-icons/react"

const ItemsNotFoundCard = () => {
  return (
    <div className="w-80 flex flex-col items-center gap-6 justify-self-center">
        <MagnifyingGlassIcon size={48} className="text-neutral-950"/>
        <div className="flex flex-col gap-2">
            <h2 className="text-xl text-neutral-950 font-medium font-sans text-center">Nenhum item encontrado</h2>
            <p className="text-neutral-700 font-sans text-center text-sm">Tente ajustar os filtros ou o termo de busca para encontrar o que procura.</p>
        </div>
    </div>
  )
}
export default ItemsNotFoundCard