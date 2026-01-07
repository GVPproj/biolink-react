import { useMutation, useQueryClient } from "@tanstack/react-query"
import { getPb } from "../data/pocketbaseUtils"

export function useCreateBioLink() {
  const queryClient = useQueryClient()
  const pb = getPb()

  return useMutation({
    mutationFn: async (newLink) => {
      return await pb.collection("bioLinks").create(newLink)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminBioLinks"] })
      queryClient.invalidateQueries({ queryKey: ["bioLinks"] })
    },
  })
}

export function useUpdateBioLink() {
  const queryClient = useQueryClient()
  const pb = getPb()

  return useMutation({
    mutationFn: async ({ id, data }) => {
      return await pb.collection("bioLinks").update(id, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminBioLinks"] })
      queryClient.invalidateQueries({ queryKey: ["bioLinks"] })
    },
  })
}

export function useDeleteBioLink() {
  const queryClient = useQueryClient()
  const pb = getPb()

  return useMutation({
    mutationFn: async (id) => {
      return await pb.collection("bioLinks").delete(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminBioLinks"] })
      queryClient.invalidateQueries({ queryKey: ["bioLinks"] })
    },
  })
}
