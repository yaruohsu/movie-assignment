import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type WatchListMovie = {
  id: number
  title: string
  posterUrl: string
  addTime: number
}

type WatchListState = {
  watchList: WatchListMovie[]
  toggleWatchList: (movie: Omit<WatchListMovie, 'addTime'>) => void
  isInWatchList: (id: number) => boolean
  getRandomMovie: () => WatchListMovie | null
}

export const useWatchListStore = create(
  persist<WatchListState>(
    (set, get) => ({
      watchList: [],
      toggleWatchList: (movie) => {
        const exists = get().watchList.some((m) => m.id === movie.id)
        if (exists) {
          set((state) => ({
            watchList: state.watchList.filter((m) => m.id !== movie.id),
          }))
        } else {
          set((state) => ({
            watchList: [{ ...movie, addTime: Date.now() }, ...state.watchList],
          }))
        }
      },
      isInWatchList: (id) =>
        get().watchList.some((movie) => movie.id === id),
      getRandomMovie: () => {
        const list = get().watchList
        if (list.length === 0) return null
        const randomIndex = Math.floor(Math.random() * list.length)
        return list[randomIndex]
      },
    }),
    {
      name: 'watchList-storage', // localStorage key
    }
  )
)
