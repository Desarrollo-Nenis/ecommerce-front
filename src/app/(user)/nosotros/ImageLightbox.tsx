"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Img } from "@/interfaces/data/img.interface"

interface Props {
  images: Img[]
}

export default function ImageLightbox({ images }: Props) {
  const [mainApi, setMainApi] = useState<CarouselApi | null>(null)
  const [current, setCurrent] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [dialogIndex, setDialogIndex] = useState(0)

  useEffect(() => {
    if (!mainApi) return
    const update = () => setCurrent(mainApi.selectedScrollSnap())
    mainApi.on("select", update)
    update()
  }, [mainApi])

  const openDialog = () => {
    setDialogIndex(current)
    setIsOpen(true)
  }

  const handleNext = () => {
    setDialogIndex((prev) => (prev + 1) % images.length)
  }

  const handlePrevious = () => {
    setDialogIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const currentImage = images[dialogIndex]

  return (
    <>
      {/* Carrusel principal */}
      <Carousel setApi={setMainApi} className="relative aspect-square rounded-lg border bg-background overflow-hidden">
        <CarouselContent>
          {images.map((img) => (
            <CarouselItem key={img.id}>
              <div className="relative w-full h-full aspect-square">
                <Image
                  src={img.url || "/placeholder.svg"}
                  alt={img.name || "Imagen"}
                  fill
                  className="object-cover cursor-zoom-in"
                  onClick={openDialog}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Dialog de imagen ampliada */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-6xl w-full h-[90vh] bg-black p-0 relative flex items-center justify-center">
          <DialogTitle className="sr-only">Vista ampliada</DialogTitle>

          {currentImage?.url && (
            <div className="relative w-full h-full">
              <Image
                src={currentImage.url}
                alt={currentImage.name || "Imagen ampliada"}
                fill
                className="object-contain"
                priority
              />
            </div>
          )}

          {/* Botones de navegación */}
          <div className="absolute inset-0 flex items-center justify-between px-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevious}
              className="z-10 text-white bg-black/40 hover:bg-black/60"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNext}
              className="z-10 text-white bg-black/40 hover:bg-black/60"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
