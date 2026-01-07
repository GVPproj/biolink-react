import { useQuery } from "@tanstack/react-query"
import { getPb } from "../../data/pocketbaseUtils"
import BioLinksTable from "./BioLinksTable"
import AddBioLinkForm from "./AddBioLinkForm"

export default function AuthenticatedView({ onLogout }) {
  const pb = getPb()

  const { data: bioLinks, isPending, error } = useQuery({
    queryKey: ["adminBioLinks"],
    queryFn: async () => {
      const { items } = await pb.collection("bioLinks").getList(1, 100, {
        sort: "-created",
      })
      return items
    },
  })

  return (
    <div className="admin-authenticated">
      <header className="admin-header">
        <h1>BioLinks Admin</h1>
        <button onClick={onLogout} className="admin-logout-btn">
          Logout
        </button>
      </header>

      <AddBioLinkForm />

      {isPending && <p>Loading...</p>}
      {error && <p className="admin-error">Error: {error.message}</p>}
      {bioLinks && <BioLinksTable bioLinks={bioLinks} />}
    </div>
  )
}
